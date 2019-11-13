import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { AddVehicleComponent } from 'src/app/components/add-vehicle/add-vehicle.component';
import { Router } from '@angular/router';
import { ManageVehicleService } from '../../services/manage-vehicle.service';
import { Vehicle } from '../../model/vehicle.model';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.page.html',
  styleUrls: ['./manage-vehicle.page.scss'],
})
export class ManageVehiclePage implements OnInit {

  vehicleList: Vehicle[] = [];

  constructor(
    private modalCtrl: ModalController,
    private actionCtrl: ActionSheetController,
    private router: Router,
    private manageVehicleSvc: ManageVehicleService
  ) {
  }

  async ngOnInit() {
    (await this.manageVehicleSvc.getVehicles()).subscribe(res => {
      this.vehicleList = res;
    });
    // this.vehicleList = this.manageVehicleSvc.getVehicles();
    console.log('Manage Vehicle Page', this.vehicleList);
  }

  addVehicle() {
    console.log('Add button clicked!');

    this.router.navigateByUrl('add-vehicle');

    // this.showModal()
    // this.showActionSheet()
  }

  async showModal() {
    const modalAdd = await this.modalCtrl.create({
      component: AddVehicleComponent,
    });

    await modalAdd.present();
  }

  async showActionSheet() {
    const actionAdd = await this.actionCtrl.create({
      header: 'Add Vehicle',
      buttons: [{
        text: 'Test',
      }, {
        text: 'Cancel',
        role: 'cancel',
      }],
    });

    actionAdd.present();
  }

}
