import { AsyncStorageService } from './../../../native/async-storage.service';
import { Login } from './../../../model/login.model';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  input: Login = {
    email: '',
    password: '',
  };

  constructor(
    private authSvc: AuthService,
    private toastCtrl: ToastController,
    private router: Router,
    private loadCtrl: LoadingController,
    private storage: AsyncStorageService,
  ) {
  }

  async ngOnInit() {

  }

  async onLogin() {
    const loading = await this.loadCtrl.create({
      message: 'Loging in . . .',
    });
    await loading.present();
    this.authSvc.login(this.input.email, this.input.password).subscribe(
      async (resp) => {
        try {
          if (resp.idToken) {
            await this.storage.set('token', this.input.email);
            await this.presentSuccessToast();
            await this.loadCtrl.dismiss();
            this.router.navigateByUrl('/tabs/parking');
          }
        } catch (error) {
          console.log(error);
        }
      },
      async (errorResp) => {
        await loading.dismiss();
        const errorMessage = errorResp.error.error.message;
        if (errorMessage === 'INVALID_PASSWORD') {
          this.presentFailedToast();
        } else if (errorMessage === 'INVALID_EMAIL' || errorMessage === 'EMAIL_NOT_FOUND') {
          this.presentInvalidEmailToast();
        } else if (errorMessage === 'MISSING_PASSWORD') {
          this.presentMissingPasswordToast();
        } else {
          this.presentCheckInternetToast();
        }
        console.log('error', errorResp.error.error.message);
      },
    );
  }

  async presentSuccessToast() {
    const toast = await this.toastCtrl.create({
      message: `Welcome back. Let's book parking! `,
      duration: 3000,
    });
    await toast.present();
  }

  async presentFailedToast() {
    const toast = await this.toastCtrl.create({
      message: `Incorrect email/password. Please try again.`,
      duration: 3000,
    });
    await toast.present();
  }

  async presentCheckInternetToast() {
    const toast = await this.toastCtrl.create({
      message: `Please check your internet connection`,
      duration: 3000,
    });
    await toast.present();
  }

  async presentInvalidEmailToast() {
    const toast = await this.toastCtrl.create({
      message: `Please check your email!`,
      duration: 3000,
    });
    await toast.present();
  }

  async presentMissingPasswordToast() {
    const toast = await this.toastCtrl.create({
      message: `Password is required`,
      duration: 3000,
    });
    await toast.present();
  }
}
