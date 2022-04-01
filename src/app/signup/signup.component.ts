import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
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
  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
  }

  signUp(email:string,password:string,firstName:string,lastName:string) {
    let response = '';
    this.loginService.signUp(email, password, firstName, lastName, 'Owner', null).subscribe(data => {
      response = data
    }
    );
    return response;
  }
}
