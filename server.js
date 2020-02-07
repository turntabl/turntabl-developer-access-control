const express = require("express");
const path = require("path");
const SamlStrategy = require("passport-saml").Strategy;
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");

const app = express();

// To serve just the static files form the dist directory
app.use(express.static(__dirname + "/dist/turntabl-developer-access-control"));

app.use(cookieParser());

app.use(
  // To protect the cookies
  cookieSession({
    name: "session",
    keys: [process.env.SECRET],
    maxAge: 2 * 24 * 60 * 1000 // For just 1 day
  })
);

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new SamlStrategy(
    {
      protocol: "https://",
      // SSO URL to load the server.js to get the various module exports after authentication.
      entryPoint: process.env.ENTRY_POINT,

      // Entity ID for identity provider
      issuer: process.env.ISSUER,

      path: "/auth/saml/callback" // or callback is the ACS URL path
    },
    function(profile, done) {
      userEmail = profile.nameID;

      return done(null, {
        email: profile.email
      });
    }
  )
);
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.get(
  "/login",
  passport.authenticate("saml", {
    successRedirect: "/",
    failureRedirect: "/login"
  })
);

app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("https://turntabl.io");
});

app.post(
  "/auth/saml/callback",
  bodyParser.urlencoded({ extended: false }),
  passport.authenticate("saml", {
    failureRedirect: "/error",
    failureFlash: false
  }),
  function(req, res) {
    // sets a cookie called cookieEmail and sets its max age to 1 day
    res.cookie("cookieEmail", userEmail, {
      maxAge: 1 * 24 * 60 * 1000,
      secure: true,
      httpOnly: false
    });
    res.redirect(process.env.APP_RUNNER);
  }
);

app.all("*", function(req, res, next) {
  if (req.isAuthenticated() || process.env.NODE_ENV !== "production") {
    next();
  } else {
    res.redirect("/login");
  }
});

app.get("/*", function(req, res) {
  res.cookie("backend_url", process.env.PERMISSIONS);
  res.sendFile(
    path.join(__dirname + "/dist/turntabl-developer-access-control/index.html")
  );
});
// To start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8082);
