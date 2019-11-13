import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Vehicle } from '../model/vehicle.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ManageVehicleService {

  private vehicleCollection: AngularFirestoreCollection<Vehicle>;
  private vehicles!: Observable<Vehicle[]>;

  constructor(db: AngularFirestore) {
    this.vehicleCollection = db.collection<Vehicle>('vehicles', ref =>
      ref.where('email', '==', 'asd@asd.com'),
    );
  }

  async getVehicles() {
    this.vehicles = await this.vehicleCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data};
          // return { ...data };
        });
      }),
    );

    await console.log('Manage Vehicle Service', this.vehicles);

    return this.vehicles;
  }

  addVehicles(emailOwner: string, plate: string, model: string, type: string) {
    return this.vehicleCollection.add({
      vehicleType: type === 'car' ? 'Car' : 'Motorcycle',
      vehicleModel: model,
      email: emailOwner,
      plateNo: plate,
    });
  }

  addVehiclesByObject(v: Vehicle) {
    return this.vehicleCollection.add({
      vehicleType: v.vehicleType,
      vehicleModel: v.vehicleModel,
      email: v.email,
      plateNo: v.plateNo,
    });
  }
}
