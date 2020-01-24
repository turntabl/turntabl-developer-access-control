import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
// import { IDropdownSettings } from 'ng-multiselect-dropdown/public_api';
// import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  dropdownSettings:IDropdownSettings;
  dropdownList = [];
  selectedItems = [];
  // onDeSelect = this.onItemDeSelect(Event);
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
    {item: 'myRedShiftRole', selected: true, id: 'i'},
    {item: 'perm2', selected: true, id: 'i'}
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
   msg: string = null;

  onSubmit() {
    
     // TODO: Use EventEmitter with form value
     console.log(this.selectedItems);
   
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
      { item_id: 1, item_text: 'myRedShiftRole', roleARN: 'arn:aws:iam::926377470665:role/myRedShiftRole', item_description: 'Allows Redshift clusters to call AWS services on your behalf.'},
      { item_id: 2, item_text: 'AWSServiceRoleForRDS', roleARN: 'arn:aws:iam::926377470665:role/aws-service-role/rds.amazonaws.com/AWSServiceRoleForRDS', item_description: 'Allows Amazon RDS to manage AWS resources on your behalf' },
      { item_id: 3, item_text: 'aws-elasticbeanstalk-ec2-role', roleARN: '', item_description: 'null' },
      { item_id: 4, item_text: 'AWSServiceRoleForOrganizations', roleARN: '', item_description: 'Service-linked role used by AWS Organizations to enable integration of other AWS services with Organizations.' },
      { item_id: 5, item_text: 'AWSServiceRoleForElasticLoadBalancing', roleARN: '', item_description: 'Allows ELB to call AWS services on your behalf.' }
    ];
    this.selectedItems = [
      
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };
    
  }
  // app: any.filter('item_text', function() {
  //   return function(items, item) {
  //       var arrayToReturn = [];
  //       for (var i = 0; i < items.length; i++) {
  //           if (items[i].item != item.item) {
  //               arrayToReturn.push(items[i]);
  //           }
  //       }
  //       return arrayToReturn;
  //   };
// });
  onItemSelect(item: any) {
    console.log(item);
    this.selectedItems.push(item);
  }

  onItemDeSelect(item: any){
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    console.log(item + "removed")
    console.log(this.selectedItems)
  }

  onSelectAll(items: any) {
    this.selectedItems.push(items);
    console.log(items);
  }
}