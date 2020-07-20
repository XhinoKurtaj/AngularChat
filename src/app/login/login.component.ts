import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertType } from '../enums/alert-type.enum';
import { Alert } from '../classes/alert';
import { AlertService } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';

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

  constructor( private authService: AuthService, private alertService: AlertService, private loadingService: LoadingService) {
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
    //When login occurs set isLoading state to true
    this.loadingService.isLoading.next(true);

    if(this.loginForm.valid){
      //TODO call the auth service
      const {email, password} = this.loginForm.value;
      console.log(`Email: ${email}, Password: ${password}`);
      //After verifying user input correctly set isLoading state to false
      this.loadingService.isLoading.next(false);
    } else {
      const failedLoginAlert = new Alert('Your email or password were invalid, try again', AlertType.Danger);
      //In case submit form failed set isLoading to false and display error message to the user
      setTimeout(() => {
          this.loadingService.isLoading.next(false);
          this.alertService.alerts.next(failedLoginAlert);
      }, 2000);

    }

  }

}
