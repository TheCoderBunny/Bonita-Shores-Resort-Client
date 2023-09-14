import { Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { StoredData } from 'src/app/models/stored-data';
import { DatabaseLocal } from 'src/app/services/database-local';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  currentImage: string = this.databaseLocal.restaurants[0].extra;
  currentRestaurantInt: number = 0;
  restaurantTimes: StoredData[] = [];

  tokenBookingKey: string = "BSRBookingToken";

  constructor(public userService: UserService, private router: Router, public databaseLocal: DatabaseLocal) { }

  changeRestaurant(amount: number) {
    this.currentRestaurantInt += amount;
    if (this.currentRestaurantInt < 0) {
      this.currentRestaurantInt = this.databaseLocal.restaurants.length - 1;
    } else if (this.currentRestaurantInt > this.databaseLocal.restaurants.length - 1) {
      this.currentRestaurantInt = 0;
    }
    this.currentImage = this.databaseLocal.restaurants[this.currentRestaurantInt].extra;

    //get the list of possible times to reserve
    this.restaurantTimes = this.databaseLocal.retrieveRestaurantTimes(this.currentRestaurantInt);
  }


  today: Date = new Date();
  endDateMax: Date = new Date();
  startDate: Date = new Date();

  ngOnInit(): void {
    this.endDateMax = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate() - 1);
    this.startDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());

    // if (localStorage.getItem(this.tokenBookingKey + "StartDate") != null) {
    //   this.startDate = new Date(localStorage.getItem(this.tokenBookingKey + "StartDate") || this.startDate.toDateString());
    //   this.endDate = new Date(localStorage.getItem(this.tokenBookingKey + "EndDate") || this.endDate.toDateString());
    // }

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

}
