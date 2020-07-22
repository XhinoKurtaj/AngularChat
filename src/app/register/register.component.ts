import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AlertType } from '../enums/alert-type.enum';
import { Alert } from '../classes/alert';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  // Create public variable to access created form in component html file
  public signupForm: FormGroup;
  private subscriptions: Subscription[] = [];
  private returnUrl: string;

  constructor( private auth: AuthService,
     private alertService: AlertService,
     private loadingService: LoadingService,
     private router: Router,
     private route: ActivatedRoute ) {
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
      //When login occurs set isLoading state to true
      this.loadingService.isLoading.next(true);
      const {firstName, lastName, email, password} = this.signupForm.value;
      //Push subscription to subscriptions array
      this.subscriptions.push(
        //Send form data to register method in authentication service
        this.auth.register(firstName, lastName, email, password).subscribe( success => {
          if (success) {
            //Case user registered successfully redirect him to chat view
            this.router.navigate(['/chat']);
          }else{
            const failedSignupAlert = new Alert('There was a problem signing up, try again.', AlertType.Danger);
            this.alertService.alerts.next(failedSignupAlert);
          }
           this.loadingService.isLoading.next(false);
        })
      );
    } else {
      const failedRegisterAlert = new Alert('Please ender a valid name, email and password, try again', AlertType.Danger);
      this.alertService.alerts.next(failedRegisterAlert);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( sub => sub.unsubscribe());
  }

}
