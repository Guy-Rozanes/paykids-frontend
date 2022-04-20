import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: any = null;
  family: any = [];
  familyActions: any = {};
  familyTargets: any = {};
  arr = [1, 2, 3, 4, 5]
  constructor(private data: DataServiceService, private service: LoginService, private router: Router) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => this.user = user);
    this.getMyFamily();
    this.getAllFamilyActions();
    this.getAllFamilyTarget();
  }
  getMyFamily() {
    this.service.getAllFamily(this.user[1]).subscribe(response => this.family = response['message']);
  }

  getAllFamilyActions() {
    this.service.getAllFamilyActions(this.user[1]).subscribe(data => {
      this.familyActions = data;
    });
  }

  getAllFamilyTarget() {
    this.service.getFamilyTarget(this.user[1]).subscribe(data => {
      this.familyTargets = data;
    });
  }

  counter(i: number) {
    return new Array(i);
  }

  navigateToActions() {
    this.router.navigate(['my-actions'])
  }

  navigateToTarget() {
    this.router.navigate(['targets'])
  }

}
