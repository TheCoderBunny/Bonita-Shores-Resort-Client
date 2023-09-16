import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  imageList: string[] = [
    "https://images.unsplash.com/photo-1570444952548-756e3fc089fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1465996140498-df84be101126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1547737412-04c9cf2b0f56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1933&q=80"];

  currentImage: string = this.imageList[0];
  currentImageInt: number = 0;

  moveImage(amount: number) {
    this.currentImageInt+=amount;
    if (this.currentImageInt<0){
      this.currentImageInt=this.imageList.length-1;
    }else if(this.currentImageInt>this.imageList.length-1){
      this.currentImageInt=0;
    }
    this.currentImage = this.imageList[this.currentImageInt];
    console.log(this.currentImageInt);

    let adImage = <HTMLElement>document.getElementById("adImage");
    adImage.classList.remove("adImageAnimate")
    setTimeout(() => {
      adImage.classList.add("adImageAnimate")
    }, 0);
  }

  ngOnInit(): void {

  }
}
