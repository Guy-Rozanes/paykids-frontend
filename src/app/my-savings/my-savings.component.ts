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
  ];
  private amount;
  private mySavingCampaigns = [];
  private user: any = this.data.currentUser.subscribe(user => this.user = user);
  constructor(private service: LoginService, private data: DataServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => {
      this.user = user;
    });
    this.mySavings();
    this.getUserAmount();
  }

  mySavings() {
    this.service.getMySaving(this.user[0]).subscribe(data => {
      this.mySavingCampaigns = data['message']
    });
  }

  getUserAmount() {
    this.service.getUserAmount(this.user[0]).subscribe(
      data => {
        this.amount = data['message'][0][2];
      }
    )
  }

  showYourAction(saving) {
    const dialogRef = this.dialog.open(CampaignScreenComponent, {
      data: {
        saving,
        user: this.user,
        amount:this.amount,
      }
    });

  }
}
