import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { LoadingPopupComponent } from '../loading-popup/loading-popup.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newUser: User = new User();

  constructor(private userService: UserService, private router: Router) { }

  @ViewChild('loading')
  loading!: LoadingPopupComponent;

  showErrors: Boolean = false;
  emailInvalid: string = "An email is required";

  getEmailErrorMessage() {
    if (this.newUser.email === "" || this.newUser.email === undefined) {
      this.emailInvalid = 'An email is required';
      return;
    }
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    var isProperEmail = regexp.test(this.newUser.email);
    if (!isProperEmail) {
      this.emailInvalid = "Not a valid email";
      return;
    }
    this.emailInvalid = '';
  }

  passwordInvalid: string = "A password is required";

  getPasswordErrorMessage() {
    if (this.newUser.password === "" || this.newUser.password === undefined) {
      this.passwordInvalid = 'A password is required';
      return;
    }

    if(this.newUser.password.length<8){
      this.passwordInvalid = '8 characters or more';
      return;
    }

    this.passwordInvalid = '';
  }

  firstNameInvalid: string = "First name is required"

  getFirstNameErrorMessage() {
    if (this.newUser.firstName === "" || this.newUser.firstName === undefined) {
      this.firstNameInvalid = 'First name is required';
      return;
    }
    this.firstNameInvalid = '';
  }

  lastNameInvalid: string = "Last name is required"

  getLastNameErrorMessage() {
    if (this.newUser.lastName === "" || this.newUser.lastName === undefined) {
      this.lastNameInvalid = 'Last name is required';
      return;
    }
    this.lastNameInvalid = '';
  }

  // passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  // getPasswordErrorMessage() {
  //   if (this.passwordFormControl.hasError('required')) {
  //     return 'A password is required';
  //   }
  //   return this.passwordFormControl.hasError('minlength') ? 'Password is too short' : '';
  // }

  ngOnInit(): void {
  }

  signUp() {

    this.showErrors=true;
    if (this.emailInvalid!=="" || this.passwordInvalid!==""){
      return;
    }

    this.loading.toggle(false, "Registering...");

    this.userService.signUp(this.newUser).subscribe(() => {
      // this.router.navigate(['home']); //Happens automatically
    }, error => {
      this.loading.toggle(true, "Unsuccessful");
      console.log(error.error);
      if (error.error=="EmailAlreadyExists"){
        this.emailInvalid = "Email is already being used"
      }
    });
  }
}
