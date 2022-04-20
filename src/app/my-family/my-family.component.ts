import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';

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
  constructor(private data: DataServiceService, private loginService: LoginService) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => {
      this.user = user;
      this.accountType=this.user[7]=='PREMIUM'
    });
    console.log(this.user);
    this.getFamily()
    this.invokeStripe()
  }

  getFamily() {
    console.log(this.user[1])
    this.loginService.getAllFamily(this.user[1]).subscribe(data => {
      this.family = data['message'];
      console.log(this.family);
    });
  }

  addFamilyMember(email, password, firstName, lastName, familyRole, paybox_id) {
    let response = '';
    console.log(this.user[1])
    this.loginService.signUp(email, password, firstName, lastName, familyRole, paybox_id, this.user[1]).subscribe(data => {
      response = data
    }
    );
    this.family.push(
      [
        email,
        this.user[1],
        password,
        firstName,
        lastName,
        familyRole,
        paybox_id,
      ])
  }
  initializePayment(amount: number) {
    this.loginService.editFamilyAccountType(this.user[1], 'PREMIUM').subscribe((response: any) => {
      console.log('asdasd')
      console.log(response)
      if (response.message == 'ok') {
        this.accountType = true;
      }
    })
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
      locale: 'auto',
      token: function (stripeToken: any) {
        console.log({ stripeToken })
        alert('Stripe token generated!');
      }
    });
    paymentHandler.open({
      name: 'PayKids Premium Account',
      description: 'Buying premium',
      amount: amount * 100
    });
  }
  invokeStripe() {
    console.log(this.user[1])
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
            console.log(stripeToken)
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
}
