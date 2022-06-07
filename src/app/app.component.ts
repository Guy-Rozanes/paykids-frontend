import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { DataServiceService } from './data-service.service';
import { Router } from '@angular/router';
import { LoginService } from './login.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'paykids-front';
  loggedIn = false;
  user: any = ''
  family: any = {};
  familyActions = {};
  unseen_actions = [];
  constructor(private data: DataServiceService, private router: Router, private service: LoginService) { }

  ngOnInit(): void {
    this.data.currentloggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.data.currentUser.subscribe(user => this.user = user);
    this.getAllFamilyActions();
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('user');
    localStorage.removeItem('pass');
    this.data.changeLoggedInStatus(false);
    this.data.initUser(null);
    this.getMyFamily();
  }

  goHomePage() {
    if(this.user){
      this.router.navigate(['home'])
    }
    else{
      this.router.navigate(['login'])
    }
    
  }

  goToMyFamily() {
    this.router.navigate(['my-family'])
  }

  getMyFamily() {
    this.service.getAllFamily(this.user[1]).subscribe(response => this.family = response);
  }

  getAllFamilyActions() {
    this.service.getAllFamilyActions(this.user[1]).subscribe(data => {
      this.familyActions = data;
      for (let item of Object.entries(this.familyActions)) {
        for (let action of item) {
          if (!action['action_seen']) {
            this.unseen_actions.push(item)
          }
        }
      }
    });
  }


}
