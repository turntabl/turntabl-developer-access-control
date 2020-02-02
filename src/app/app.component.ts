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
}
