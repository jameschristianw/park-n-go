import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailParkingPlacePage } from './detail-parking-place.page';
import { BookParkingConfirmationComponent } from 'src/app/components/book-parking-confirmation/book-parking-confirmation.component';

import { StarRatingModule } from 'ionic4-star-rating'

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
  declarations: [DetailParkingPlacePage, BookParkingConfirmationComponent],
  entryComponents: [BookParkingConfirmationComponent]
})
export class DetailParkingPlacePageModule {}
