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
  myAmount = 0;
  myActions: any = []
  myTargets: any = []
  mySavings: any = []
  arr = [1, 2, 3, 4, 5];
  arr1 = [1, 2, 3, 4, 5];
  unseen_actions: any = [];
  overlayOpen = false;
  constructor(private data: DataServiceService, private service: LoginService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.data.currentUser.subscribe(user => {
      this.user = user
      if (this.user[2] == 'Owner') {
        this.getMyFamily();
        this.getAllFamilyActions();
        this.getAllFamilyTarget();
        this.getAllFamilyAmount();
      } else {
        this.getMyAmount();
        this.getMyLastActions();
        this.getMyTargets();
        this.getMySaving();
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
        console.log(action)
        this.service.updateActionAsMarked(action.action_id).subscribe(data => {
        })
      })
      this.unseen_actions = [];
    })
  }
  getMyFamily() {
    this.service.getAllFamily(this.user[1]).subscribe(response => this.family = response['message']);
  }

  getAllFamilyActions() {
    this.service.getAllFamilyActions(this.user[1]).subscribe(data => {
      console.log(data)
      this.familyActions = data;
      Object.entries(this.familyActions).forEach((item: any) => {
        item[1].forEach((action: any) => {
          if (!action.action_seen) {
            this.unseen_actions.push(action)
          }
        })
      })
      console.log(this.unseen_actions)
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

  getMyAmount() {
    this.service.getUserAmount(this.user[0]).subscribe(
      data => {
        this.myAmount = data['message'][0][2]
        console.log(this.myAmount)
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
          console.log(this.myTargets)
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
        console.log(this.mySavings)
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
