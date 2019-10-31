import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ManageVehiclePage } from './manage-vehicle.page';
import { AddVehicleComponent } from 'src/app/components/add-vehicle/add-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: ManageVehiclePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ManageVehiclePage, AddVehicleComponent],
  entryComponents: [AddVehicleComponent]
})
export class ManageVehiclePageModule {}
