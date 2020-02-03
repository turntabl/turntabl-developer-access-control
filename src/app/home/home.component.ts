import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray} from '@angular/forms';
import { RoleRequest } from '../role-request';
import { RolesList } from '../roles-list';
import { AppserviceService } from '../appservice.service';
import { CookieService } from 'ngx-cookie-service';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  form: FormGroup;
  rolesList: RolesList[] = [];
  selectedRoles : string[] = []; 
  userEmail = ''; 
  msgShow: boolean =  false;
  valid:boolean;
  message: string;

  static selectedRoles: any;
  static userEmail: string;
  static valid: boolean;
  static msgShow: boolean;

  
  constructor(private formBuilder: FormBuilder, private service: AppserviceService,  private cookieService: CookieService) {
    this.form = this.formBuilder.group({
      roles: new FormArray([])
    });
  }

  ngOnInit() {
    this.userEmail = this.cookieService.get('ttpEmail'); 

    this.service.getRolesListing().subscribe(
      result => {
          this.rolesList = result;
      },
      error => { console.log(error); }
   ); 
  }

  onCheckChange(event: MatCheckboxChange) {
    this.msgShow = false;
    
    if(event.checked){ 
      // Add a new control in the arrayForm
      this.selectedRoles.push(event.source.value);
    }
    /* unselected */
    else{ 
      const value = event.source.value;

      this.selectedRoles = this.selectedRoles.filter(
        (item) => {
          return item !== value;
        }
      ); 
    } 
  }
 
  submit(){ 
    if( this.selectedRoles.length > 0 && this.cookieService.check('ttpEmail') ){   
      let request: RoleRequest = {
      awsArns: this.selectedRoles,
      email: this.userEmail 
      }; 
    
    const data = JSON.stringify(request); 
    console.log(data);
    this.service.postRequest(JSON.parse(data)).subscribe(
        result => { console.log(result); },
        error => { console.log(error); }
      ); 
      this.message = "Request successfully sent!";
      this.valid = true;
    }
    else{
    this.valid = false;
    this.message = "Invalid Selection!"
  }  
    this.msgShow = true;
  }

}