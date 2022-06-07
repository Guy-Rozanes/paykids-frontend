import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { User } from 'src/models/user';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';
import { NotifcationComponent } from '../notifcation/notifcation.component';

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
  familyAmount: any = {};
  familySavings: any = {};
  myAmount = 0;
  myActions: any = []
  myTargets: any = []
  mySavings: any = []
  arr = [1, 2, 3, 4, 5];
  arr1 = [1, 2, 3, 4, 5];
  unseen_actions: any = [];
  overlayOpen = false;
  constructor(private data: DataServiceService, private service: LoginService, private router: Router, public dialog: MatDialog) {

  }

  ngOnInit() {
    this.data.currentUser.subscribe(user => {
      this.user = user
      if ((!this.user) && localStorage.getItem('user')) {
        this.service.login(localStorage.getItem('user'), localStorage.getItem('pass')).subscribe(data => {
          this.data.initUser(data['user']);
          this.user = data['user'];
          this.data.changeLoggedInStatus(true)
          if (this.user[2] == 'Owner') {
            this.getMyFamily();
            this.getAllFamilyActions();
            this.getAllFamilyTarget();
            this.getAllFamilyAmount();
            this.getFamilySavings();
          } else {
            this.getMyAmount();
            this.getMyLastActions();
            this.getMyTargets();
            this.getMySaving();
          }
        }
        )
      } else {
        if (this.user[2] == 'Owner') {
          this.getMyFamily();
          this.getAllFamilyActions();
          this.getAllFamilyTarget();
          this.getAllFamilyAmount();
          this.getFamilySavings();
        } else {
          this.getMyAmount();
          this.getMyLastActions();
          this.getMyTargets();
          this.getMySaving();
        }
      }
    });

  }
  openNot() {
    const dialogRef = this.dialog.open(NotifcationComponent, {
      data: {
        unseen_actions: this.unseen_actions,
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      this.unseen_actions.forEach(action => {
        this.service.updateActionAsMarked(action.action_id).subscribe(data => {
        })
      })
      this.unseen_actions = [];
    })
  }
  getMyFamily() {
    this.service.getAllFamily(this.user[1]).subscribe(response => {
      this.family = response['message']
      this.family = this.family.filter(member => {
        if (member[2] != 'Owner') {
          return member;
        }
      })
    });
  }

  getAllFamilyActions() {
    this.service.getAllFamilyActions(this.user[1]).subscribe(data => {
      this.familyActions = data;
      Object.entries(this.familyActions).forEach((item: any) => {
        item[1].forEach((action: any) => {
          if (!action.action_seen) {
            this.unseen_actions.push(action)
          }
        })
      })
    });
  }

  getAllFamilyTarget() {
    this.service.getFamilyTarget(this.user[1]).subscribe(data => {
      this.familyTargets = data;
    });
  }
  getAllFamilyAmount() {
    this.service.getFamilyUsersAmount(this.user[1]).subscribe(data => {
      this.familyAmount = data;
    });
  }

  getFamilySavings() {
    this.service.getFamilySavings(this.user[1]).subscribe(data => {
      this.familySavings = data['message'];
    });
  }

  getMyAmount() {
    this.service.getUserAmount(this.user[0]).subscribe(
      data => {
        this.myAmount = data['message'][0][2]
      }
    )
  }

  getMyLastActions() {
    this.service.getAllUserActions(this.user[0]).subscribe(
      data => {
        this.myActions = data['message']
      }
    )
  }

  getMyTargets() {
    this.service.getUserTarget(this.user[0]).subscribe(
      data => {
        if (data['message'] != 'User doesnt have targets') {
          this.myTargets = data['message']
        }
      }
    )
  }

  getMySaving() {
    this.service.getMySaving(this.user[0]).subscribe(
      data => {
        this.mySavings = data['message'].filter(item => {
          if (item[4] != 1) {
            return item;
          }
        })
      }
    )
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
