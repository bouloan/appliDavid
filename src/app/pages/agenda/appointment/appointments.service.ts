import { Injectable } from '@angular/core';
import { Appointment } from '@models/appointment.model';
import { CompanyClient } from '@models/companyClient.model';
import { Location } from '@models/location.model';
import { PrivateClient } from '@models/private-client.model';
import { BehaviorSubject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private _appointmentsList: BehaviorSubject<Appointment[]> = new BehaviorSubject([
    new Appointment(
      1,
      new Location('4 Passage Laliment, Bordeaux, Nouvelle-Aquitaine, France', 44.8411, -0.583676),
      new Date(),
      new CompanyClient('société1', 25545665555, '0658954122', 'société1@hotmail.com'),
      'pending'
    ),
    new Appointment(
      2,
      new Location(
        '238 Rue de Suzon, Talence, Nouvelle-Aquitaine, France',
        44.8116,
        -0.5766740000000254
      ),
      new Date(),
      new PrivateClient('Name1', 'firstName1', '0214557785', 'private1@hotmail.com'),
      'pending'
    ),
    new Appointment(
      3,
      new Location(
        '9 Rue Jean Raymond Guyon, Lormont, Nouvelle-Aquitaine, France',
        44.8732,
        -0.5084329999999682
      ),
      new Date(),
      new CompanyClient('société2', 25545665875, '0658754122', 'société2@hotmail.com'),
      'accepted'
    )
  ]);

  get appointmentsList() {
    return this._appointmentsList.asObservable();
  }

  getAppointment(id: number) {
    return this.appointmentsList.pipe(
      take(1),
      map(appointments => {
        return { ...appointments.find(a => a.id === id) };
      })
    );
  }

  removeAppointment(id: number) {
    const appointmentsList = this._appointmentsList.getValue();
    const newAppointmentsList = appointmentsList.filter(a => a.id !== id);
    this._appointmentsList.next(newAppointmentsList);
  }

  acceptAppointment(id: number) {
    this.modifyAppointmentStatus(id, 'accepted');
  }

  refuseAppointment(id: number) {
    this.modifyAppointmentStatus(id, 'refused');
  }

  modifyAppointmentStatus(id: number, status: string) {
    const appointmentsList = this._appointmentsList.getValue();
    const newAppointmentsList = appointmentsList.map(a => {
      if (a.id === id) a.status = status;
      return a;
    });
    this._appointmentsList.next(newAppointmentsList);
  }
}
