import { Component, OnInit, ViewChild } from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {User} from '../../../model/user';
import {MatPaginator, MatTableDataSource, MatSort} from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: Array<User>;
  dataSource: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'name', 'username', 'action'];
  selectedUser: User = new User();
  errorMessage: string;
  infoMessage: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.findAllUsers();
  }

  ngAfterViewInit(){
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  findAllUsers(){
    this.adminService.findAllUsers().subscribe(data => {
      this.userList = data;
      this.dataSource.data = data;
    });
  }

  editUserRequest(user: User) {
    this.selectedUser = user;
    $("#userModal").modal('show');
  }

  editUser(){
    this.adminService.updateUser(this.selectedUser).subscribe(data => {
      let itemIndex = this.userList.findIndex(item => item.id == this.selectedUser.id);
      this.userList[itemIndex] = this.selectedUser;
      this.dataSource = new MatTableDataSource(this.userList);
      this.infoMessage = "Mission is completed.";
      $("#userModal").modal('hide');
    },err => {
      if(err.status === 409){
        this.errorMessage = "Username should be unique for each user.";
      }else{
        this.errorMessage = "Unexpected error occurred.";
      }
    });
  }

  deleteUserRequest(user: User) {
    this.selectedUser = user;
    $("#deleteModal").modal('show');
  }

  deleteUser(){
    this.adminService.deleteUser(this.selectedUser).subscribe(data => {
      let itemIndex = this.userList.findIndex(item => item.id == this.selectedUser.id);
      if(itemIndex !== -1){
        this.userList.splice(itemIndex, 1);
      }
      this.dataSource = new MatTableDataSource(this.userList);
      this.infoMessage = "Mission is completed.";
      $("#deleteModal").modal('hide');
    },err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

}
