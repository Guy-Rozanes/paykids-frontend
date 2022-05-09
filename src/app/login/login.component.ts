import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';
import { User } from 'src/models/user';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loggedIn = false;
  user = null;
  constructor(public loginService: LoginService, private dataService: DataServiceService,
    private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dataService.currentloggedIn.subscribe(loggedIn => this.loggedIn = loggedIn);
    this.dataService.currentUser.subscribe(user => {
      this.user = user
    });
  }

  login(email: string, password: string): void {
    let response = '';
    this.loginService.login(email, password).subscribe(data => {
      response = data;
      if (response['message'] === 'login successfully') {
        sessionStorage.setItem('email', email);
        this.dataService.changeLoggedInStatus(true);
        this.dataService.initUser(response['user']);
        this.router.navigate(['home'])
        if (response['user'][7] == 'FREE') {
          this._snackBar.open('Buy Premium Accout for more features', undefined, {
            panelClass: ['snackBar'],
          });
        }
      }
      else {
        this._snackBar.open(response['message'],undefined,{
          panelClass: ['snackBar'],
        });
      }
    }
    );

  }
}

