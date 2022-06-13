import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { LoginService } from '../login.service';

interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  private roles: Role[] = [
    { value: '0', viewValue: 'Owner' },
    { value: '1', viewValue: 'Kid' },
  ];
  selectedRole = this.roles[0].value;
  constructor(private matDialog: MatDialog, private service: LoginService, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<AddUserComponent>,
    private _matSnackBar: MatSnackBar) { }
  showSpinner = false;
  ngOnInit() {
  }


  openAddUserStepper() {
    this.matDialog.open(AddUserComponent)
  }

  addFamilyMember(email, password, firstName, lastName, payboxId) {
    this.service.signUp(email, password, firstName, lastName, this.selectedRole, payboxId, this.data.family).subscribe(data => {
      if (data['message'] == 'signup successfully') {
        let amount = Math.floor(Math.random() * 500) + 500;
        this.service.addUserAmount(email, payboxId, amount).subscribe(data => { });
        this.showSpinner = true;
        setTimeout(() => {
          this.showSpinner = false;
          this.dialogRef.close({
            user:
              [
                email,
                this.data.family,
                this.selectedRole,
                firstName,
                lastName,
                payboxId,
                password,
                undefined,
              ]
          });
        }, 10000)
      }
      else {
        this.dialogRef.close();
        this._matSnackBar.open(data['message'])
      }
    })
  }

}

