import { Component, OnInit } from '@angular/core';
import { AsyncStorageService } from '../../native/async-storage.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Bookings } from '../../model/booking.model';

type SegmentedValue = 'parking' | 'places';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  segmentedValue: SegmentedValue;

  private email!: string;
  private placeHistoryCollection!: AngularFirestoreCollection<Bookings>;
  private vehicleHistoryCollection!: AngularFirestoreCollection<Bookings>;
  placeHistory: Bookings[] = [];
  vehicleHistory: Bookings[] = [];
  address!: string;

  // private historyPlace!: any;

  constructor(
    private storage: AsyncStorageService,
    private db: AngularFirestore,
  ) {
    this.segmentedValue = 'parking';
  }

  async ngOnInit() {
    this.email = await this.storage.get('token') + '';
    console.log('History page ts:', this.email);
    // @ts-ignore
    // this.historyCollection = this.db.collection<Bookings>('bookings', (ref) => {
    //   ref.where('email', '==', this.email);
    // });

    await this.getVehicleHistory();
    await this.getPlaceHistory();
  }

  getPlaceHistory() {
    this.placeHistoryCollection = this.db.collection<Bookings>('bookings', (ref) =>
      ref.where('placeEmailOwner', '==', this.email),
    );

    console.log('History page ts place history:', this.placeHistoryCollection);

    const pHistory = this.placeHistoryCollection.snapshotChanges().pipe(map(
      action => {
        return action.map(a => {
          console.log('History page ts place history:', a);
          console.log('History page ts place history:', a.payload.doc.data());
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      },
    ));

    pHistory.subscribe(res => {
      console.log(res);
      this.placeHistory = res;
    });
  }

  getVehicleHistory() {
    this.vehicleHistoryCollection = this.db.collection<Bookings>('bookings', (ref) =>
      ref.where('customerEmail', '==', this.email),
    );

    console.log('History page ts vehicle history:', this.vehicleHistoryCollection);

    const vHistory = this.vehicleHistoryCollection.snapshotChanges().pipe(map(
      action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      },
    ));

    vHistory.subscribe(res => {
      console.log(res);
      this.vehicleHistory = res;
    });
  }
}
