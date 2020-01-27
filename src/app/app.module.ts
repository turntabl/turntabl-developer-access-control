import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import {AccordionModule} from 'primeng/accordion';     //accordion and accordion tab
import {MenuItem} from 'primeng/api';                 //api
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import {MultiSelectModule} from 'primeng/multiselect';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule } from '@angular/common/http';
import { AppserviceService } from './appservice.service';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, MultiSelectModule,
    ButtonModule, BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot()
  ],
  providers: [
  AppserviceService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
