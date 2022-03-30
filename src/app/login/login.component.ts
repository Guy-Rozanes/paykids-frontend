import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn=false;
  user=null;
  constructor(public loginService: LoginService,private dataService:DataServiceService,private router:Router) { }

  ngOnInit(): void {
    this.dataService.currentloggedIn.subscribe(loggedIn=>this.loggedIn=loggedIn);
    this.dataService.currentUser.subscribe(user=>this.user=user);
  }

  login(email: string, password: string): void {
    this.loginService.login(email, password)
    sessionStorage.setItem('email',email);
    this.dataService.changeLoggedInStatus(true);
    this.dataService.currentloggedIn.subscribe(message=>console.log(message));
    this.dataService.initUser({'email':email});
    this.router.navigate(['home',{'email':email}])
    }
    
  }

