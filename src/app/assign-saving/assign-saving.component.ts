declare var require: any;
import { Component, OnInit } from '@angular/core';
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
  constructor(private service: LoginService, private data: DataServiceService) { }
  private user: any = this.data.currentUser.subscribe(user => this.user = user);
  private myKids: any = {};
  videos: Video[] = [
    { value: 'video-0', viewValue: 'Allowance', url: '../../assets/Allowance.mp4', price: 35 },
    { value: 'video-1', viewValue: 'Finance Words', url: '../../assets/Finance words.mp4', price: 40 },
  ];

  videoToShow = {
    'Allowance': '../../assets/Allowance.mp4',
    'Finance Words': '../../assets/Finance words.mp4',
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
    this.service.insertSavings(this.selectedKid[0], this.selectedVideo.viewValue, this.selectedVideo.price).subscribe(data => { });
  }

  getVideo(){
    console.log(this.videoToShow[this.selectedVideo.viewValue])
  }
}
