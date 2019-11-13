import { Component, OnInit, ViewChild } from '@angular/core';
import { ManageVehicleService } from '../../../services/manage-vehicle.service';
import { NgForm } from '@angular/forms';
import { LoadingController, NavController } from '@ionic/angular';
import { AsyncStorageService } from '../../../native/async-storage.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage implements OnInit {

  @ViewChild('addVehicle', { static: true }) form!: NgForm;
  private emailUser!: string;

  constructor(
    private manageVehicleSvc: ManageVehicleService,
    private loadCtrl: LoadingController,
    private navCtrl: NavController,
    private storage: AsyncStorageService
  ) {
  }

  async ngOnInit() {
    this.emailUser = await this.storage.get('token');
  }

  async addVehicleToDB() {
    const loading = await this.loadCtrl.create({
      message: 'Adding vehicle...',
    });
    await loading.present();

    // Get data from Form
    const type = this.form.value.vType;
    const model = this.form.value.vModel;
    const plate = this.form.value.plateNo;
    const email = this.emailUser;

    const vehicle = {
      type, model, email, plate,
    };

    console.log(vehicle);

    await this.manageVehicleSvc.addVehicles(email, plate, model, type);

    // await this.manageVehicleSvc.addVehiclesByObject(vehicle);

    await loading.dismiss();
    await this.backToManage();
  }

  backToManage() {
    this.navCtrl.navigateBack('account/manage-vehicle');
  }

}
