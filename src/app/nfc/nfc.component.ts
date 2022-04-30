declare var require:any;
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.component.html',
  styleUrls: ['./nfc.component.css']
})
export class NfcComponent implements OnInit {

  constructor() { }
  private nfcImage = require("./assets/download.png");
  ngOnInit() {
  }

}
