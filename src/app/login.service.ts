import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



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

  signUp(email: string, password: string, firstName: string, lastName: string, familyRole: string = 'Owner', paybox_id: string = null,family_id:string=undefined): Observable<any> {
    let body = {
      email,
      password,
      firstName,
      lastName,
      familyRole,
      paybox_id,
    };
    if (family_id){
      body['family_id']=family_id
    }
    return this.http.post(this.root + "signup/", JSON.stringify(body), { headers: this.headers });
  }
  getAllFamily(family_id:string): Observable<any>{
    return this.http.get(this.root + `family/${family_id}`, { headers: this.headers });
  };
  
}

