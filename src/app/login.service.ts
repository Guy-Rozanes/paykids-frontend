import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import * as internal from 'assert';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  headers = { 'content-type': 'application/json' }
  root: string = 'http://localhost:5000/'
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    let body = {
      email,
      password
    }
    return this.http.post(this.root + "login/", JSON.stringify(body), { headers: this.headers });
  }

  signUp(email: string, password: string, firstName: string, lastName: string, familyRole: string = 'Owner', bankNumber: string = null, family_id: string = undefined): Observable<any> {
    let body = {
      email,
      password,
      firstName,
      lastName,
      familyRole,
      paybox_id: bankNumber,
    };
    if (family_id) {
      body['family_id'] = family_id
    }
    return this.http.post(this.root + "signup/", JSON.stringify(body), { headers: this.headers });
  }

  getAllFamily(family_id: string): Observable<any> {
    return this.http.get(this.root + `family/${family_id}`, { headers: this.headers });
  };

  getAllUserActions(email: string): Observable<any> {
    return this.http.get(this.root + `actions/${email}`, { headers: this.headers })
  }

  addAction(email: string, productName: string, price: string) {
    let body = {
      email,
      productName,
      price,
    }
    return this.http.post(this.root + `actions/`, JSON.stringify(body), { headers: this.headers })
  }

  getAllFamilyActions(familyId: string) {
    return this.http.get(this.root + `actions/family/${familyId}`);
  }

  saveCreditCard(last4: string, exp: string) {
    let body = {
      last4,
      exp,
    }
    return this.http.post(this.root + `payment/premium`, JSON.stringify(body), { headers: this.headers })
  }

  addFamilyAccountType(familyId: string, accountType: string) {
    const body = {
      familyId,
      accountType,
    }
    return this.http.post(this.root + `family/account`, JSON.stringify(body), { headers: this.headers })
  }
  editFamilyAccountType(familyId: string, accountType: string) {
    const body = {
      accountType,
    }
    return this.http.put(this.root + `family/premium/${familyId}`, JSON.stringify(body), { headers: this.headers })
  }

  getUserTarget(email: string) {
    return this.http.get(this.root + `targets/${email}`)
  }

  getFamilyTarget(familyId: string) {
    return this.http.get(this.root + `family/targets/${familyId}`)
  }

  addTarget(email: string, targetName: string, targetPrice: string) {
    const body = {
      email,
      targetName,
      targetPrice
    }
    return this.http.post(this.root + `targets/`, JSON.stringify(body), { headers: this.headers })
  }

  addUserAmount(email: string, bankNumber: string, amount: number) {
    const body = {
      email,
      bankNumber,
      amount
    }
    return this.http.post(this.root + `amount/`, JSON.stringify(body), { headers: this.headers })
  }

  getUserAmount(email: string) {
    return this.http.get(this.root + `amount/${email}`, { headers: this.headers })
  }

  getFamilyUsersAmount(familyId: string) {
    return this.http.get(this.root + `amount/family/${familyId}`, { headers: this.headers })
  }

  updateUserAmount(userId: string, newAmount: number) {
    const body = {
      newAmount,
    }
    return this.http.put(this.root + `amount/${userId}`, JSON.stringify(body), { headers: this.headers })
  }

  getMyKids(familyId: string) {
    return this.http.get(this.root + `kids/${familyId}`, { headers: this.headers })
  }

  insertSavings(email: string, videoName: string, savingPrice: number) {
    let body = {
      email,
      videoName,
      savingPrice,
    }
    return this.http.post(this.root + `savings/`, JSON.stringify(body), { headers: this.headers })
  }

  getMySaving(email: string) {
    return this.http.get(this.root + `savings/${email}`, { headers: this.headers })
  }

  updateSavingStatus(savingId: string) {
    return this.http.put(this.root + `savings/${savingId}`, { headers: this.headers })
  }

  updateActionAsMarked(actionId: string) {
    return this.http.put(this.root + `actions/${actionId}`, { headers: this.headers })
  }
  deleteTarget(targetId: string) {
    return this.http.delete(this.root + `targets/${targetId}`, { headers: this.headers })
  }
  updateUser(userId: string, password: string, firstName: string, lastName: string) {
    const body = {
      password,
      firstName,
      lastName,
    }
    return this.http.put(this.root + `user/${userId}`, JSON.stringify(body), { headers: this.headers })
  }

  deleteUser(userId: string) {
    return this.http.delete(this.root + `user/${userId}`, { headers: this.headers })
  }


  getFamilySavings(familyId: string) {
    return this.http.get(this.root + `savings/family/${familyId}`, { headers: this.headers })
  }

  syncWithPaybox(userId,password,payboxId){
    const body={
      'username':userId,
      'password':password,
      'payBoxId':payboxId,
    }
    return this.http.post(this.root + `/actions/sync`, { headers: this.headers })
  }

  
}

