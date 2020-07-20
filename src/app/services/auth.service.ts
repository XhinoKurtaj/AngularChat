import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../classes/user';
import { Alert } from '../classes/alert';
import { AlertService } from './alert.service'
import { Observable } from 'rxjs';
import { AlertType } from '../enums/alert-type.enum';
import { of } from 'rxjs';

// import { auth } from 'firebase/app';
// import { AngularFireAuth } from '@angular/fire/auth';
// import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
     // private afAuth: AngularFireAuth,
     // private afs: AngularFirestore,
     private router: Router,
     private alertService: AlertService
   ) {
     //TODO fetch the user from the firebase backend,  then set the user
     this.currentUser = of(null);
  }

  public register(firstName: string, lastName: string, email: string, password: string): Observable<boolean>  {
    //TODO class firebase signup function
    return of(true)
  }


  public login(email: string, password: string): Observable<boolean> {
    // TODO call Firebase login function
    return of(true);
  }

  public logout(): void {
    // TODO call Firebase logout function
    this.router.navigate(['/login']);
    this.alertService.alerts.next(new Alert('You have been signed out.'));
  }

    // login(email: string, password: string) {
    //   // Authenticate user with given credentials
    //   this.afAuth.signInWithEmailAndPassword(email, password)
    //   .then(value => {
    //     console.log( "worked!");
    //     // Case user Authenticates successfully redirect him to home
    //     this.router.navigateByUrl('/home');
    //   })
    //   .catch(err => {
    //     console.log('Something went wrong: ', err.message);
    //   });
    // }

    // emailSignup(email: string, password: string) {
    //   //Create new user with email and password in Authenticate section in firebase
    //   //?still need to check/read how the user authenticate works in fireebase ??
    //   //TODO: read more about user authenticate
    //   this.afAuth.createUserWithEmailAndPassword(email, password)
    //   .then(value => {
    //    console.log('Sucess', value);
    //    // Case user registered successfully redirect him to home
    //     this.router.navigateByUrl('/home');
    //   })
    //   .catch(error => {
    //     console.log('Something went wrong: ', error);
    //   });
    // }
    //
    // logout() {
    //   this.afAuth.signOut().then(() => {
    //     this.router.navigate(['/']);
    //   });
    // }

}
