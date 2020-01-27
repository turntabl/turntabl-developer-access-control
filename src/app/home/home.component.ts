import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  FormControl,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  form: FormGroup;
  rolesList = [
    { roleName: 'myRedShiftRole', roleARN:'arn:aws:iam::926377470665:role/myRedShiftRole', description:'Allows Redshift clusters to call AWS services on your behalf.' },
    { roleName: 'AWSServiceRoleForRDS', roleARN:'arn:aws:iam::926377470665:role/aws-service-role/rds.amazonaws.com/AWSServiceRoleForRDS', description:'Service-linked role used by AWS Organizations to enable integration of other AWS services with Organizations.' }
  ];

  selectedRoles = [];
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      roles: new FormArray([])
    });
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
    console.log(this.selectedRoles);
    
  }

}
