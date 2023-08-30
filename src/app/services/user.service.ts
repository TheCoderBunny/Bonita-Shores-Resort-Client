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
  currentUser: User = new User();
  public loggedIn: boolean = false;

  checkForUser(user: User) {
    this.currentUser = user;
    console.log(this.currentUser,this.currentUser.token);
    if (!this.currentUser){
      return;
    }
    if (this.currentUser.email) {
      this.loggedIn = true;
    }
    if (this.currentUser.token) {
      localStorage.setItem(this.tokenKey, this.currentUser.token);
    }
  }

  logout() {
    this.loggedIn=false;
    this.currentUser = new User();
    localStorage.removeItem(this.tokenKey);
  }

  constructor(private http: HttpClient) {
    this.getMyUserByToken().subscribe(user => {
      this.checkForUser(user)
    });
  }

  signUp(newUser: User) {
    return this.http.post(`${this.baseURL}/user/register`, newUser);
  }

  login(email: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    queryParams = queryParams.append('password', password);

    return this.http.get<User>(`${this.baseURL}/user/login`, { params: queryParams})
      .pipe(tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.checkForUser(response)
      }));
  }

  getMyUserByToken(): Observable<User> {
    if (localStorage.getItem(this.tokenKey) == null) { return new Observable<User> }
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.get<User>(this.baseURL + "/user/current", { headers: reqHeaders });
  }
}
