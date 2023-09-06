import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sign-in-popup',
  templateUrl: './sign-in-popup.component.html',
  styleUrls: ['./sign-in-popup.component.css']
})
export class SignInPopupComponent implements OnInit {

  @Input() public buttonName: string = "Sign-In or Register";
  @Input() public color: string = "default";
  @Input() public raised: boolean = false;

  email: string = '';
  password: string = '';

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  signin() {
    this.userService.login(this.email, this.password).subscribe((response: any) => {
      //the person's name will automatically show.
    }, error => {
      console.log('Error: ', error);
      window.alert('Unsuccessful Login');
      //  this.router.navigateByUrl('/signin');
    });
  }
}