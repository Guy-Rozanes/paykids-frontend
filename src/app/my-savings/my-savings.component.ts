import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CampaignScreenComponent } from '../campaign-screen/campaign-screen.component';
interface Video {
  value: string;
  viewValue: string;
  url: string;
  price: number;
}
@Component({
  selector: 'app-my-savings',
  templateUrl: './my-savings.component.html',
  styleUrls: ['./my-savings.component.css']
})
export class MySavingsComponent implements OnInit {
  videos: Video[] = [
    { value: 'video-0', viewValue: 'Allowance', url: 'src/app/assign-saving/videos/Allowance.mp4', price: 35 },
    { value: 'video-1', viewValue: 'Finance Words', url: 'src\app\assign-saving\videos\Finance words.mp4', price: 40 },
    { value: 'video-2', viewValue: 'Family Savings', url: '../../assets/Family Savings.mp4', price: 45 },
    { value: 'video-3', viewValue: 'Income and Outcome', url: '../../assets/Income and Outcome.mp4', price: 40 },
    { value: 'video-4', viewValue: 'Supermarket Shopping', url: '../../assets/Supermarket Shopping.mp4', price: 50 },
  ];
  private amount;
  private mySavingCampaigns = [];
  private savingKids = [];
  family = [];
  private user: any = this.data.currentUser.subscribe(user => this.user = user);
  constructor(private service: LoginService, private data: DataServiceService, public dialog: MatDialog) { }
  familySaving = {};
  ngOnInit() {
    this.data.currentUser.subscribe(user => {
      this.user = user;
      if ((!this.user) && localStorage.getItem('user')) {
        this.service.login(localStorage.getItem('user'), localStorage.getItem('pass')).subscribe(data => {
          this.data.initUser(data['user']);
          this.user = data['user'];
          this.data.changeLoggedInStatus(true)
          this.mySavings();
          this.getUserAmount();
          this.getFamily();
          this.getAllFamilySavings();
        })
      } else {
        this.mySavings();
        this.getUserAmount();
        this.getFamily();
        this.getAllFamilySavings();
      }
    });
  }

  mySavings() {
    this.service.getMySaving(this.user[0]).subscribe(data => {
      this.mySavingCampaigns = data['message']
    })
  }

  getUserAmount() {
    this.service.getUserAmount(this.user[0]).subscribe(
      data => {
        this.amount = data['message'][0][2];
      }
    )
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

  getAllFamilySavings() {
    this.service.getFamilySavings(this.user[1]).subscribe(data => {
      this.familySaving = data['message'];
      this.savingKids = Object.keys(this.familySaving);
    });
  }

  showYourAction(saving) {
    const dialogRef = this.dialog.open(CampaignScreenComponent, {
      data: {
        saving,
        user: this.user,
        amount: this.amount,
      }
    });

  }
}
