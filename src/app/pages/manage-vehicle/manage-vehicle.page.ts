import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageVehicleService } from '../../services/manage-vehicle.service';
import { VehicleViewModel } from '../../model/vehicle.model';
import { AsyncStorageService } from '../../native/async-storage.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.page.html',
  styleUrls: ['./manage-vehicle.page.scss'],
})
export class ManageVehiclePage implements OnInit {

  vehicleList: VehicleViewModel[] = [];

  constructor(
    private router: Router,
    private manageVehicleSvc: ManageVehicleService,
    private storage: AsyncStorageService,
    private loadCtrl: LoadingController,
  ) {
  }

  async ngOnInit() {
    const loading = await this.loadCtrl.create({
      message: 'Loading your vehicles...',
    });
    await loading.present();

    const email = await this.storage.get('token');

    console.log('ngOnInit', email);

    this.manageVehicleSvc.getVehicles(email).subscribe(async res => {
      this.vehicleList = res;
      console.log(this.vehicleList);
      await loading.dismiss();
    });
  }

  addVehicle() {
    console.log('Add button clicked!');

    this.router.navigateByUrl('add-vehicle').then(r => r);
  }
}
