import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertType } from '../enums/alert-type.enum';
import { Alert } from '../classes/alert';
import { AlertService } from '../services/alert.service';
import { LoadingService } from '../services/loading.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  // Create public variable to access authService outside RegisterComponent class
  public _authService;
  // Create public variable to access created form in component html file
  public loginForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor( private authService: AuthService,
    private alertService: AlertService,
    private loadingService: LoadingService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute ) {
      //Call create form method when class is instantiate
      this.createForm();
   }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/chat';
  }

  private createForm(): void {
    //Create new form group object and assign to loginForm variable
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email] ),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    });
  }


  public submit(): void{

    if(this.loginForm.valid){
      //When login occurs set isLoading state to true
      this.loadingService.isLoading.next(true);

      //TODO call the auth service
      const {email, password} = this.loginForm.value;
      this.subscriptions.push(
        this.auth.login(email, password).subscribe(success => {
          if (success){
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.displayFailedLogin();
          }
            //After verifying user input correctly set isLoading state to false
            this.loadingService.isLoading.next(false);
        })
      );
    } else {
      //In case submit form failed set isLoading to false and display error message to the user
      this.loadingService.isLoading.next(false);
      this.displayFailedLogin()
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

  //Helper method 
  private displayFailedLogin(): void {
    const failedLoginAlert = new Alert('Your email or password were invalid, try again', AlertType.Danger);
    this.alertService.alerts.next(failedLoginAlert);
  }

}
