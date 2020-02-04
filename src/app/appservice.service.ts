import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RolesList } from './roles-list';
import { RoleRequest } from './role-request';
import { PendingRequests } from './pending-requests';
import { BehaviorSubject } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {

  private apiURL = 'https://permission.services.turntabl.io/v1/api/aws-mgnt/';
  constructor(private httpClient: HttpClient) { }

  getRolesListing(): Observable<RolesList[]> {
    return this.httpClient.get<RolesList[]>(this.apiURL + 'roles');
  }
  getPendingPermission(): Observable<PendingRequests[]> {
    return this.httpClient.get<PendingRequests[]>(this.apiURL + 'pending');
  }
  postRequest(roleRequest: RoleRequest): Observable<RoleRequest> {
    return this.httpClient.post<RoleRequest>(this.apiURL + 'send', roleRequest, httpOptions);
  }

  // private messageSource = new BehaviorSubject <string>("default message");
  // currentMessage = this.messageSource.asObservable();
  // changeMessage(message: string) {
  //   this.messageSource.next(message)
  // }
}
