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
  MatSlideToggleModule,MatSnackBar,
  MatCardModule,
} from '@angular/material';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { LoginService } from './login.service';
import { DataServiceService } from './data-service.service';
import { HomeComponent } from './home/home.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MyActionsComponent } from './my-actions/my-actions.component';
import { MySavingsComponent } from './my-savings/my-savings.component';
import { MyTargetsComponent } from './my-targets/my-targets.component';
import { MyFamilyComponent } from './my-family/my-family.component';


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
  ],
  imports: [
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
  ],
  providers: [HttpClient,LoginService,DataServiceService,MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
