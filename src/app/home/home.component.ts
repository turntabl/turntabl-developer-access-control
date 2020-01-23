import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // permissionsForm = this.allSelections.group({
  //   perm1: new FormControl(''),
  //   perm2: new FormControl(''),
  //   perm3: new FormControl(''),
  //   perm4: new FormControl(''),
  //   perm5: new FormControl(''),
  //   perm6: new FormControl(''),
  //   perm7: new FormControl(''),
  //   perm8: new FormControl(''),
  //   perm9: new FormControl(''),
  //   perm10: new FormControl(''),
  //   perm11: new FormControl('')
  // });

  permissionsForm = this.allSelections.group({
    perms: this.allSelections.array([
      this.allSelections.control('')
    ])
  });
  
get perms() {
  return this.permissionsForm.get('perms') as FormArray;
}

addPerm() {
  this.perms.push(this.allSelections.control(''));
}
  // msg: string = null;

  onSubmit() {
    
     // TODO: Use EventEmitter with form value
     console.warn(this.permissionsForm.value);
    //  this.permissionsForm.reset;
  //   if (this.profileForm.valid) {
  //     this.appserviceService.sendRequest(this.profileForm.value)
  //     .subscribe(
  //       data => {
  //           console.log("Request Submitted!");
  //         }
  //     )
  //   this.profileForm.reset();
  //   this.msg = "Request sent successfully!";
  //       }
  }

  constructor(private appserviceService: AppserviceService, private allSelections: FormBuilder) { }

  ngOnInit() {
 
  }

}
