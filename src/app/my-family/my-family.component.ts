import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddUserComponent } from '../add-user/add-user.component';
import { BankLoadingComponent } from '../bank-loading/bank-loading.component';

import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';
import { ModifyUserComponent } from '../modify-user/modify-user.component';
import { PremiumWelcomeComponent } from '../premium-welcome/premium-welcome.component';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-my-family',
  templateUrl: './my-family.component.html',
  styleUrls: ['./my-family.component.css']
})
export class MyFamilyComponent implements OnInit {
  private user: any = this.data.currentUser.subscribe(user => this.user = user);
  private family: Array<any> = []
  paymentHandler: any = null;
  private accountType: boolean = false;
  private showSpinner: boolean = false;
  private roles: Role[] = [
    { value: '0', viewValue: 'Owner' },
    { value: '1', viewValue: 'Kid' },
  ];
  selectedRole = this.roles[1].value;
  constructor(private data: DataServiceService, private loginService: LoginService, public dialog: MatDialog) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => {
      this.user = user;
      this.accountType = this.user[7] == 'PREMIUM'
    });

    this.getFamily()
    this.invokeStripe();
  }

  getFamily() {
    this.loginService.getAllFamily(this.user[1]).subscribe(data => {
      this.family = data['message'];
    });
  }

  modifyFamilyMember(person: any) {
    this.dialog.open(ModifyUserComponent, {
      data: {
        person
      }
    })
  }

  removeUser(person: any) {
    this.loginService.deleteUser(person[0]).subscribe(data => {
      this.family = this.family.filter(item => {
        if (item[0] != person[0]) {
          return item;
        }
      })
    })
  }

  addFamilyMember(email, password, firstName, lastName, paybox_id) {
    let response = '';
    this.showSpinner = true;
    this.delay(20000000000);
    setTimeout(() => {
      const dialogRef = this.dialog.open(BankLoadingComponent)
      setTimeout(() => {
        dialogRef.close()
        dialogRef.afterClosed().subscribe(data => {
          this.loginService.signUp(email, password, firstName, lastName, this.selectedRole, paybox_id, this.user[1]).subscribe(data => {
            this.family.push(
              [
                email,
                this.user[1],
                password,
                firstName,
                lastName,
                this.selectedRole,
                paybox_id,
              ])
            this.addAccountAmount(email, paybox_id);
          })
        })
      }, 10000)
    }, 2000);
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
      locale: 'auto',
      token: (stripeToken: any) => {
        this.loginService.editFamilyAccountType(this.user[1], 'PREMIUM').subscribe((response: any) => {
          this.accountType = true;
          this.user[7] = 'PREMIUM';
          this.data.initUser(this.user);
        })
        this.dialog.open(PremiumWelcomeComponent)
      }
    });
    paymentHandler.open({
      name: 'PayKids Premium Account',
      description: 'Buying premium',
      amount: amount * 100,
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (stripeToken: any) {
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
      // this.loginService.saveCreditCard(
      //   this.paymentHandler.stripToken.card.last4,
      //   `${this.paymentHandler.stripeToken.card.exp_month}/${this.paymentHandler.stripeToken.card.exp_year}`
      // )
    }
  }

  addAccountAmount(email: string, bankNumber: string) {
    let amount = Math.floor(Math.random() * 500) + 500;
    this.loginService.addUserAmount(email, bankNumber, amount).subscribe(data => { });
  }

  openAddUserStepper() {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {
        family: this.user[1],
      },
    })
    dialogRef.afterClosed().subscribe((data: any) => {
      const user = data.user
      this.family.push(
        user
      )
    })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
