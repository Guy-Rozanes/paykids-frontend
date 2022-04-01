import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DataServiceService } from './data-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'paykids-front';
  loggedIn=false;
  user:any=''
  constructor(private data:DataServiceService,private router:Router){}
  
  ngOnInit(): void {
    this.data.currentloggedIn.subscribe(loggedIn=>this.loggedIn=loggedIn);
    this.data.currentUser.subscribe(user=>this.user=user);
  }

  logout():void{
    this.loggedIn=false;
    this.data.changeLoggedInStatus(false);
    this.data.initUser(null);
  }

  goToMyFamily(){
    this.router.navigate(['my-family',this.user])
  }

}
