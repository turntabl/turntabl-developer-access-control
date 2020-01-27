import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

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
}
