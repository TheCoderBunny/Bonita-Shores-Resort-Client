import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { tick } from '@angular/core/testing';
import { DateRange } from '@angular/material/datepicker';
import { MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})

export class ParkComponent implements OnInit {
  imageList: string[] = [
    "https://images.unsplash.com/photo-1570444952548-756e3fc089fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1465996140498-df84be101126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1547737412-04c9cf2b0f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1933&q=80"];

  currentImage: string = this.imageList[0];
  currentImageInt: number = 0;

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

  selected: Date = new Date();

  ngOnInit(): void {
    this.endDateMax = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate() - 1);
    this.startDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    this.endDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
  }

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
    if (this.endDate < this.startDate) {
      this.endDate = this.startDate;
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
    if (this.dayDifference == 0) {
      this.dayDifferenceIcon = "wb_sunny";
      return (this.dayDifference + 1) + " Day";
    } else {
      this.dayDifferenceIcon = "forward";
      return (this.dayDifference + 1) + " Days";
    }
  }

  adultTicketCount: number = 1;
  childTicketCount: number = 0;

  adjustAdultTicketCount(num: number) {
    this.adultTicketCount += num;
    if (this.adultTicketCount < 0) {
      this.adultTicketCount = 0;
    }
  }

  getAdultTicketCount() {
    if (this.adultTicketCount == 1) {
      return this.adultTicketCount + " Adult";
    } else {
      return this.adultTicketCount + " Adults";
    }
  }

  adjustChildTicketCount(num: number) {
    this.childTicketCount += num;
    if (this.childTicketCount < 0) {
      this.childTicketCount = 0;
    }
  }

  getChildTicketCount() {
    if (this.childTicketCount == 1) {
      return this.childTicketCount + " Child";
    } else {
      return this.childTicketCount + " Children";
    }
  }

  purchasing: boolean = false;

  purchasingClick(){
    this.purchasing=true;
    var checkoutButton = document.getElementById('checkout');
    if (checkoutButton){
      // checkoutButton.scrollTop = checkoutButton.scrollHeight;
      checkoutButton.scrollIntoView();
    }
  }

  getTicketCount() {
    var ticketCount: number = (this.adultTicketCount + this.childTicketCount) * (this.dayDifference + 1);
    if (ticketCount == 1) {
      return ticketCount + " Ticket";
    } else {
      return ticketCount + " Tickets";
    }
  }

  ticketSubtotal: number = 0;
  taxes: number = 0;

  getTicketTotal() {
    var adultTickets: number = this.adultTicketCount * (this.dayDifference + 1) * 89.99;
    var childTickets: number = this.childTicketCount * (this.dayDifference + 1) * 59.99;
    this.ticketSubtotal = Math.floor((adultTickets + childTickets) * 100) / 100;
    this.taxes = Math.floor((this.ticketSubtotal * .06) * 100) / 100;

    var total: number = Math.floor((this.ticketSubtotal + this.taxes) * 100) / 100;

    return "$" + total.toLocaleString();
  }

  getTicketCost() {
    this.getTicketTotal();
    return "$" + this.ticketSubtotal.toLocaleString();
  }

  getTaxes() {
    this.getTicketTotal();
    return "$" + this.taxes.toLocaleString();
  }
}