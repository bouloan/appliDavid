import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendaPage } from './agenda.page';

@NgModule({
  imports: [IonicModule, CommonModule, AgendaRoutingModule],
  declarations: [AgendaPage]
})
export class AgendaPageModule {}
