import { Component, OnInit, ViewChild } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
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
    this.endDateMax=new Date(this.today.getUTCFullYear() + 1,this.today.getUTCMonth(),this.today.getUTCDate()-1);
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

  @ViewChild('startDateTrigger')
  startDateTrigger!: MatMenuTrigger;

  fixDates(){
    this.startDateTrigger.closeMenu();
    if (this.endDate < this.startDate) {
      this.endDate = this.startDate;
    }
  }

  selectedChangeFirstDate(m: any) {
    this.fixDates();
  }

  selectedChangeSecondDate(m: any) {
    this.fixDates();
  }

  monthNames: string[] = ["Jan", "Feb", "March", "April", "May", "June",
    "July", "August", "Sept", "Oct", "Nov", "Dec"];

  getShortDate(date: Date) {
    return this.monthNames[date.getUTCMonth()]+" "+date.getUTCDate();
  }

  getDayDifference(){//should never be negative
    var dayDifference = Math.floor((this.endDate.getTime()-this.startDate.getTime())/(1000 * 60 * 60 * 24))
    console.log(dayDifference)
    if (dayDifference==0){
      return (dayDifference+1) + " Day";
    }else{
      return (dayDifference+1) + " Days";
    }
  }
}