import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';
import { RoleRequest } from '../role-request';
import { RolesList } from '../roles-list';
import { AppserviceService } from '../appservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  form: FormGroup;
  rolesList: RolesList[] = [];

  selectedRoles = [];

  constructor(private formBuilder: FormBuilder, private service: AppserviceService) {
    this.form = this.formBuilder.group({
      roles: new FormArray([])
    });
  }

  ngOnInit() {
    this.service.getRolesListing().subscribe(
      result => {
          this.rolesList = result;
          console.log(result);
      },
      error => { console.log(error); }
   ); 
  }

  onCheckChange(event) {
    const formArray: FormArray = this.form.get('roles') as FormArray;
  
    /* Selected */
    if(event.target.checked){
      // Add a new control in the arrayForm
      formArray.push(new FormControl(event.target.value));
    }
    /* unselected */
    else{
      // find the unselected element
      let i: number = 0;
  
      formArray.controls.forEach((ctrl: FormControl) => {
        if(ctrl.value == event.target.value) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
  
        i++;
      }); 
    }
    this.selectedRoles = formArray.value;
  }

  submit(){
    let request: RoleRequest;
    request.awsArns = this.selectedRoles;
    request.email = 'user@email.io';
    
     const data = JSON.stringify(request, null, 4);
      /*this.service.postRequest(JSON.parse(data)).subscribe(
        result => { console.log(result); },
        error => { console.log(error); }
      ); */
      alert('SUCCESS!! :-)\n\n' + data + '\n Request submitted successfully!');
    
  }

}
