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
  hideBSRInfo: boolean = true;


  prepareSlide01() {
    //show myself?
  }

  prepareSlide02() {
    this.hideScripture();
    this.hideHomeLocation();
    this.hideWhatIDo();
    this.hideMyInterests();
    let myself = <HTMLElement>document.getElementById("myself");
    myself.classList.add("info-panel-fly");

    let bonitaShoresResortInfo = <HTMLElement>document.getElementById("bonita-shores-resort-info");
    bonitaShoresResortInfo.classList.add("info-panel-top-reveal");

    this.hideBSRInfo = false;

    setTimeout(() => {
      let bSRSectionTop = <HTMLElement>document.getElementById("bsr-section-top");
      bSRSectionTop.classList.add("unhide");
    }, 4000);

    setTimeout(() => {
      let section = <HTMLElement>document.getElementById("bsr-section01");
      section.classList.add("unhide");
    }, 6000);

    setTimeout(() => {
      let section = <HTMLElement>document.getElementById("bsr-section-arrow01");
      section.classList.add("unhide");
    }, 7500);

    setTimeout(() => {
      let section = <HTMLElement>document.getElementById("bsr-section02");
      section.classList.add("unhide");
    }, 8000);

    setTimeout(() => {
      let section = <HTMLElement>document.getElementById("bsr-section-arrow02");
      section.classList.add("unhide");
    }, 9500);

    setTimeout(() => {
      let section = <HTMLElement>document.getElementById("bsr-section03");
      section.classList.add("unhide");
    }, 10000);


    //introduce the app and it's purpose.
    let planet = <HTMLElement>document.getElementById("planet");
    planet.classList.add("planet-move01");
    let space = <HTMLElement>document.getElementById("space");
    space.classList.add("space-move01");
  }

  prepareSlide03() {

    let bonitaShoresResortInfo = <HTMLElement>document.getElementById("bonita-shores-resort-info");
    bonitaShoresResortInfo.classList.add("info-panel-top-hide");

    let techInfo = <HTMLElement>document.getElementById("tech-info");
    techInfo.classList.add("info-panel-reveal");

    //talk about the tech behind it.
    let planet = <HTMLElement>document.getElementById("planet");
    planet.classList.add("planet-move02");
    let space = <HTMLElement>document.getElementById("space");
    space.classList.add("space-move02");
  }


  openSegment01(): void {
    let planet = <HTMLElement>document.getElementById("planet");
    planet.classList.add("planet-move03mid");
    let space = <HTMLElement>document.getElementById("space");
    space.classList.add("space-move03");

    let techInfo = <HTMLElement>document.getElementById("tech-info");
    techInfo.classList.add("info-panel-fly");

    let slideRightButton = <HTMLElement>document.getElementById("rightButton");
    slideRightButton.classList.add("slide-button-right")

    setTimeout(() => {
      this.openSegment02Mid();
    }, 4000);
  }

  openSegment02Mid(): void {

    let planet = <HTMLElement>document.getElementById("planet");
    planet.classList.add("planet-move03");

    setTimeout(() => {
      this.openSegment02();
    }, 1500);
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

    if (this.slideOn == 1) {
      this.prepareSlide01();
    } else if (this.slideOn == 2) {
      this.prepareSlide02();
    } else if (this.slideOn == 3) {
      this.prepareSlide03();
    } else {
      this.openSegment01();
    }
  }

  ngOnInit(): void {
    this.prepareSlide01();
  }

  scriptureOpened: boolean = false;

  openScripture() {
    console.log("Open Scripture")
    this.scriptureOpened = true;
    let scripture = <HTMLElement>document.getElementById("scripture");
    scripture.classList.add("info-panel-right-unfold")
  }

  hideScripture() {
    if (!this.scriptureOpened) { return }
    let scripture = <HTMLElement>document.getElementById("scripture");
    scripture.classList.add("info-panel-right-fly")
  }

  homeLocationOpened: boolean = false;

  openHomeLocation() {
    this.homeLocationOpened = true;
    this.hideScripture();
    setTimeout(() => {
      let miniMap = <HTMLElement>document.getElementById("mini-map");
      miniMap.classList.add("info-panel-right-quick-appear")
    }, 2500);
  }

  hideHomeLocation() {
    if (!this.homeLocationOpened) { return }
    let miniMap = <HTMLElement>document.getElementById("mini-map");
    miniMap.classList.add("info-panel-right-quick-disappear")
  }

  whatIDoOpened: boolean = false;

  openWhatIDo() {
    this.whatIDoOpened = true;
    this.hideScripture();
    this.hideHomeLocation();
    setTimeout(() => {
      let whatIDo = <HTMLElement>document.getElementById("what-i-do");
      whatIDo.classList.add("info-panel-right-img-open")
    }, 2500);
  }

  hideWhatIDo() {
    if (!this.whatIDoOpened) { return }
    let whatIDo = <HTMLElement>document.getElementById("what-i-do");
    whatIDo.classList.add("info-panel-right-img-close")
  }

  interestsOpened: boolean = false;

  openMyInterests() {
    this.interestsOpened = true;
    this.hideScripture();
    this.hideHomeLocation();
    this.hideWhatIDo();
    setTimeout(() => {
      let interests = <HTMLElement>document.getElementById("interests");
      interests.classList.add("info-panel-right-img-open")
    }, 1000);
  }

  hideMyInterests() {
    if (!this.interestsOpened) { return }
    let interests = <HTMLElement>document.getElementById("interests");
    interests.classList.add("info-panel-right-img-close")
  }

}
