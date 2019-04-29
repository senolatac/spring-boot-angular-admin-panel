import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {User} from "../../../model/user";
import {Product} from "../../../model/product";
import {Transaction} from "../../../model/transaction";
import {MatPaginator, MatTableDataSource, MatSort} from "@angular/material";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  productList: Array<Product>;
  dataSource: MatTableDataSource<Product> = new MatTableDataSource();
  obs: Observable<any>;
  errorMessage: string;
  infoMessage: string;
  currentUser: User;

  constructor(private userService: UserService, private router: Router,
  private cdr: ChangeDetectorRef) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.findAllProducts();
    this.obs = this.dataSource.connect();
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    if(this.dataSource){
      this.dataSource.disconnect();
    }
  }

  findAllProducts(){
    this.userService.findAllProducts().subscribe(data => {
      this.productList = data;
      this.dataSource.data = data;
    });
  }

  purchaseProduct(product: Product){
    if(!this.currentUser){
      this.errorMessage = "You should sign in to purchase a product";
      return;
    }
    var transaction = new Transaction();
    transaction.product = product;
    transaction.user = this.currentUser;
    this.userService.purchaseProduct(transaction).subscribe(data => {
      this.infoMessage = "Mission is completed.";
    },err => {
      this.errorMessage = "Unexpected error occurred";
    });
  }

  detail(product: Product){
    localStorage.setItem("currentProduct", JSON.stringify(product));
    this.router.navigate(['/detail', product.id]);
  }

}
