import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Ticket } from '../models/ticket';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseURL: string = "http://localhost:5214";
  tokenKey: string = "BSRLoginToken";
  currentUser: User = new User();
  public loggedIn: boolean = false;
  public goToHomeOnLogout: boolean = false;

  correctLoggedOutRoute() {
    if (this.router.url === '/dashboard') {//possibly update this in the future to a table of urls that should navigate to home on logout.
      this.router.navigateByUrl('/home');
    }
  }

  correctLoggedInRoute() {//if the user is logged in move them if they're in the wrong area.
    if (this.router.url === '/register') {
      this.router.navigateByUrl('/home');
    }
  }

  constructor(private http: HttpClient, private router: Router) {
    this.getMyUserByToken().subscribe(user => {
      this.checkForUser(user)
    });
  }

  checkForUser(user: User) {
    this.currentUser = user;
    if (!this.currentUser) {
      this.correctLoggedOutRoute();
      return;
    }
    if (this.currentUser.email) {
      this.loggedIn = true;
      this.correctLoggedInRoute();
    } else {
      this.correctLoggedOutRoute();
    }
    if (this.currentUser.token) {
      localStorage.setItem(this.tokenKey, this.currentUser.token);
    }
  }

  logout() {
    this.loggedIn = false;
    this.currentUser = new User();
    localStorage.removeItem(this.tokenKey);
    this.correctLoggedOutRoute();
  }

  signUp(newUser: User) {
    return this.http.post(`${this.baseURL}/user/register`, newUser).pipe(tap((response: any) => {
      this.login(newUser.email || "", newUser.password || "").subscribe((response: any) => {
        this.router.navigateByUrl('/home')
      }, error => {
        console.log('Error: ', error);
        window.alert('Unsuccessful Login');
      });
    }));
  }

  login(email: string, password: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('email', email);
    queryParams = queryParams.append('password', password);
    return this.http.get<User>(`${this.baseURL}/user/login`, { params: queryParams })
      .pipe(tap((response: any) => {
        localStorage.setItem(this.tokenKey, response.token);
        this.checkForUser(response)
      }))
  }

  getMyUserByToken(): Observable<User> {
    if (localStorage.getItem(this.tokenKey) == null) { this.checkForUser(new User()); return new Observable<User> }
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    return this.http.get<User>(this.baseURL + "/user/current", { headers: reqHeaders });
  }

  createTickets(tickets: Ticket[]) {
    if (localStorage.getItem(this.tokenKey) == null) { return null; }
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }

    return this.http.post(`${this.baseURL}/ticket/createTickets`, tickets, { headers: reqHeaders }).pipe(tap((response: any) => {

    }));
  }

  getFutureTicketsFromDay(day: Date): Observable<Trip> {
    if (localStorage.getItem(this.tokenKey) == null) { return new Observable<Trip> }
    let reqHeaders = {
      Authorization: `Bearer ${localStorage.getItem(this.tokenKey)}`
    }
    var dayString=day.getFullYear()+"-"+day.getMonth()+"-"+day.getDate()
    return this.http.get<Trip>(this.baseURL + "/GuestDashboard/getTripFutureFromDay/"+dayString, { headers: reqHeaders });
  }
}
