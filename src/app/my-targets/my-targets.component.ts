import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-my-targets',
  templateUrl: './my-targets.component.html',
  styleUrls: ['./my-targets.component.css']
})
export class MyTargetsComponent implements OnInit {
  private targets: any = [];
  private familyTargets: any = {};
  familyTargetsKids = [];
  family = [];
  private user: any = {};
  constructor(private dataService: DataServiceService, private service: LoginService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.currentUser.subscribe(user => {
      this.user = user
      if ((!this.user) && localStorage.getItem('user')) {
        this.service.login(localStorage.getItem('user'), localStorage.getItem('pass')).subscribe(data => {
          this.dataService.initUser(data['user']);
          this.user = data['user'];
          this.dataService.changeLoggedInStatus(true)
          if (this.user[2] == 'Owner') {
            this.getFamilyTarget();
            this.getFamily();
          }
          else {
            this.getUserTarget();
          }
        })
      }else{
        if (this.user[2] == 'Owner') {
          this.getFamilyTarget();
          this.getFamily();
        }
        else {
          this.getUserTarget();
        }
      }
    });

  }

  getUserTarget() {
    this.service.getUserTarget(this.user[0]).subscribe(data => {
      if (data['message'] != 'User doesnt have targets') {
        this.targets = data['message']
      };
    })
  }

  addUserTarget(targetName, targetPrice) {
    this.service.addTarget(this.user[0], targetName, targetPrice).subscribe((data: any) => {
      if (data['message'] == 'Inserted successfully')
        this.targets.push(
          [
            undefined,
            this.user[0],
            targetName,
            targetPrice,
          ]
        )
      else {
        this._snackBar.open(data['message'])
      }
    });
  }

  getFamilyTarget() {
    this.service.getFamilyTarget(this.user[1]).subscribe(data => {
      this.familyTargets = data;
      this.familyTargetsKids = Object.keys(this.familyTargets)
    }
    );
  }

  getFamily() {
    this.service.getAllFamily(this.user[1]).subscribe(data => {
      const family = data['message'];
      for (let item of family) {
        if (item[2] != 'Owner') {
          this.family.push(item[0])
        }
      }
    });
  }

  removeTargets(target) {
    this.service.deleteTarget(target[0]).subscribe(data => {
      if (data['message'] == 'Deleted') {
        this.targets = this.targets.filter(item => {
          if (item != target) {
            return item
          }
        })
      }
    })
  }
}
