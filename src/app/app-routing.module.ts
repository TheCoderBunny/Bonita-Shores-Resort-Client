import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './general/sign-up/sign-up.component';
import { HomeComponent } from './resort/home/home.component';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { ParkComponent } from './resortPages/park/park.component';
import { HotelsComponent } from './resortPages/hotels/hotels.component';
import { RestaurantsComponent } from './resortPages/restaurants/restaurants.component';
import { SlideComponent } from './resort/slide/slide.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full"
  },
  {
    path: "home",
    component: HomeComponent
  },
  {
    path: "homeslide",
    component: SlideComponent
  },
  {
    path: "register",
    component: SignUpComponent
  },
  {
    path: "trip",
    component: DashboardMainComponent
  },
  {
    path: "park",
    component: ParkComponent
  },
  {
    path: "hotels",
    component: HotelsComponent
  },
  {
    path: "dining",
    component: RestaurantsComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
