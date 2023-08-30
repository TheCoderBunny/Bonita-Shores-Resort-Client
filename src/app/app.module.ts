import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './general/sign-up/sign-up.component';
import { HomeComponent } from './resort/home/home.component';

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { SignInPopupComponent } from './general/sign-in-popup/sign-in-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { HeaderComponent } from './general/header/header.component';
import { ParkComponent } from './resortPages/park/park.component';
import { HotelsComponent } from './resortPages/hotels/hotels.component';
import { RestaurantsComponent } from './resortPages/restaurants/restaurants.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    SignInPopupComponent,
    DashboardMainComponent,
    HeaderComponent,
    ParkComponent,
    HotelsComponent,
    RestaurantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
