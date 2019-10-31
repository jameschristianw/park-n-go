import { AddPlaceComponent } from './../../components/add-place/add-place.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManagePlacePage } from './manage-place.page';

const routes: Routes = [
  {
    path: '',
    component: ManagePlacePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManagePlacePage,AddPlaceComponent],
  entryComponents: [AddPlaceComponent]
})
export class ManagePlacePageModule {}
