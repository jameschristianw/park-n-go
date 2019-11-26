// import { FailComponent } from './../../components/booking/fail/fail.component';
// import { SuccessComponent } from './../../components/booking/success/success.component';
import { ActionSheetController, ModalController, NavController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AsyncStorageService } from '../../native/async-storage.service';
import { ManageVehicleService } from '../../services/manage-vehicle.service';
import { VehicleViewModel } from '../../model/vehicle.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { SuccessComponent } from '../../components/booking/success/success.component';
import { FailComponent } from '../../components/booking/fail/fail.component';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  placeId!: string;
  pricePerHour!: number;
  totalPrice!: string;
  duration!: string;
  plateNo!: string;
  arrivalTime!: string;
  leavingTime!: string;

  vehicleList: VehicleViewModel [] = [];
  buttons: any[] = [];

  arrivalTimeSet = false;
  leavingTimeSet = false;

  @ViewChild('bookingForm', { static: true }) form!: NgForm;
  leavingDateTime!: number;
  arrivalDateTime!: number;
  plateModel!: any;

  constructor(
    // private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private actionCtrl: ActionSheetController,
    private storage: AsyncStorageService,
    private vehicleSvc: ManageVehicleService,
    private db: AngularFirestore,
    private modalCtrl: ModalController
  ) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        this.backToHome();
      }

      this.placeId = paramMap.get('id') + '';
      this.pricePerHour = Number(paramMap.get('price'));
      this.duration = '-';
      this.plateNo = '-';
      //
      // this.arrivalDateTime = Date.parse(new Date(this.form.value.arrivalDateTime).toISOString());
      // this.leavingDateTime = Date.parse(new Date(this.form.value.leavingDateTime).toISOString());
      // const diff = this.leavingDateTime - this.arrivalDateTime;
      // console.log(diff);
    });
  }

  async calculateDuration(timeId: number) {
    if (timeId === 1) {
      // this.arrivalDateTime = this.leavingTime;
      this.arrivalDateTime = new Date(this.arrivalTime).getTime();
      console.log(this.arrivalDateTime);
      this.arrivalTimeSet = true;
    }
    if (timeId === 2) {
      // this.leavingDateTime = await this.form.value.leavingDateTime;
      this.leavingDateTime = new Date(this.leavingTime).getTime();
      console.log(this.leavingDateTime);
      this.leavingTimeSet = true;
    }

    if (this.arrivalTimeSet && this.leavingTimeSet) {
      console.log(this.arrivalDateTime, this.leavingDateTime);

      const arrive = new Date(this.arrivalTime).getTime();
      const leave = new Date(this.leavingTime).getTime();
      const diff = (leave - arrive) / 3600000;

      // const diff = (this.leavingDateTime - this.arrivalDateTime) / 3600000;
      this.duration = String(Math.ceil(diff));
      this.totalPrice = String(Math.ceil(diff) * this.pricePerHour);
    } else {
      this.duration = '-';
    }
  }

  async changeVehicle() {
    const email = await this.storage.get('token');

    await this.vehicleSvc.getVehicles(email).subscribe(res => {
      this.vehicleList = [];
      this.vehicleList = res;
      console.log('Booking', this.vehicleList);
      this.vehicleList.forEach(v => {
        console.log(v.plateNo);
        this.buttons.push({
          text: v.plateNo,
          handler: () => {
            this.plateNo = v.plateNo;
          },
        });
      });

      console.log('Buttons', this.buttons);

      this.actionCtrl.create({
        header: 'Select Vehicle Plate Number',
        buttons: this.buttons,
      }).then(action => {
        action.present();
      });
    });
  }

  async bookingPlace() {
    console.log('Creating Booking');

    console.log('toDateString()', new Date().toDateString());
    console.log('toISOString()', new Date().toISOString());
    console.log('toTimeString()', new Date().toTimeString());

    const email = await this.storage.get('token');
    const created = new Date().toISOString();

    console.log(email, this.plateNo, this.placeId, this.duration, this.arrivalDateTime, this.leavingDateTime, this.totalPrice, created);


    const res = this.db.collection('bookings').add({
      customerEmail: email,
      customerPlateNo: this.plateNo,
      placeId: this.placeId,
      duration: this.duration,
      arrivalDateTime: this.arrivalDateTime,
      leavingDateTime: this.leavingDateTime,
      totalPrice: this.totalPrice,
      createdAt: created,
    });

    console.log(res);

    // Check if success or not

    const success = 1;
    if (success) {
      const modal = await this.modalCtrl.create({
        component: SuccessComponent,
      });
      await modal.present();
    } else {
      const modal = await this.modalCtrl.create({
        component: FailComponent,
      });
      await modal.present();
    }
  }

  backToHome() {
    this.navCtrl.navigateBack('/tabs/parking').then(r => r);
  }
}
