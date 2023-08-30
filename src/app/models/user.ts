export class User {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string; //this is for the logged in user only. It makes it easy to pass both the token and user data within one request
  
    constructor(email?: string, password?: string, firstName?: string, lastName?: string, token?: string) {
      this.email = email;
      this.password = password;
      this.firstName = firstName;
      this.lastName = lastName;
      this.token = token;
    }
}