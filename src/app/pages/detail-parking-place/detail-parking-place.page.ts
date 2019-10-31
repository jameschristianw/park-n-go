import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-detail-parking-place',
  templateUrl: './detail-parking-place.page.html',
  styleUrls: ['./detail-parking-place.page.scss'],
})
export class DetailParkingPlacePage implements OnInit {

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  onBookBtnClick(){
    this.showModal()
    console.log("Button Book Now Click")
  }

  async showModal(){
    // const modal = await this.modalCtrl.create({
    //   componentProps:
    // })

    // await modal.present()
  }

}
