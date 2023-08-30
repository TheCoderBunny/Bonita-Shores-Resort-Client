import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = "http://localhost:5214";
  tokenKey: string = "BSRLoginToken";
  currentUser: User = new User("notloggedin");
  public loggedIn: boolean = false;

  constructor(private http: HttpClient) {
    this.getMyUserByToken().subscribe(user => {
      this.currentUser = user;
      console.log(this.currentUser);
      this.loggedIn=true;
    });
  }

  signUp(newUser: User) {
    return this.http.post(`${this.baseURL}/user/register`, newUser);
  }

  login(email: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    queryParams = queryParams.append('password', password);

    return this.http.get(`${this.baseURL}/user/login`, { params: queryParams, responseType: 'text' })
      .pipe(tap((response: any) => {
        localStorage.setItem(this.tokenKey, response);
      }));
  }

  getMyUserByToken(): Observable<User> {
    if (localStorage.getItem(this.tokenKey)==null){ return new Observable<User> }
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.get<User>(this.baseURL+"/user/current", { headers: reqHeaders });
  }
}
