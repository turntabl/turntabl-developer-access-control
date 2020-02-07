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

  