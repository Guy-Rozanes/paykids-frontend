import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';



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

  signUp(email: string, password: string, firstName: string, lastName: string, familyRole: string = 'Owner', paybox_id: string = null, family_id: string = undefined): Observable<any> {
    let body = {
      email,
      password,
      firstName,
      lastName,
      familyRole,
      paybox_id,
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
    let body = {
      familyId,
      accountType,
    }
    return this.http.post(this.root + `family/account`, JSON.stringify(body), { headers: this.headers })
  }
  editFamilyAccountType(familyId: string, accountType: string) {
    console.log('aa')
    let body = {
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
    let body = {
      email,
      targetName,
      targetPrice
    }
    return this.http.post(this.root + `targets/`, JSON.stringify(body), { headers: this.headers })
  }
}

