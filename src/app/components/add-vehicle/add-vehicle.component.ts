import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss'],
})
export class AddVehicleComponent implements OnInit {

  @ViewChild('addVehicle', { static: false }) addForm!: NgForm;
  vehicleType!: string;
  vehicleModel!: string;
  plateNumber!: string;

  constructor(
    private modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
  }

  closeModal() {
    console.log('Closing Modal');
    this.modalCtrl.dismiss();
  }

  addVehicleToDB() {

    if (!this.addForm.valid) {
      console.log('Please fill in the blanks with the right input!');
    } else {
      // Add vehicle


      console.log('Vehicle Added');


      console.log('Closing Modal');
      // this.closeModal()
    }
  }

  addVehiclePicture() {
    console.log('Picture Added');
  }
}
