import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Create public variable to access authService outside RegisterComponent class
  public _authService;
  // Create public variable to access created form in component html file
  public loginForm: FormGroup;

  constructor( private authService: AuthService) {
      //Assign authService value to public variable _authService
      this. _authService = authService;
      //Call create form method when class is instantiate
      this.createForm();
   }

  ngOnInit(): void {
  }

  private createForm(): void {
    //Create new form group object and assign to loginForm variable
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }


  public submit(): void{
    //TODO call the auth service
    const {email, password} = this.loginForm.value;
    console.log(`Email: ${email}, Password: ${password}`);
  }

}
