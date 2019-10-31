import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailParkingPlacePage } from './detail-parking-place.page';

import { StarRatingModule } from 'ionic4-star-rating'
import { BookingConfirmationComponent } from 'src/app/components/booking-confirmation/booking-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: DetailParkingPlacePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StarRatingModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailParkingPlacePage, BookingConfirmationComponent],
  entryComponents: [BookingConfirmationComponent]
})
export class DetailParkingPlacePageModule {}
