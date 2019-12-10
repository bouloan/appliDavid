import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgCalendarModule } from 'ionic2-calendar';
import { CalendarPage } from './calendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    RouterModule.forChild([{ path: '', component: CalendarPage }])
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
