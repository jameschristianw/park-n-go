import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingConfirmationComponent } from 'src/app/components/booking-confirmation/booking-confirmation.component';

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
    const modal = await this.modalCtrl.create({
      component: BookingConfirmationComponent,
    })

    await modal.present()
  }

}
