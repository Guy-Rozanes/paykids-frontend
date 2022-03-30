import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/models/user';
import { DataServiceService } from '../data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:any=null;
  constructor(private data:DataServiceService) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user=>this.user=user);
  }

}
