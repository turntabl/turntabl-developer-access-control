import { Component } from '@angular/core';
import { RolesList } from './roles-list';
import { RoleRequest } from './role-request';
import { Md5 } from 'ts-md5';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'turntabl-developer-access-control';
 
  submit(){ 
    if( HomeComponent.selectedRoles.length > 0){   
      let request: RoleRequest = {
      awsArns: HomeComponent.selectedRoles,
      email: HomeComponent.userEmail,
      identifier: Md5.hashStr(Date.now + HomeComponent.userEmail).toString().substring(0,8),
      explanation: ""
    }; 
    
    const data = JSON.stringify(request);
    console.log(data);
    //   this.service.postRequest(JSON.parse(data)).subscribe(
    //     result => { console.log(result); },
    //     error => { console.log(error); }
    //   ); 
      HomeComponent.msg = "Request successfully sent!";
      HomeComponent.valid = true;
    }
    else{
    HomeComponent.valid = false;
    HomeComponent.msg = "Invalid Selection!"
  }  
    HomeComponent.msgShow = true;
  }
}
