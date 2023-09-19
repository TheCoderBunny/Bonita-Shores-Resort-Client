import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Trip } from "src/app/models/trip";
import { Ticket } from 'src/app/models/ticket';
import { StoredData } from 'src/app/models/stored-data';
import { DatabaseLocal } from 'src/app/services/database-local';
import { Booking } from 'src/app/models/booking';
import { Reservation } from 'src/app/models/reservation';
import { LoadingPopupComponent } from 'src/app/general/loading-popup/loading-popup.component';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './dashboard-main.component.html',
  styleUrls: ['./dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit {

  constructor(public userService: UserService, private router: Router, public databaseLocal: DatabaseLocal) { }

  trip: Trip = new Trip();

  tripDays: Trip[] = [];
  tripDates: Date[] = [];

  oneDay: number = 1000 * 60 * 60 * 24;

  tripPlanned: boolean = false;

  @ViewChild('loading')
  loading!: LoadingPopupComponent;


  ngAfterViewInit(): void {
    this.loading.toggle(false, "Loading Your Trip...");
  }

  ngOnInit(): void {
    if (!this.userService.loggedIn) {
      // this.router.navigateByUrl('/home'); //this isn't important, it might be safer to make a login button through HTML and not risk accidently kicking a real user out.
    }

    var today: Date = new Date();
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())

    this.userService.getTripFutureFromDay(today).subscribe((response: any) => {

      this.trip = response;
      console.log(this.trip);
      if (this.trip.tickets) {
        for (var ticket of this.trip.tickets) {
          this.tripPlanned = true;
          var day: Date = new Date(ticket.day!)
          var dayNumber = Math.floor(day.getTime() / this.oneDay) - Math.floor(today.getTime() / this.oneDay);
          if (this.tripDays[dayNumber] === undefined) {//if this day isn't listed make a new day and add the ticket
            var tripDay: Trip = new Trip();
            tripDay.day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayNumber)
            this.tripDays[dayNumber] = tripDay;
            this.tripDays[dayNumber].tickets.push(ticket);
          } else {//if this day exists add the ticket
            this.tripDays[dayNumber].tickets.push(ticket);
          }
        }
      }

      if (this.trip.bookings) {
        for (var booking of this.trip.bookings) {
          this.tripPlanned = true;
          var day: Date = new Date(booking.day!)
          var dayNumber = Math.floor(day.getTime() / this.oneDay) - Math.floor(today.getTime() / this.oneDay);
          if (this.tripDays[dayNumber] === undefined) {//if this day isn't listed make a new day and add the booking
            var tripDay: Trip = new Trip();
            tripDay.day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayNumber)
            this.tripDays[dayNumber] = tripDay;
            this.tripDays[dayNumber].bookings.push(booking);
          } else {//if this day exists add the booking
            this.tripDays[dayNumber].bookings.push(booking);
          }
        }
      }

      if (this.trip.reservations) {
        for (var reservation of this.trip.reservations) {
          this.tripPlanned = true;
          var day: Date = new Date(reservation.day!)
          var dayNumber = Math.floor(day.getTime() / this.oneDay) - Math.floor(today.getTime() / this.oneDay);
          if (this.tripDays[dayNumber] === undefined) {//if this day isn't listed make a new day and add the reservation
            var tripDay: Trip = new Trip();
            tripDay.day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayNumber)
            this.tripDays[dayNumber] = tripDay;
            this.tripDays[dayNumber].reservations.push(reservation);
          } else {//if this day exists add the reservation
            this.tripDays[dayNumber].reservations.push(reservation);
          }
        }
      }

      //this.tripPlanned=false; //tester

      //fill in the empty days
      var fillTo: number = this.tripDays.length;
      if (fillTo < 30) {
        fillTo = 30;
      }

      for (let i = 0; i < fillTo; i++) {
        if (this.tripDays[i] === undefined) {
          var emptyDay: Trip = new Trip();
          emptyDay.day = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
          this.tripDays[i] = emptyDay;
        }
      }
      this.loading.toggle(true, "Completed");
    }, error => {
      console.log('Error: ', error);
      window.alert('Unable to retrive trip');
    });

  }

  displayTickets(tickets: Ticket[]): string[] {
    var strings: string[] = [];
    var count: number[] = [];//this is a count for each ticket type.
    for (let i = 0; i < tickets.length; i++) {
      var ticket: Ticket = tickets[i];
      if (count[ticket.type] === undefined) {
        count[ticket.type] = 0;
      }
      count[ticket.type] += 1;
    }

    for (let i = 0; i < count.length; i++) {
      if (count[i] !== undefined) {
        if (count[i] > 0) {
          strings.push(count[i] + "x " + this.databaseLocal.tickets[i].name);
        }
      }
    }

    return strings;
  }

  displayBookings(bookingDay: Booking[]): string[] {
    var strings: string[] = [];
    var count: number[] = [];//this is a count for each booking type.
    for (let i = 0; i < bookingDay.length; i++) {
      var booking: Booking = bookingDay[i];
      if (count[booking.type] === undefined) {
        count[booking.type] = 0;
      }
      count[booking.type] += 1;
    }

    for (let i = 0; i < count.length; i++) {
      if (count[i] !== undefined) {
        if (count[i] > 0) {
          var hotelAndRoom = this.databaseLocal.getHotelAndRoomFromTypeID(i);
          strings.push(count[i] + "x " + hotelAndRoom.room.name + " Room at " + hotelAndRoom.hotel.name);
        }
      }
    }

    return strings;
  }

  displayReservations(reservations: Reservation[]): string[] {
    var strings: string[] = [];
    var count: number[] = [];//this is a count for each reservation type.
    for (let i = 0; i < reservations.length; i++) {
      var reservation: Reservation = reservations[i];
      if (count[reservation.type] === undefined) {
        count[reservation.type] = 0;
      }
      count[reservation.type] += 1;
    }

    for (let i = 0; i < count.length; i++) {
      if (count[i] !== undefined) {
        if (count[i] > 0) {
          var restaurantAndTime = this.databaseLocal.getRestaurantAndTimeFromTypeID(i);
          strings.push(restaurantAndTime.time.name + " at " + restaurantAndTime.restaurant.name);
        }
      }
    }

    return strings;
  }

  isDayEmpty(day: Trip): boolean {

    if (day.tickets.length > 0 || day.bookings.length > 0 || day.reservations.length > 0) {
      return false;
    }
    return true;
  }

}
