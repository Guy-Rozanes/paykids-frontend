import { Component, Input, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-my-family',
  templateUrl: './my-family.component.html',
  styleUrls: ['./my-family.component.css']
})
export class MyFamilyComponent implements OnInit {
  private user: any = this.data.currentUser.subscribe(user => this.user = user);
  private family:Array<any> = []
  constructor(private data: DataServiceService, private loginService: LoginService) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user);
    console.log(this.user);
    this.getFamily()
  }

  getFamily() {
    console.log(this.user[1])
    this.loginService.getAllFamily(this.user[1]).subscribe(data => {
      this.family = data['message'];
      console.log(this.family);
    });
  }

  addFamilyMember(email, password, firstName, lastName, familyRole, paybox_id) {
    let response = '';
    console.log(this.user[1])
    this.loginService.signUp(email, password, firstName, lastName, familyRole, paybox_id, this.user[1]).subscribe(data => {
      response = data
    }
    );
    this.family.push(
      [
        email,
        this.user[1],
        password,
        firstName,
        lastName,
        familyRole,
        paybox_id,
    ])
  }
}
