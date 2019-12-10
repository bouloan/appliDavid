import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AppointmentPage } from './appointment.page';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: AppointmentPage }])
  ],
  declarations: [AppointmentPage, MapComponent],
  entryComponents: [MapComponent]
})
export class AppointmentPageModule {}
