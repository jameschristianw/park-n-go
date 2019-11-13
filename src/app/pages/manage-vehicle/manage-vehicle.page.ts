import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageVehicleService } from '../../services/manage-vehicle.service';
import { Vehicle } from '../../model/vehicle.model';

@Component({
  selector: 'app-manage-vehicle',
  templateUrl: './manage-vehicle.page.html',
  styleUrls: ['./manage-vehicle.page.scss'],
})
export class ManageVehiclePage implements OnInit {

  vehicleList: Vehicle[] = [];

  constructor(
    private router: Router,
    private manageVehicleSvc: ManageVehicleService
  ) {
  }

  async ngOnInit() {
    (await this.manageVehicleSvc.getVehicles()).subscribe(res => {
      this.vehicleList = res;
      console.log('Manage Vehicle Page', this.vehicleList);
    });
    // this.vehicleList = this.manageVehicleSvc.getVehicles();
  }

  addVehicle() {
    console.log('Add button clicked!');

    this.router.navigateByUrl('add-vehicle');
  }

  editVehicle(item: Vehicle) {
    console.log('Edit Vehicle page.ts');
    console.log(item);
  }
}
