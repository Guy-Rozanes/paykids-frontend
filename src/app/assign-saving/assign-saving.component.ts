declare var require: any;
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { first } from 'rxjs/operators';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';
interface Video {
  value: string;
  viewValue: string;
  url: string;
  price: number;
}
@Component({
  selector: 'app-assign-saving',
  templateUrl: './assign-saving.component.html',
  styleUrls: ['./assign-saving.component.css']
})
export class AssignSavingComponent implements OnInit {
  constructor(private service: LoginService, private data: DataServiceService, private _snackBar: MatSnackBar) { }
  private user: any = this.data.currentUser.subscribe(user => this.user = user);
  private myKids: any = {};
  videos: Video[] = [
    { value: 'video-0', viewValue: 'Allowance', url: '../../assets/Allowance.mp4', price: 35 },
    { value: 'video-1', viewValue: 'Finance Words', url: '../../assets/Finance words.mp4', price: 40 },
    { value: 'video-2', viewValue: 'Family Savings', url: '../../assets/Family Savings.mp4', price: 45 },
    { value: 'video-3', viewValue: 'Income and Outcome', url: '../../assets/Income and Outcome.mp4', price: 50 },
    { value: 'video-4', viewValue: 'Supermarket Shopping', url: '../../assets/Supermarket Shopping.mp4', price: 55 },
  ];


  videoToShow = {
    'Allowance': '../../assets/Allowance.mp4',
    'Finance Words': '../../assets/Finance words.mp4',
    'Family Savings': '../../assets/Family Savings.mp4',
    'Income and Outcome': '../../assets/Income and Outcome.mp4',
    'Supermarket Shopping': '../../assets/Supermarket Shopping.mp4'
  }
  selectedVideo: Video = undefined;
  selectedKid = '';
  selectedKidAllowance = '';
  paymentHandler: any = null;
  ngOnInit() {
    this.invokeStripe();
    this.data.currentUser.subscribe(user => {
      this.user = user
      if ((!this.user) && localStorage.getItem('user')) {
        this.service.login(localStorage.getItem('user'), localStorage.getItem('pass')).subscribe(data => {
          this.data.initUser(data['user']);
          this.user = data['user'];
          this.data.changeLoggedInStatus(true)
          this.getMyKids();
        })
      } else {
        this.getMyKids();
      }
    });
  }


  getMyKids() {
    this.service.getMyKids(this.user[1]).subscribe(data =>
      this.myKids = data['message']);
    this.selectedKid = this.myKids[0][0]
  }

  addSavingExc() {
    this.service.insertSavings(this.selectedKid[0], this.selectedVideo.viewValue, this.selectedVideo.price).subscribe(data => {
      this._snackBar.open(data['message'])
    });
  }

  getVideo() {
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
      locale: 'auto',
      token: (stripeToken: any) => {
        this.addSavingExc();
      }
    });
    paymentHandler.open({
      name: 'Pay to your kid',
      description: '',
      amount: amount,
    });
  }
  initializePaymentAllownce(kid, amount) {
    if (parseInt(amount) < 0 || parseInt(amount) > 1000) {
      this._snackBar.open('Allowance limitation is 0 to 1000')
    }
    else {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
        locale: 'auto',
        token: (stripeToken: any) => {
          this.service.getUserAmount(kid[0]).subscribe(data => {
            const kidsAmount = parseInt(data['message'][0][2]);
            const newAmount = parseInt(amount) + kidsAmount;
            this.service.updateUserAmount(kid[0], newAmount).subscribe(data => {
              this._snackBar.open('Paid Succesfully')
            })
          })
        }
      });
      paymentHandler.open({
        name: 'Pay to your kid',
        description: '',
        amount: '',
      });
    }
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
    }
  }
}
