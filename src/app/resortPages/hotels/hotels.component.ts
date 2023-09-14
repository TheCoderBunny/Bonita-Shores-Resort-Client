import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LoadingPopupComponent } from 'src/app/general/loading-popup/loading-popup.component';
import { Booking } from 'src/app/models/booking';
import { StoredData } from 'src/app/models/stored-data';
import { Ticket } from 'src/app/models/ticket';
import { DatabaseLocal } from 'src/app/services/database-local';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent {
  imageList: string[] = [
    "https://images.unsplash.com/photo-1570444952548-756e3fc089fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1465996140498-df84be101126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1547737412-04c9cf2b0f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1933&q=80"];

  currentImage: string = this.imageList[0];
  currentImageInt: number = 0;

  tokenBookingKey: string = "BSRBookingToken";

  constructor(public userService: UserService, private router: Router, public databaseLocal: DatabaseLocal) { }

  moveImage(amount: number) {
    this.currentImageInt += amount;
    if (this.currentImageInt < 0) {
      this.currentImageInt = this.imageList.length - 1;
    } else if (this.currentImageInt > this.imageList.length - 1) {
      this.currentImageInt = 0;
    }
    this.currentImage = this.imageList[this.currentImageInt];
    console.log(this.currentImageInt);
  }

  today: Date = new Date();
  endDateMax: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();

  @Input() selectedRangeValue: DateRange<Date> | undefined;
  @Output() selectedRangeValueChange = new EventEmitter<DateRange<Date>>();

  selectedChangeCalender(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.startDate = m;
        this.endDate = start;
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.startDate = start;
        this.endDate = m;
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.selectedRangeValueChange.emit(this.selectedRangeValue);
  }

  fixDates() {
    if (this.endDate <= this.startDate) {
      this.endDate = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + 1);
    }
  }

  @ViewChild('startDateTrigger')
  startDateTrigger!: MatMenuTrigger;

  selectedChangeFirstDate(m: any) {
    this.startDateTrigger.closeMenu();
    this.fixDates();
  }

  @ViewChild('endDateTrigger')
  endDateTrigger!: MatMenuTrigger;

  selectedChangeSecondDate(m: any) {
    this.endDateTrigger.closeMenu();
    this.fixDates();
  }

  monthNames: string[] = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "August", "Sept", "Oct", "Nov", "Dec"];

  getShortDate(date: Date) {
    return this.monthNames[date.getMonth()] + " " + date.getDate();
  }

  dayDifference: number = 0;
  dayDifferenceIcon: string = "forward";
  oneDay: number = 1000 * 60 * 60 * 24;

  getDayDifference() {//should never be negative
    this.dayDifference = Math.floor(this.endDate.getTime() / this.oneDay) - Math.floor(this.startDate.getTime() / this.oneDay)
    // console.log(this.dayDifference);
    if (this.dayDifference == 1) {
      return (this.dayDifference) + " Night";
    } else {
      return (this.dayDifference) + " Nights";
    }
  }

  public roomList: StoredData[] = []
  currentHotelID: number = -1;
  currentRoomID: number = 0;
  currentHotelAndRoomID: number = 0;
  currentHotel?: StoredData;
  currentRoom?: StoredData;

  chooseHotel(hotelID: number) {
    if (hotelID === this.currentHotelID) { return; }
    this.currentHotelID = hotelID;
    this.roomList = this.databaseLocal.retrieveHotelRooms(hotelID);
    this.chooseRoom(0);
  }



  chooseRoom(roomID: number) {
    this.currentRoomID = roomID;
    this.currentHotelAndRoomID = this.currentHotelID * 1000 + roomID;

    var hotelAndRoom = this.databaseLocal.getHotelAndRoomFromTypeID(this.currentHotelID * 1000 + roomID);
    this.currentHotel = hotelAndRoom.hotel;
    this.currentRoom = hotelAndRoom.room;
  }

  ngOnInit(): void {
    this.endDateMax = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate() - 1);
    this.startDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    this.endDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1);

    if (localStorage.getItem(this.tokenBookingKey + "StartDate") != null) {
      this.startDate = new Date(localStorage.getItem(this.tokenBookingKey + "StartDate") || this.startDate.toDateString());
      this.endDate = new Date(localStorage.getItem(this.tokenBookingKey + "EndDate") || this.endDate.toDateString());
    }

    this.chooseHotel(0);
    this.chooseRoom(0);
  }

  purchasing: boolean = false;

  purchasingClick() {
    this.purchasing = true;
    var checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
      checkoutButton.scrollIntoView();
    }
  }

  bookingSubtotal: number = 0;
  taxes: number = 0;

  getBookingTotal() {
    if (this.currentRoom === undefined) {
      return "$0.00"
    }
    var hotelCost: number = (this.dayDifference) * this.currentRoom.count;//get the price based on which type of room was chosen
    this.bookingSubtotal = Math.floor(hotelCost * 100) / 100;
    this.taxes = Math.floor((this.bookingSubtotal * .06) * 100) / 100;

    var total: number = Math.floor((this.bookingSubtotal + this.taxes) * 100) / 100;

    localStorage.setItem(this.tokenBookingKey + "StartDate", this.startDate.toDateString());
    localStorage.setItem(this.tokenBookingKey + "EndDate", this.endDate.toDateString());

    return "$" + total.toLocaleString();
  }

  getBookingCost() {
    this.getBookingTotal();
    return "$" + this.bookingSubtotal.toLocaleString();
  }

  getTaxes() {
    this.getBookingTotal();
    return "$" + this.taxes.toLocaleString();
  }

  @ViewChild('loading')
  loading!: LoadingPopupComponent;

  bookingToPurchase: Booking[] = [];

  checkout() {
    if (this.bookingSubtotal === 0) {
      console.log("No booking was selected");
      return;
    }

    //Below is not needed now that this button only appears when logged in.
    // if (!this.userService.loggedIn) {
    //   console.log("Not logged in.");
    // }

    this.loading.toggle(false, "Booking...");
    this.bookingToPurchase = [];
    //add the booking to this list
    for (let i = 0; i < this.dayDifference; i++) {
      var day: Date = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + i);
      var newBooking: Booking = new Booking(day, this.currentHotelAndRoomID);
      this.bookingToPurchase.push(newBooking);
    }


    var reply = this.userService.createBooking(this.bookingToPurchase);

    if (reply === null) { return; }
    reply.subscribe((response: any) => {
      this.loading.toggle(true, "Completed");
      localStorage.removeItem(this.tokenBookingKey + "StartDate");
      localStorage.removeItem(this.tokenBookingKey + "EndDate");
      this.router.navigateByUrl('/dashboard');
    }, error => {
      console.log('Error: ', error);
      window.alert('Unsuccessful Purchase');
      this.loading.toggle(true, "Unsuccessful");
    });

  }
}
