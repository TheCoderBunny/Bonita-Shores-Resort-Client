import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-popup',
  templateUrl: './loading-popup.component.html',
  styleUrls: ['./loading-popup.component.css']
})
export class LoadingPopupComponent {

  text: string = "Loading...";
  hidden: boolean = true;

  toggle(hide: boolean, message: string) {
    this.text = message;
    this.hidden = hide;
  }
}
