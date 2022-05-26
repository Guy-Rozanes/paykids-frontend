import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-modify-user',
  templateUrl: './modify-user.component.html',
  styleUrls: ['./modify-user.component.css']
})
export class ModifyUserComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private service: LoginService, private _snackBar: MatSnackBar) { }
  inputFormControl = new FormControl({ value: null, disabled: true });
  ngOnInit() {
    console.log(this.data)
  }

  updateUser(userId: string, password: string, firstName: string, lastName: string) {
    this.service.updateUser(userId, password, firstName, lastName).subscribe(data => {
      this._snackBar.open(data['message'])
    })
  }

}
