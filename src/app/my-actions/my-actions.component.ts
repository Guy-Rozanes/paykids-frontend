import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';
import { NfcComponent } from '../nfc/nfc.component';
import { PayboxSyncComponent } from '../paybox-sync/paybox-sync.component';

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
  selectedIndexNumber = 0;
  private user: any = this.dataService.currentUser.subscribe(user => this.user = user);
  randomProducts = [
    { 'product_name': 'Gum', 'product_price': 2 },
    { 'product_name': 'Magnoom', 'product_price': 10 },
    {},
    { 'product_name': 'Candy', 'product_price': 5 },
    { 'product_name': 'Supergoal', 'product_price': 15 },
    {},
    { 'product_name': 'T-Shirt', 'product_price': 30 },
    {},
    { 'product_name': 'Shoes', 'product_price': 200 },
    {},
    { 'product_name': 'Coca Cola', 'product_price': 9 },
    { 'product_name': 'Sprite', 'product_price': 8 },
    {},
    { 'product_name': 'Fuze Tea', 'product_price': 7 },
  ]
  private userCurrentAmount = 0;
  constructor(private dataService: DataServiceService, private service: LoginService, public dialog: MatDialog, private router: ActivatedRoute, private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.dataService.currentUser.subscribe(user => {
      this.user = user
      if ((!this.user) && localStorage.getItem('user')) {
        this.service.login(localStorage.getItem('user'), localStorage.getItem('pass')).subscribe(data => {
          this.dataService.initUser(data['user']);
          this.user = data['user'];
          this.dataService.changeLoggedInStatus(true)
          this.getAllFamilyActions()
          this.getFamily();
          this.getMyLastActions();
        })
      } else {
        this.getAllFamilyActions()
        this.getFamily();
        this.getMyLastActions();
      }
    })
  }

  addAction(productName: string, price: string) {
    this.service.addAction(this.user[0], productName, price).subscribe(response => {
      if (response['message'] === 'Inserted successfully') {
        this.actions.push(
          [
            undefined,
            this.user[0],
            productName,
            price
          ],
        )
      } else {
        this._snackBar.open(response['message'])
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
      }, 11000);
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
      this.selectedIndexNumber = this.selectedIndex();
    });
  }

  getMyLastActions() {
    this.service.getAllUserActions(this.user[0]).subscribe(
      data => {
        if (data['message'] != 'User doesnt have actions') {
          this.actions = data['message']
        }
      }
    )
  }

  selectedIndex() {
    const userId = this.router.snapshot.paramMap.get('userId')
    if (userId) {
      for (let i = 0; i < this.family.length; i++) {
        if (this.family[i][0] == userId) {
          return i;
        }
      }
    }
    else {
      return 0;
    }
  }

  syncPaybox() {
    const syncDialog = this.dialog.open(PayboxSyncComponent)
    setTimeout(() => {
      syncDialog.close();
      this.service.syncWithPaybox(this.user[0], this.user[6], this.user[8]).subscribe((data:any) => {
        const item:any = data['message']
        if (item.product_name || item) {
          this.service.getUserAmount(this.user[0]).subscribe((response: any) => {
            this.userCurrentAmount = response['message'][0][2];
            if (this.userCurrentAmount < item.product_price) {
              this._snackBar.open('User is synchornized');
            }
            else {
              const newAmount = this.userCurrentAmount - item.product_price;
              this.service.updateUserAmount(this.user[0], newAmount).subscribe(data => { });
              this.addAction(item.product_name, item.product_price.toLocaleString());
            }
          })
        }
        else {
          this._snackBar.open('User is synchornized')
        }
      })
    }, 5000)
  }
}

