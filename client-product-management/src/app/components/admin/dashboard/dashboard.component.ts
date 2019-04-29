import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userCount:any = "";
  productCount:any = "";
  transactionCount:any = "";

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.numberOfUsers();
    this.numberOfProducts();
    this.numberOfTransactions();
  }

  numberOfUsers(){
    this.adminService.numberOfUsers().subscribe(data => {
      this.userCount = data.response;
    });
  }

  numberOfProducts(){
    this.adminService.numberOfProducts().subscribe(data => {
      this.productCount = data.response;
    });
  }

  numberOfTransactions(){
    this.adminService.numberOfTransactions().subscribe(data => {
      this.transactionCount = data.response;
    })
  }

}
