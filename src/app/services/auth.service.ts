import { Injectable } from '@angular/core';

// import { switchMap } from 'rxjs/operators';
import { User } from './user-model';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import { FormControl, FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
     private afAuth: AngularFireAuth,
     private afs: AngularFirestore,
     private router: Router
   ) {

  }

  //Create a form for user login and user register
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

    login(email: string, password: string) {
      // Authenticate user with given credentials
      this.afAuth.signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log( "worked!");
        // Case user Authenticates successfully redirect him to home
        this.router.navigateByUrl('/home');
      })
      .catch(err => {
        console.log('Something went wrong: ', err.message);
      });
    }

    emailSignup(email: string, password: string) {
      //Create new user with email and password in Authenticate section in firebase
      //?still need to check/read how the user authenticate works in fireebase ??
      //TODO: read more about user authenticate
      this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(value => {
       console.log('Sucess', value);
       // Case user registered successfully redirect him to home
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.log('Something went wrong: ', error);
      });
    }

    logout() {
      this.afAuth.signOut().then(() => {
        this.router.navigate(['/']);
      });
    }

}
