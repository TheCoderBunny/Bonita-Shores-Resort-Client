import { Component, ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatSelect } from '@angular/material/select';
import { Router } from '@angular/router';
import { LoadingPopupComponent } from 'src/app/general/loading-popup/loading-popup.component';
import { Reservation } from 'src/app/models/reservation';
import { StoredData } from 'src/app/models/stored-data';
import { DatabaseLocal } from 'src/app/services/database-local';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  currentRestaurant: StoredData = this.databaseLocal.restaurants[0];
  currentRestaurantInt: number = 0;
  selectedRestaurantType: number = -1;
  restaurantTimes: StoredData[] = [];

  constructor(public userService: UserService, private router: Router, public databaseLocal: DatabaseLocal) { }

  @ViewChild('timeSelector') timeSelector!: MatSelect;

  changeRestaurant(amount: number) {
    this.currentRestaurantInt += amount;
    if (this.currentRestaurantInt < 0) {
      this.currentRestaurantInt = this.databaseLocal.restaurants.length - 1;
    } else if (this.currentRestaurantInt > this.databaseLocal.restaurants.length - 1) {
      this.currentRestaurantInt = 0;
    }
    this.currentRestaurant = this.databaseLocal.restaurants[this.currentRestaurantInt];

    //get the list of possible times to reserve
    this.restaurantTimes = this.databaseLocal.retrieveRestaurantTimes(this.currentRestaurantInt);

    this.selectedRestaurantType = -1;
    if (this.timeSelector !== undefined) {
      this.timeSelector.options.forEach((data: MatOption) => data.deselect());
    }

    let adImage = <HTMLElement>document.getElementById("adImage");
    adImage.classList.remove("adImageAnimate")
    setTimeout(() => {
      adImage.classList.add("adImageAnimate")
    }, 0);
  }

  changeRestaurantDirect(restaurantID: number) {
    this.currentRestaurantInt = restaurantID;
    this.currentRestaurant = this.databaseLocal.restaurants[this.currentRestaurantInt];

    this.restaurantTimes = this.databaseLocal.retrieveRestaurantTimes(this.currentRestaurantInt);

    this.selectedRestaurantType = -1;
    if (this.timeSelector !== undefined) {
      this.timeSelector.options.forEach((data: MatOption) => data.deselect());
    }

    let adImage = <HTMLElement>document.getElementById("adImage");
    adImage.classList.remove("adImageAnimate")
    setTimeout(() => {
      adImage.classList.add("adImageAnimate")
    }, 0);
  }


  today: Date = new Date();
  endDateMax: Date = new Date();
  startDate: Date = new Date();

  ngOnInit(): void {
    this.endDateMax = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate() - 1);
    this.startDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    this.changeRestaurant(0);
  }

  monthNames: string[] = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "August", "Sept", "Oct", "Nov", "Dec"];

  getShortDate(date: Date) {
    return this.monthNames[date.getMonth()] + " " + date.getDate();
  }

  @ViewChild('startDateTrigger')
  startDateTrigger!: MatMenuTrigger;

  selectedChangeFirstDate(m: any) {
    this.startDateTrigger.closeMenu();
  }

  selectTime(value: number) {
    this.selectedRestaurantType = value;
    if (this.selectedRestaurantType === undefined) {
      this.selectedRestaurantType = -1;
    }
  }

  @ViewChild('loading')
  loading!: LoadingPopupComponent;

  reserveTime() {
    if (this.selectedRestaurantType == -1) {
      return;//select a time
    }
    console.log(this.startDate,this.selectedRestaurantType);

    this.loading.toggle(false, "Reserving...");

    var reservation:Reservation = new Reservation(this.startDate,this.selectedRestaurantType)

    var reply = this.userService.createReservation(reservation);

    if (reply === null) { return; }
    reply.subscribe((response: any) => {
      this.loading.toggle(true, "Completed");
      this.router.navigateByUrl('/trip');
    }, error => {
      console.log('Error: ', error);
      window.alert('Unsuccessful Reservation');
      this.loading.toggle(true, "Unsuccessful");
    });
  }

}
