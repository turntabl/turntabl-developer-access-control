import { Component, OnInit } from '@angular/core';
import { AppserviceService } from '../appservice.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // profileForm = new FormGroup({
  //   permission_name1: new FormControl(''),
  //   permission_name2: new FormControl(''),
  //   permission_name3: new FormControl(''),
  //   permission_name4: new FormControl(''),
  //   permission_name5: new FormControl(''),
  //   permission_name6: new FormControl(''),
  //   permission_name7: new FormControl(''),
  //   permission_name8: new FormControl(''),
  //   permission_name9: new FormControl(''),
  //   permission_name10: new FormControl(''),
  //   permission_name11: new FormControl('')
  // });

  msg: string = null;

  // onSubmit() {
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
  // }
  constructor(private appserviceService: AppserviceService) { }

  ngOnInit() {


  }

}
