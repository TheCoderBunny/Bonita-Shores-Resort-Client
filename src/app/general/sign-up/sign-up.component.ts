import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  getEmailErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter an email';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  getPasswordErrorMessage() {
    if (this.passwordFormControl.hasError('required')) {
      return 'You must enter a password';
    }
    return this.passwordFormControl.hasError('minlength') ? 'Password is too short' : '';
  }

  ngOnInit(): void {
  }

  signUp() {
    this.userService.signUp(this.newUser).subscribe(() => {
        // window.alert("User Registered Successfully");
        // this.router.navigate(['home']);
    }, error => {
        window.alert("User Registration Error");
        console.log('Error: ', error)
    });
  }
}
