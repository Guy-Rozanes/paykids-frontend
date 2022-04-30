import { Component, OnInit } from '@angular/core';
interface Video {
  value: string;
  viewValue: string;
  url: string;
  price: number;
}
@Component({
  selector: 'app-campaign-screen',
  templateUrl: './campaign-screen.component.html',
  styleUrls: ['./campaign-screen.component.css']
})
export class CampaignScreenComponent implements OnInit {
  videos = {
    'Allowance': 'src/app/assign-saving/videos/Allowance.mp4',
    'Finance words': 'src\app\assign-saving\videos\Finance words.mp4',
  }
  constructor() { }

  ngOnInit() {
  }

}
