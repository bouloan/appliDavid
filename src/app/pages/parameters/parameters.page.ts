import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Platform } from '@ionic/angular';
const { Storage } = Plugins;

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.page.html',
  styleUrls: ['./parameters.page.scss']
})
export class ParametersPage implements OnInit {
  calendars = [];
  selectecCalendar: string;

  constructor(private _calendar: Calendar, private _plt: Platform) {
    this._plt.ready().then(() => {
      this._calendar.listCalendars().then(calendars => {
        this.calendars = calendars;
        console.log(this.calendars);
      });
    });
  }

  ngOnInit() {}

  onSelectCalendar(e) {
    console.log(e.detail.value);
    this.setCalendar(e.detail.value);
  }

  async setCalendar(selectedCalendar) {
    await Storage.set({
      key: 'calendar',
      value: selectedCalendar
    });
  }
}
