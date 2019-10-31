import { Component, OnInit } from '@angular/core';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { AddVehicleComponent } from 'src/app/components/add-vehicle/add-vehicle.component';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.page.html',
  styleUrls: ['./manage-vehicle.page.scss'],
})
export class ManageVehiclePage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private actionCtrl: ActionSheetController
  ) { }

  ngOnInit() {
  }

  addVehicle(){
    console.log("Add button clicked!")

    this.showModal()
    // this.showActionSheet()
  }

  async showModal(){
    const modalAdd = await this.modalCtrl.create({
      component: AddVehicleComponent
    })

    await modalAdd.present()
  }

  async showActionSheet(){
    const actionAdd = await this.actionCtrl.create({
      header: 'Add Vehicle',
      buttons: [{
        text: 'Test'
      }, {
        text: 'Cancel',
        role: 'cancel'
      }]
    })

    actionAdd.present()
  }

}
