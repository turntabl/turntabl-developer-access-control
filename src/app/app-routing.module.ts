import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PendingComponent } from './pending/pending/pending.component';


const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "pending", component: PendingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
