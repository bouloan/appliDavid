import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MapComponent } from './map/map.component';

@Component({
  selector: 'app-appointment',
  templateUrl: 'appointment.page.html',
  styleUrls: ['appointment.page.scss']
})
export class AppointmentPage {
  constructor(private _modalCtrl: ModalController) {}

  async presentMapModal() {
    const modal = await this._modalCtrl.create({ component: MapComponent });
    return await modal.present();
  }
}
