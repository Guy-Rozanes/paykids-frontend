import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private user=new BehaviorSubject<User>(null);
  currentUser=this.user.asObservable();

  private loggedIn = new BehaviorSubject<boolean>(false);
  currentloggedIn = this.loggedIn.asObservable();

  constructor() { }

  changeLoggedInStatus(status:boolean) {
    this.loggedIn.next(status);
  }

  initUser(user:any){
    this.user.next(user);
  }

}
