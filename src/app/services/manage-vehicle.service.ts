import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Vehicle, VehicleViewModel } from '../model/vehicle.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsyncStorageService } from '../native/async-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ManageVehicleService {

  private vehiclesObservable!: Observable<VehicleViewModel[]>;

  constructor(private db: AngularFirestore) {
  }

  getVehicles(email: string) {
    const vehicleCollection = this.db.collection<Vehicle>('vehicles', (ref) =>
      ref.where('email', '==', email),
    );
    console.log('Manage Vehicle Service getVehicles', vehicleCollection);

    this.vehiclesObservable = vehicleCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      }),
    );

    console.log('Manage Vehicle Service getVehicles', this.vehiclesObservable);

    return this.vehiclesObservable;
  }

  addVehicles(emailOwner: string, plate: string, model: string, type: string) {
    const vehicleCollection = this.db.collection<Vehicle>('vehicles', (ref) =>
      ref.where('email', '==', emailOwner),
    );

    return vehicleCollection.add({
      vehicleType: type === 'Car' ? 'Car' : 'Motorcycle',
      vehicleModel: model,
      email: emailOwner,
      plateNo: plate,
    });
  }

  editVehicle(emailOwner: string, plate: string, model: string, type: string, id: string) {
    console.log('Edit Vehicle Service');
<<<<<<< HEAD
    this.db.doc<Vehicle>('vehicles/' + id).update({
=======
    // @ts-ignore
    return this.vehicleCollection.doc<Vehicle>(id).update({
>>>>>>> Edit Vehicle WIP - Add delete vehicle
      email: emailOwner,
      vehicleModel: model,
      vehicleType: type === 'Car' ? 'Car' : 'Motorcycle',
      plateNo: plate,
    });
  }

<<<<<<< HEAD
  deleteVehicle(id: string, email: string) {
    return this.db.doc('vehicles/' + id).delete();
=======
  deleteVehicle(id: string | null){
    return this.vehicleCollection.doc<Vehicle>(id).delete();
>>>>>>> Edit Vehicle WIP - Add delete vehicle
  }
}
