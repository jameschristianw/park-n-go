import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  closeModal(){
    this.modalCtrl.dismiss()
  }

  addVehicleToDB(){
    // this.closeModal()
    console.log("Vehicle Added")
    console.log("Closing Modal")
    this.closeModal()
  }

  addVehiclePicture(){
    console.log("Picture Added");
  }
}
