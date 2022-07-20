import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DataServiceService } from '../data-service.service';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-choose-card',
  templateUrl: './choose-card.component.html',
  styleUrls: ['./choose-card.component.css']
})
export class ChooseCardComponent implements OnInit {
  cards = []
  payment = false
  user = undefined
  constructor(private loginService: LoginService, private dataService: DataServiceService, private dialogRef: MatDialogRef<ChooseCardComponent>) {
    this.dataService.currentUser.subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit() {
    this.getCards();
  }

  getCards() {
    this.loginService.getCreditCard(this.user[0]).subscribe(data => {
      this.cards = data['message']
      console.log(this.cards[0])
    })
  }

  choose(creditCard = undefined) {
    if (creditCard) {
      this.payment = true;
      setTimeout(() => {
        this.dialogRef.close(
          {
            'choose': true,
          }
        )
      }, 3000)
    } else {
      this.dialogRef.close(
        {
          'choose': false,
        }
      )
    }
  }

  deleteCard(creditCard) {
    this.loginService.deleteCreditCard(creditCard[1], creditCard[2]).subscribe(data => {
      if (data['message'] == 'Card Deleted') {
        this.cards = this.cards.filter(item => {
          if (item[1] != creditCard[1] && item[2] != creditCard[2]) {
            return item
          }
        })
      }
    })
  }
}
