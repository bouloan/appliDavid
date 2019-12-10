import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private _toastController: ToastController) {}

  async presentToast(message: string) {
    const toast = await this._toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
