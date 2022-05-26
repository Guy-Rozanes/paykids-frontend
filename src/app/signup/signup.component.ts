import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string = '';
  password: string = '';
  firstName: string = '';
  lastName: string = '';
  familyRole: string = '';
  familyId: string = '';

  constructor(public loginService: LoginService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  signUp(email: string, password: string, firstName: string, lastName: string) {
    let response = '';
    this.loginService.signUp(email, password, firstName, lastName, 'Owner', null).subscribe(data => {
      response = data;
      this._snackBar.open(response['message'])
      if (response['message'] == 'signup successfully') {
        this.familyId = data.family_id
        this.loginService.addFamilyAccountType(this.familyId, 'FREE').subscribe(data => { })
        this.router.navigate(['login'])
      }
    }
    );
  }
}
