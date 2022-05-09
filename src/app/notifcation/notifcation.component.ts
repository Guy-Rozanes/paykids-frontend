import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-notifcation',
  templateUrl: './notifcation.component.html',
  styleUrls: ['./notifcation.component.css']
})
export class NotifcationComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<NotifcationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
