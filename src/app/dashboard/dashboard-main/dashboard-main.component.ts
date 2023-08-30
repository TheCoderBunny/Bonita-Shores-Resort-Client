import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
    if(!this.userService.loggedIn){
      // this.router.navigateByUrl('/home'); //this isn't important, it might be safer to make a login button through HTML and not risk accidently kicking a real user out.
    }

    
  }
  //This should navigate home when logging out.
}
