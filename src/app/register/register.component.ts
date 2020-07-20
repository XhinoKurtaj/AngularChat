import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertType } from '../enums/alert-type.enum';
import { Alert } from '../classes/alert';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Create public variable to access authService outside RegisterComponent class
  public _authService;
  // Create public variable to access created form in component html file
  public signupForm: FormGroup;

  constructor( private authService: AuthService, private alertService: AlertService ) {
    //Assign authService value to public variable _authService
     this. _authService = authService;
     //Call create form method when class is instantiate
     this.createForm();
  }
  ngOnInit(): void {
  }

  private createForm(): void {
    //Create new form group object and assign to signupForm variable
    this.signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required] ),
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }

  // Submit method which will handle form submit
  public submit(): void{
    if(this.signupForm.valid){
      //TODO call the auth service
      const {firstName, lastName, email, password} = this.signupForm.value;
      console.log(`First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Password: ${password}`);
    } else {
      const failedLoginAlert = new Alert('Please ender a valid name, email and password, try again', AlertType.Danger);
      this.alertService.alerts.next(failedLoginAlert);
    }
  }

}
