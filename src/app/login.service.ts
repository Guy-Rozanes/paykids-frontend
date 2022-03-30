import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  root: string = 'http://localhost:5000/'
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log(email + password)
    return this.http.post(this.root + "/login", { email, password });
  }

  signUp(email: string, password: string,firstName:string,lastName:string): Observable<any> {
    return this.http.post(this.root + "/signup", { email, password,firstName,lastName });
  }
}
