import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.scss'],
})
export class AddPlaceComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addPlaceToDB(){
    console.log("Vehicle Added")
    console.log("Closing Modal")
    this.closeModal()
  }

  addPlacePicture(){
    console.log("Picture Added");
  }

}
