import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../classes/user';
import { Alert } from '../classes/alert';
import { AlertService } from './alert.service'
import { Observable } from 'rxjs';
import { AlertType } from '../enums/alert-type.enum';
import { of, from  } from 'rxjs';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUser: Observable<User | null>;

  constructor(
     private afAuth: AngularFireAuth,
     private db: AngularFirestore,
     private router: Router,
     private alertService: AlertService
   ) {
     this.currentUser = this.afAuth.authState.pipe(switchMap((user) => {
       if ( user )
         return this.db.doc<User>(`users/${user.uid}`).valueChanges();
       else
          return of(null);
     }));
  }

  public register(firstName: string, lastName: string, email: string, password: string): Observable<boolean>  {
    return from(
      //Create new user with email and password  in firebase
      this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((user) => {
          //Create collection with name users and new document with newly created user id
          const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.user.uid}`);
          //Create an object with user other data
          const updatedUser = {
            id: user.user.uid,
            email: user.user.email,
            firstName,
            lastName,
            photoUrl: 'https://firebasestorage.googleapis.com/v0/b/achat-1abf7.appspot.com/o/default_profile_pic.jpg?alt=media&token=fb52711b-5cf3-4ee0-9581-9850b0b9a2dc'
          }
          //Set user data to User document
          userRef.set(updatedUser);
          return true;
        })
        .catch( (err) => false)
    )
  }


  public login(email: string, password: string): Observable<boolean> {
    return from(
      this.afAuth.signInWithEmailAndPassword(email, password)
          .then((user) => true)
          .catch((e) => false)
    )
  }

  public logout(): void {
    this.afAuth.signOut().then(() => {
      this.router.navigate(['/login']);
      this.alertService.alerts.next(new Alert('You have been signed out.'));
    })
  }
}
