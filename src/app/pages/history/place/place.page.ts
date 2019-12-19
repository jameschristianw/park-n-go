import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-place',
  templateUrl: './place.page.html',
  styleUrls: ['./place.page.scss'],
})
export class PlacePage implements OnInit {

  // Place
  placeAddress = '';
  placeName = '';

  // Order
  parkingDuration = '';
  totalPrice = '';
  arrivalTime = '';
  leavingTime = '';
  createdAt = '';

  // Customer
  customerFirstName = '';
  customerLastName = '';
  customerFullName = '';
  customerPhoneNo = '';
  customerEmail = '';

  // Vehicle
  vehiclePlateNo = '';
  vehicleModel = '';
  vehicleType = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private firestore: AngularFirestore,
  ) {
  }

  async ngOnInit() {
    await this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('custEmail')) {
        this.backToHistory();
      }

      // Customer
      this.customerEmail = paramMap.get('custEmail') + '';
      this.firestore.collection<User>('users/', ref =>
        ref.where('email', '==', this.customerEmail),
      ).valueChanges().pipe().subscribe(res => {
        res.map(a => {
          // this.userInfo = a; // Bisa diakses, tp undefined ?
          console.log('userInfo', a);

          this.customerFirstName = a.firstName;
          this.customerLastName = a.lastName;
          this.customerFullName = a.firstName + ' ' + a.lastName;
          this.customerPhoneNo = a.phoneNo;
          this.customerEmail = a.email;
        });
      });

      // Vehicle
      this.vehiclePlateNo = paramMap.get('vehiclePlateNo') + '';
      this.vehicleModel = paramMap.get('vehicleModel') + '';
      this.vehicleType = paramMap.get('vehicleType') + '';

      // Place
      this.placeAddress = paramMap.get('address') + '';
      this.placeName = paramMap.get('placeName') + '';

      // Order
      this.parkingDuration = paramMap.get('duration') + '';
      this.totalPrice = paramMap.get('price') + '';
      this.arrivalTime = paramMap.get('arrivalTime') + '';
      this.leavingTime = paramMap.get('leavingTime') + '';
      this.createdAt = paramMap.get('createdAt') + '';
    });
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter', this.placeName);
    console.log('ionViewDidEnter', this.customerFullName);
  }

  backToHistory() {
    this.navCtrl.navigateBack('tabs/history').then(r => r);
  }
}
