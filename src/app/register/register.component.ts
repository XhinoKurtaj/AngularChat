import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Create public variable to access authService outside RegisterComponent class
  public _authService;

  constructor( private authService: AuthService ) {
    //Assign authService value to public variable _authService
     this. _authService = authService;
  }
  ngOnInit(): void {
  }

  //Create a method which will be called on form submit
  onSubmit() {
    //Get submited email
    let email = this._authService.loginForm.value.email
    //Get submited password
    let password = this._authService.loginForm.value.password
    //Pass submited data to emailSignup method in authService 
    this.authService.emailSignup(email, password);
  }

}
