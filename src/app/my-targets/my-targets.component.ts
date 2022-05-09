import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
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
  constructor(private dataService: DataServiceService, private service: LoginService) { }

  ngOnInit() {
    this.dataService.currentUser.subscribe(user => {
      this.user = user
      if (this.user[2] == 'Owner') {
        this.getFamilyTarget();
      }
      else {
        this.getUserTarget();
      }
    });
    this.getFamily();
  }

  getUserTarget() {
    this.service.getUserTarget(this.user[0]).subscribe(data => {
      if (data['message'] != 'User doesnt have actions') {
        this.targets = data['message']
      };
    })
  }

  addUserTarget(targetName, targetPrice) {
    this.service.addTarget(this.user[0], targetName, targetPrice).subscribe((data: any) => {
      this.targets.push(
        [
          undefined,
          this.user[0],
          targetName,
          targetPrice,
        ]
      )
    });
  }

  getFamilyTarget() {
    this.service.getFamilyTarget(this.user[1]).subscribe(data => {
      this.familyTargets = data;
      console.log(this.familyTargets);
      this.familyTargetsKids = Object.keys(this.familyTargets)
      console.log(this.familyTargetsKids);
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
}
