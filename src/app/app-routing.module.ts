import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignSavingComponent } from './assign-saving/assign-saving.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyActionsComponent } from './my-actions/my-actions.component';
import { MyFamilyComponent } from './my-family/my-family.component';
import { MySavingsComponent } from './my-savings/my-savings.component';
import { MyTargetsComponent } from './my-targets/my-targets.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'my-family', component: MyFamilyComponent },
  { path: 'my-actions/:userId', component: MyActionsComponent },
  { path: 'targets', component: MyTargetsComponent },
  { path: 'assign-savings', component: AssignSavingComponent },
  { path: 'my-savings', component: MySavingsComponent },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
