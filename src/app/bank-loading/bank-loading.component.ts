import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-bank-loading',
  templateUrl: './bank-loading.component.html',
  styleUrls: ['./bank-loading.component.css']
})
export class BankLoadingComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<BankLoadingComponent>) { }

  ngOnInit() {
  }

}
