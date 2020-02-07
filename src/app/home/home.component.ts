import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { RoleRequest } from "../role-request";
import { Role } from "../role";
import { ApplicationService } from "../application.service";
import { CookieService } from "ngx-cookie-service";
import { MatCheckboxChange } from "@angular/material/checkbox";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  roles: Role[] = [];
  selectedRoles: string[] = [];
  userEmail = "";
  loadPermissions = "";
  msgShow: boolean = false;
  validSelection: boolean;
  message: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: ApplicationService,
    private cookieService: CookieService
  ) {
    this.form = this.formBuilder.group({
      roleform: new FormArray([])
    });
  }

  ngOnInit() {
    this.userEmail = this.cookieService.get("cookieEmail");

    this.service.getRoles().subscribe(result => {
      this.roles = result;
    });
  }

  onCheckChange(event: MatCheckboxChange) {
    this.msgShow = false;

    if (event.checked) {
      // Add a new control in the arrayForm
      this.selectedRoles.push(event.source.value);
    } else {
      // unselected
      const value = event.source.value;

      this.selectedRoles = this.selectedRoles.filter(item => {
        return item !== value;
      });
    }
  }

  submit() {
    if (
      this.selectedRoles.length > 0 &&
      this.cookieService.check("cookieEmail")
    ) {
      let request: RoleRequest = {
        awsArns: this.selectedRoles,
        email: this.userEmail
      };

      const data = JSON.stringify(request);
      console.log(data);
      this.service.postRequest(JSON.parse(data)).subscribe();
      this.message = "Request successfully sent!";
      this.validSelection = true;
    } else {
      this.validSelection = false;
      this.message =
        "Invalid Selection! Refresh the page and try again with a valid selection!";
    }
    this.msgShow = true;
  }
}
