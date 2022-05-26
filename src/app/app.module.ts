import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule, MatSnackBar, MatCardModule, MAT_DIALOG_DATA, MatDialogRef, MatExpansionModule, MatProgressSpinnerModule, MatBadgeModule,MatTabsModule,
} from '@angular/material';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import {OverlayModule} from '@angular/cdk/overlay';
import { LoginService } from './login.service';
import { DataServiceService } from './data-service.service';
import { HomeComponent } from './home/home.component';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MyActionsComponent } from './my-actions/my-actions.component';
import { MySavingsComponent } from './my-savings/my-savings.component';
import { MyTargetsComponent } from './my-targets/my-targets.component';
import { MyFamilyComponent } from './my-family/my-family.component';
import { MatListModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { NfcComponent } from './nfc/nfc.component';
import { AssignSavingComponent } from './assign-saving/assign-saving.component';
import { CampaignScreenComponent } from './campaign-screen/campaign-screen.component';
import { NotifcationComponent } from './notifcation/notifcation.component';
import { BankLoadingComponent } from './bank-loading/bank-loading.component';
import { ModifyUserComponent } from './modify-user/modify-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PremiumWelcomeComponent } from './premium-welcome/premium-welcome.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    MyActionsComponent,
    MySavingsComponent,
    MyTargetsComponent,
    MyFamilyComponent,
    NfcComponent,
    AssignSavingComponent,
    CampaignScreenComponent,
    NotifcationComponent,
    BankLoadingComponent,
    ModifyUserComponent,
    PremiumWelcomeComponent,
  ],
  entryComponents: [NfcComponent, CampaignScreenComponent,NotifcationComponent,BankLoadingComponent,ModifyUserComponent,PremiumWelcomeComponent],
  imports: [
    MatListModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    OverlayModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [HttpClient, LoginService, DataServiceService, MatSnackBar, { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 2500 } }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
