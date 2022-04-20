import { Component, OnInit } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-my-actions',
  templateUrl: './my-actions.component.html',
  styleUrls: ['./my-actions.component.css']
})
export class MyActionsComponent implements OnInit {
  actions = [];
  familyActions = {};
  private user: any = this.dataService.currentUser.subscribe(user => this.user = user);

  constructor(private dataService: DataServiceService, private service: LoginService) {
  }

  ngOnInit() {
    this.dataService.currentUser.subscribe(user => {
      console.log(user);
      this.user = user
    });
    this.service.getAllUserActions(this.user[0]).subscribe(actions => this.actions = actions['message']);
    this.getAllFamilyActions()
  }

  addAction(productName: string, price: string) {
    this.service.addAction(this.user[0], productName, price).subscribe(response => {
      if (response['message'] === 'Inserted successfully') {
        this.actions.push(
          [
            undefined,
            this.user[0],
            productName,
            price
          ],
        )
      }
    })
  }

  getAllFamilyActions() {
    this.service.getAllFamilyActions(this.user[1]).subscribe(data => {
      this.familyActions = data;
    });
  }

  log(val) {
    console.log(val);
  }



}
