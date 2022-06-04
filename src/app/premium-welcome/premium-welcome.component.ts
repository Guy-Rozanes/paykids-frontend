import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-premium-welcome',
  templateUrl: './premium-welcome.component.html',
  styleUrls: ['./premium-welcome.component.css']
})
export class PremiumWelcomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  features = [
    'New Parent Dashboard',
    'More educative videos',
    'Sync your payment from paybox',
  ]
  ngOnInit() {
  }
  

}
