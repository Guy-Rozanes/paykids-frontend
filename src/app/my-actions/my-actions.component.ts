import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';
import { NfcComponent } from '../nfc/nfc.component';

@Component({
  selector: 'app-my-actions',
  templateUrl: './my-actions.component.html',
  styleUrls: ['./my-actions.component.css']
})
export class MyActionsComponent implements OnInit {
  actions = [];
  familyActions = {};
  familyActionKids = [];
  family = [];
  private user: any = this.dataService.currentUser.subscribe(user => this.user = user);
  randomProducts = [
    { 'product_name': 'Gum', 'product_price': 2 },
    { 'product_name': 'Magnoom', 'product_price': 10 },
    { 'product_name': 'Candy', 'product_price': 5 },
    { 'product_name': 'Supergoal', 'product_price': 15 },
    { 'product_name': 'Fake Gun', 'product_price': 50 },
    { 'product_name': 'Shoes', 'product_price': 200 },
    { 'product_name': 'Coca Cola', 'product_price': 9 },
    { 'product_name': 'Sprite', 'product_price': 8 },
    { 'product_name': 'Fuze Tea', 'product_price': 7 },
  ]
  private userCurrentAmount = 0;
  constructor(private dataService: DataServiceService, private service: LoginService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.dataService.currentUser.subscribe(user => {
      this.user = user
    });
    this.service.getAllUserActions(this.user[0]).subscribe(actions => {
      if (actions['message'] != 'User doesnt have actions') {
        this.actions = actions['message']
      }
    });
    this.getAllFamilyActions()
    this.getFamily();
  }

  addAction(productName: string, price: string) {
    this.service.addAction(this.user[0], productName, price).subscribe(response => {
      if (response['message'] === 'Inserted successfully') {
        console.log('aaa')
        this.actions.push(
          [
            undefined,
            this.user[0],
            productName,
            price
          ],
        )
      }
    })
  }

  getAllFamilyActions() {
    this.service.getAllFamilyActions(this.user[1]).subscribe(data => {
      this.familyActions = data;
      this.familyActionKids = Object.keys(this.familyActions);
    });
  }

  openNfcReader() {
    const dialogRef = this.dialog.open(NfcComponent, {

    });
    dialogRef.afterOpened().subscribe(_ => {
      setTimeout(() => {
        dialogRef.close();
        const item = this.randomProducts[Math.floor(Math.random() * 9)]
        this.service.getUserAmount(this.user[0]).subscribe((response: any) => {
          this.userCurrentAmount = response['message'][0][2];
          const newAmount = this.userCurrentAmount - item.product_price;
          this.service.updateUserAmount(this.user[0], newAmount).subscribe(data => { });
          this.addAction(item.product_name, item.product_price.toLocaleString());
        })
      }, 5000);
    })
  }

  getFamily() {
    this.service.getAllFamily(this.user[1]).subscribe(data => {
      const family = data['message'];
      for (let item of family) {
        if (item[2] != 'Owner') {
          this.family.push(item[0])
        }
      }
    });
  }

}


