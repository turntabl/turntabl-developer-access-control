import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
import { CookieService } from 'ngx-cookie-service';
import {Md5} from 'ts-md5/dist/md5';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  form: FormGroup;
  rolesList: RolesList[] = [];
  // msg: String = "Testing";
  selectedRoles = []; 
  userEmail = ''; 
  msgShow: boolean =  false;
  valid:boolean;

  // checked: boolean = false;
  @Input() message: string;

  static selectedRoles: any;
  static userEmail: string;
  
  static valid: boolean;
  static msgShow: boolean;

  // @Output() messageEvent = new EventEmitter<string>();
  
  constructor(private formBuilder: FormBuilder, private service: AppserviceService,  private cookieService: CookieService) {
    this.form = this.formBuilder.group({
      roles: new FormArray([])
    });
  }

  // sendMessage(){
  //   this.messageEvent.emit(this.msg)
  // }
  // message: string;
  ngOnInit() {
    this.userEmail = this.cookieService.get('ttpEmail'); 

    this.service.getRolesListing().subscribe(
      result => {
          this.rolesList = result;
      },
      error => { console.log(error); }
   ); 

// this.service.currentMessage.subscribe(message => this.message = message)
  }
 
  // onChecked() {
  //   this.checked= !this.checked;
  //   return false;
  //   }

  onCheckChange(event) {
    // this.onChecked();
    this.msgShow = false;
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

 onCardClick(evt: PointerEvent){
    this.onCheckChange(evt.pressure);
    console.log(evt);
  }

  // newMessage() {
  //   this.service.changeMessage("Hiiiiiii")
  // }
  submit(){ 
    if( this.selectedRoles.length > 0){   
      let request: RoleRequest = {
      awsArns: this.selectedRoles,
      email: this.userEmail,
      identifier: Md5.hashStr(Date.now + this.userEmail).toString().substring(0,8),
      explanation: ""
    }; 
    
    const service = JSON.stringify(request);
    console.log(service);
    //   this.service.postRequest(JSON.parse(service)).subscribe(
    //     result => { console.log(result); },
    //     error => { console.log(error); }
    //   ); 
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