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
  ngOnInit() {
    this.data.currentUser.subscribe(user => {
      this.user = user;
    });
    this.getMyKids();
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
    console.log(this.videoToShow[this.selectedVideo.viewValue])
  }
}
