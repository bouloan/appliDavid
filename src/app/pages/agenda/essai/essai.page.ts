import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-essai',
  templateUrl: './essai.page.html',
  styleUrls: ['./essai.page.scss']
})
export class EssaiPage implements OnInit {
  calendars = [];
  constructor(private _router: Router, private calendar: Calendar, private plt: Platform) {
    this.plt.ready().then(() => {
      this.calendar.listCalendars().then(data => {
        console.log(data);
        this.calendars = data;
      });
    });
  }

  ngOnInit() {}

  addEvent(cal) {
    let date = new Date();
    let options = {
      calendarId: cal.id,
      calendarName: cal.name,
      url: 'anthony.boulord.com',
      firstReminderMinute: 15
    };
    this.calendar.createEventInteractivelyWithOptions(
      'My new Event',
      'Eysines',
      'some special blabla',
      date,
      date,
      options
    );
  }

  openCal(cal) {
    this._router.navigate(['/agenda/tabs/calendar-detail'], { queryParams: { name: cal.name } });
  }
}
