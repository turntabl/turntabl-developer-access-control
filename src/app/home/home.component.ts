import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  buildPerms() {
    const arr = this.permissions.perms.map(perm => {
      return this.allSelections.control(perm.selected);
    });
    return this.allSelections.array(arr);
  }


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

  // permissionsForm = this.allSelections.group({
  //   perm1: [true]
  //   // perms: this.allSelections.array([
  //   //   this.allSelections.control('')
  //   // ])
  // });
permissions = {
  perms : [
    {name: 'myRedShiftRole', selected: true, id: 'i'},
    {name: 'perm2', selected: true, id: 'i'}
  ]
}
  permissionsForm = this.allSelections.group({
    perms: this.buildPerms()
    // perms: new FormArray([
    //   new FormControl(true),
    //   new FormControl(false)
    // ])
  })
  
  
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
    //  console.log(this.permissionsForm.controls.perm1.)
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
  submit(value) {
    const formValue = Object.assign({}, value, {
      perms: value.perms.map((selected, i) => {
        return {
          id: this.permissions.perms[i].id,
          selected
       }
      })
    });
  }
  
  constructor(private appserviceService: AppserviceService, private allSelections: FormBuilder) { }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings IDropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
