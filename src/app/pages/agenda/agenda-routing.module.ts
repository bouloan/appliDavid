import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendaPage } from './agenda.page';
const routes: Routes = [
  {
    path: 'tabs',
    component: AgendaPage,
    children: [
      {
        path: 'calendrier',
        loadChildren: () =>
          import('@pages/agenda/calendar/calendar.module').then(m => m.CalendarPageModule)
      },
      {
        path: 'rendez-vous',
        loadChildren: () =>
          import('@pages/agenda/appointment/appointment.module').then(m => m.AppointmentPageModule)
      },
      {
        path: 'essai',
        loadChildren: () => import('@pages/agenda/essai/essai.module').then(m => m.EssaiPageModule)
      },
      {
        path: 'calendar-detail',
        loadChildren: () =>
          import('@pages/agenda/essai/calendar-detail/calendar-detail.module').then(
            m => m.CalendarDetailPageModule
          )
      }
    ]
  },
  {
    path: '',
    redirectTo: '/agenda/tabs/calendrier',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule {}
