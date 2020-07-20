import { Component, OnInit, OnDestroy } from '@angular/core';
import { Alert } from './classes/alert';
import { AlertService } from './services/alert.service';
import { LoadingService } from './services/loading.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnDestroy{

  //Create private variable which will hold all subscriptions
  private subscription: Subscription[] = [];
  //Create a public variable(array) which will store all alerts
  public alerts: Array<Alert> = [];
  //Create a public boolean variable to store state of loading
  public loading: boolean = false;

  constructor( private alertService: AlertService, private loadingService: LoadingService){}

  ngOnInit(){
    //Push each subsctiption in subscription array,
    //later on component destruction we can remove all subscriptions
    this.subscription.push(
      //Subscribe alert method in alertService
      this.alertService.alerts.subscribe(alert => {
        //Push alert in alerts array
        this.alerts.push(alert)
      }))
      this.subscription.push(
        //Subscribe isLoading in loadingService
        this.loadingService.isLoading.subscribe( isLoading => {
          //Set loading equal to isLoading state
          this.loading = isLoading
        })
      )
  }

  ngOnDestroy(){
      //Unsubscribe all subscription to avoid memory leak
      this.subscription.forEach( sub => sub.unsubscribe());
  }

}
