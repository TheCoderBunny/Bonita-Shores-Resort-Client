import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { DateRange } from '@angular/material/datepicker';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LoadingPopupComponent } from 'src/app/general/loading-popup/loading-popup.component';
import { Ticket } from 'src/app/models/ticket';
import { DatabaseLocal } from 'src/app/services/database-local';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-park',
  templateUrl: './park.component.html',
  styleUrls: ['./park.component.css']
})

export class ParkComponent implements OnInit {
  imageList: string[] = [
    "https://images.unsplash.com/photo-1548701762-f976430363b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1930&q=80",
    "https://images.unsplash.com/photo-1586836476603-ce713984045e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1547737412-04c9cf2b0f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1933&q=80"];

  currentImage: string = this.imageList[0];
  currentImageInt: number = 0;

  tokenTicketsKey: string = "BSRTicketsToken";

  constructor(public userService: UserService, private router: Router, private databaseLocal: DatabaseLocal) { }

  moveImage(amount: number) {
    this.currentImageInt += amount;
    if (this.currentImageInt < 0) {
      this.currentImageInt = this.imageList.length - 1;
    } else if (this.currentImageInt > this.imageList.length - 1) {
      this.currentImageInt = 0;
    }
    this.currentImage = this.imageList[this.currentImageInt];

    let adImage = <HTMLElement>document.getElementById("adImage");
    adImage.classList.remove("adImageAnimate")
    setTimeout(() => {
      adImage.classList.add("adImageAnimate")
    }, 0);
  }

  today: Date = new Date();
  endDateMax: Date = new Date();
  startDate: Date = new Date();
  endDate: Date = new Date();

  // selected: Date = new Date();

  adultTicketCount: number = 1;
  childTicketCount: number = 0;

  ngOnInit(): void {
    this.endDateMax = new Date(this.today.getFullYear() + 1, this.today.getMonth(), this.today.getDate() - 1);
    this.startDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());
    this.endDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate());

    if (localStorage.getItem(this.tokenTicketsKey + "StartDate") != null) {
      this.startDate = new Date(localStorage.getItem(this.tokenTicketsKey + "StartDate") || this.startDate.toDateString());
      this.endDate = new Date(localStorage.getItem(this.tokenTicketsKey + "EndDate") || this.endDate.toDateString());
      this.adultTicketCount = Number(localStorage.getItem(this.tokenTicketsKey + "AdultTicketCount")) || 1;
      this.childTicketCount = Number(localStorage.getItem(this.tokenTicketsKey + "ChildTicketCount")) || 0;
    }
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

  purchasingClick() {
    this.purchasing = true;
    var checkoutButton = document.getElementById('checkout');
    if (checkoutButton) {
      setTimeout(() => {
        checkoutButton!.scrollIntoView(false);
      }, 0);
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
    var adultTickets: number = this.adultTicketCount * (this.dayDifference + 1) * this.databaseLocal.tickets[0].count;
    var childTickets: number = this.childTicketCount * (this.dayDifference + 1) * this.databaseLocal.tickets[1].count;
    this.ticketSubtotal = Math.floor((adultTickets + childTickets) * 100) / 100;
    this.taxes = Math.floor((this.ticketSubtotal * .06) * 100) / 100;

    var total: number = Math.floor((this.ticketSubtotal + this.taxes) * 100) / 100;

    localStorage.setItem(this.tokenTicketsKey + "StartDate", this.startDate.toDateString());
    localStorage.setItem(this.tokenTicketsKey + "EndDate", this.endDate.toDateString());
    localStorage.setItem(this.tokenTicketsKey + "AdultTicketCount", this.adultTicketCount.toString());
    localStorage.setItem(this.tokenTicketsKey + "ChildTicketCount", this.childTicketCount.toString());

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

  @ViewChild('loading')
  loading!: LoadingPopupComponent;

  ticketsToPurchase: Ticket[] = [];

  checkout() {
    if (this.ticketSubtotal === 0) {
      console.log("No tickets were selected");
      return;
    }

    //Below is not needed now that this button only appears when logged in.
    // if (!this.userService.loggedIn) {
    //   console.log("Not logged in.");
    // }

    this.loading.toggle(false, "Purchasing...");
    this.ticketsToPurchase = [];
    //add the tickets to this list
    for (let i = 0; i < this.dayDifference + 1; i++) {
      var day: Date = new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + i);
      for (let i = 0; i < this.adultTicketCount; i++) {
        var newTicket: Ticket = new Ticket(day, 0);//an adult ticket is type 0 (Make a service that universally holds this information.)
        this.ticketsToPurchase.push(newTicket);
      }
      for (let i = 0; i < this.childTicketCount; i++) {
        var newTicket: Ticket = new Ticket(day, 1);//a child ticket is type 1 (Make a service that universally holds this information.)
        this.ticketsToPurchase.push(newTicket);
      }
    }

    // console.log(ticketsToPurchase);


    var reply = this.userService.createTickets(this.ticketsToPurchase);

    if (reply === null) { return; }
    reply.subscribe((response: any) => {
      this.loading.toggle(true, "Completed");
      localStorage.removeItem(this.tokenTicketsKey + "StartDate");
      localStorage.removeItem(this.tokenTicketsKey + "EndDate");
      localStorage.removeItem(this.tokenTicketsKey + "AdultTicketCount");
      localStorage.removeItem(this.tokenTicketsKey + "ChildTicketCount");
      this.router.navigateByUrl('/dashboard');
    }, error => {
      console.log('Error: ', error);
      window.alert('Unsuccessful Purchase');
      this.loading.toggle(true, "Unsuccessful");
    });

  }
}