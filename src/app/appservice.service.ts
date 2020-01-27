import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RolesList } from './roles-list';
import { RoleRequest } from './role-request';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  private apiURL = 'http://accountpermission-env.nbhdf7zwaf.eu-west-2.elasticbeanstalk.com/v1/api/aws-mgnt/';
  constructor(private httpClient: HttpClient) { }

  getCustomers(): Observable<RolesList[]> {
    return this.httpClient.get<RolesList[]>(this.apiURL);
  }
  postCustomer(roleRequest: RoleRequest): Observable<RoleRequest> {
    return this.httpClient.post<RoleRequest>(this.apiURL, roleRequest, httpOptions);
  }
}
