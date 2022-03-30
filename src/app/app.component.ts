import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DataServiceService } from './data-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'paykids-front';
  loggedIn=false;

  constructor(private data:DataServiceService){}
  
  ngOnInit(): void {
    this.data.currentloggedIn.subscribe(loggedIn=>this.loggedIn=loggedIn);
  }

  logout():void{
    this.loggedIn=false;
    this.data.changeLoggedInStatus(false);
    this.data.initUser(null);
    console.log(this.loggedIn);
  }

}
