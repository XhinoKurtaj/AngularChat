import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { LoadingService } from 'src/app/services/loading.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { Alert } from 'src/app/classes/alert';
import { User } from 'src/app/interfaces/user';
import { AlertService } from 'src/app/services/alert.service';
import { AlertType } from 'src/app/enums/alert-type.enum';
import { Location } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public currentUser: any = null;
  public userId: string = '';
  public subscriptions: Subscription[] = [];
  public uploadPercent: number = 0;
  public downloadUrl: string | null = null;
  public fbUrl: Observable<string>

  constructor(
    private auth: AuthService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private fs: AngularFireStorage,
    private location: Location,
    private alertService: AlertService
  ) {
    this.loadingService.isLoading.next(true);
   }

  ngOnInit(): void {
    this.subscriptions.push(
      this.auth.currentUser.subscribe( user => {
        this.currentUser = user;
        this.loadingService.isLoading.next(false);
      })
    )

    this.subscriptions.push(
      this.route.paramMap.subscribe( params => {
        this.userId = params.get('userId')
      })
    )
  }

  public uploadFile(event): void{
    const file = event.target.files[0];
    const filePath = `${file.name}_${this.currentUser.id}`;
    const fileRef = this.fs.ref(filePath);
    const task = this.fs.upload(filePath, file);

    //Observe the percentage changes
    this.subscriptions.push(
      task.percentageChanges().subscribe(percentage => {
        if (percentage < 100)
          this.loadingService.isLoading.next(true);
        else
          this.loadingService.isLoading.next(false);
        this.uploadPercent = percentage;
      })
    );

    // get notifiend when download url is ready
    this.subscriptions.push(
     fileRef.getDownloadURL().subscribe(url => this.downloadUrl = url)
   );
  }


  public save(): void {
  let photo;
  debugger;
  if (this.downloadUrl) {
    photo = this.downloadUrl;
  } else {
    photo = this.currentUser.photoUrl;
  }

  const user = Object.assign({}, this.currentUser, {photoUrl: photo});
  const userRef: AngularFirestoreDocument<User> = this.db.doc(`users/${user.id}`);
  userRef.set(user)
    .then(() => {
      this.alertService.alerts.next(new Alert('Your profile was successfully updated!', AlertType.Success));
    })
    .catch(error => {
      this.alertService.alerts.next(new Alert(error.message, AlertType.Danger));
    });
  this.location.back()
}

  ngOnDestroy() {
   this.subscriptions.forEach(sub => sub.unsubscribe());
 }
}
