import { Component } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent {

  slideOn: number = 0;
  hideHomePage: boolean = true;


  prepareSlide01(){
    
  }


  open(): void {
    this.hideHomePage = false;
    let slideMain = <HTMLElement>document.getElementById("slide-main");
    slideMain.classList.add("slide-away")

    let slideRightButton = <HTMLElement>document.getElementById("rightButton");
    slideRightButton.classList.add("slide-button-right")

    let slideLeftButton = <HTMLElement>document.getElementById("leftButton");
    slideLeftButton.classList.add("slide-button-left")
  }

  canMoveSlide: boolean = true;

  moveSlide(amount: number) {
    if (this.canMoveSlide == false) { return; }
    this.canMoveSlide = false;
    console.log("Moving Slide")
    this.slideOn += amount;
    setTimeout(() => {
      this.canMoveSlide = true;
    }, 3000);

    if (this.slideOn==1){
      this.open();
    }
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.open();
    // }, 1000);
  }

}
