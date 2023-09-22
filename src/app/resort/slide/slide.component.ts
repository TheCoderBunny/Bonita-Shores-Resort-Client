import { Component } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent {

  slideOn: number = 1;
  hideHomePage: boolean = true;
  hidePlanet: boolean = false;


  prepareSlide01(){
    //show myself?
  }

  prepareSlide02(){
    //introduce the app and it's purpose.
    let planet = <HTMLElement>document.getElementById("planet");
    planet.classList.add("planet-move01");
    let space = <HTMLElement>document.getElementById("space");
    space.classList.add("space-move01");
  }

  prepareSlide03(){
    //talk about the tech behind it.
    let planet = <HTMLElement>document.getElementById("planet");
    planet.classList.add("planet-move02");
    let space = <HTMLElement>document.getElementById("space");
    space.classList.add("space-move02");
  }


  openSegment01(): void {
    //zoom into the earth, go through clouds and open into Bontia Shores?

    let planet = <HTMLElement>document.getElementById("planet");
    planet.classList.add("planet-move03");
    let space = <HTMLElement>document.getElementById("space");
    space.classList.add("space-move03");

    let slideRightButton = <HTMLElement>document.getElementById("rightButton");
    slideRightButton.classList.add("slide-button-right")

    setTimeout(() => {
      this.openSegment02();
    }, 1000);
  }

  openSegment02(): void {
    // this.hideHomePage = false;
    // let slideMain = <HTMLElement>document.getElementById("slide-main");
    // slideMain.classList.add("slide-away")
    let atmosphere = <HTMLElement>document.getElementById("atmosphere");
    atmosphere.classList.add("atmosphere-reveal")

    setTimeout(() => {
      this.openSegment03();
    }, 1000);
  }

  openSegment03(): void {
    this.hidePlanet = true;
    this.hideHomePage = false;
    let slideMain = <HTMLElement>document.getElementById("slide-main");
    slideMain.classList.add("slide-away")
    let atmosphere = <HTMLElement>document.getElementById("atmosphere");
    atmosphere.classList.add("atmosphere-hide")
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
      this.prepareSlide01();
    }else if (this.slideOn==2){
      this.prepareSlide02();
    }else if (this.slideOn==3){
      this.prepareSlide03();
    }else{
      this.openSegment01();
    }
  }

  ngOnInit(): void {
    this.prepareSlide01();
  }

}
