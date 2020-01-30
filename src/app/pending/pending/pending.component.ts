import { Component, OnInit, ViewChild } from '@angular/core';
import { AppserviceService } from 'src/app/appservice.service';
import { PendingRequests } from 'src/app/pending-requests';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material'; 

@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {
  displayedColumns = ['identifier', 'email', 'status', 'request_time', 'roles']; 
 
  pending: PendingRequests[] = []; 
  dataSource: MatTableDataSource<PendingRequests> ;

  constructor(private service: AppserviceService) {
    this.dataSource = new MatTableDataSource(this.pending);
   }

  ngOnInit() {
    this.service.getPendingPermission().subscribe(
      result => {
          this.pending = result;
      },
      error => { console.log(error); }
   ); 
   
  }

}
