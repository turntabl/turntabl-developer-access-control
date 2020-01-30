import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import {MenuItem} from 'primeng/api';                 //api
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MultiSelectModule} from 'primeng/multiselect';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { AppserviceService } from './appservice.service';
// Cookie stuff
import {CookieService} from 'ngx-cookie-service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';
// import { MdbNavBar} from './mdb-nav-bar.component';
// import { ModalComponent } from './modal/modal.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { PendingComponent } from './pending/pending/pending.component';
import  {MatTableModule }   from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PendingComponent,
    MatTableModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, MultiSelectModule,
    ButtonModule, BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    // MdbNavBar,
    // MDBBootstrapModule.forRoot(),
    // ModalModule.forRoot(),
    MatCheckboxModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
  CookieService,
  AppserviceService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
