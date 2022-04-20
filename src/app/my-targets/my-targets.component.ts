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
  private user: any = {};
  constructor(private dataService: DataServiceService, private service: LoginService) { }

  ngOnInit() {
    this.dataService.currentUser.subscribe(user => this.user = user);
    this.getUserTarget()
    this.getFamilyTarget()
  }

  getUserTarget() {
    this.service.getUserTarget(this.user[0]).subscribe(data => {
      this.targets = data['message']
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
  
  getFamilyTarget(){
    this.service.getFamilyTarget(this.user[1]).subscribe(data=>this.familyTargets=data);
  }

}
