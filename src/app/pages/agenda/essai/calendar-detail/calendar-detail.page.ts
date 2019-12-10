import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calendar } from '@ionic-native/calendar/ngx';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.page.html',
  styleUrls: ['./calendar-detail.page.scss']
})
export class CalendarDetailPage implements OnInit {
  filterValue = '';
  pageTitle: string;
  events = [];
  currentTime: any;
  constructor(
    private _calendar: Calendar,
    private _plt: Platform,
    private _route: ActivatedRoute
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.currentTime = moment().format('dddd, MMMM Do YYYY');
    console.log(this.currentTime);
    this._route.params.subscribe(params => {
      if (this._plt.is('ios')) {
        this.pageTitle = 'Liste des Rendez-vous';
        this._calendar.findAllEventsInNamedCalendar('boulord.anthony@gmail.com').then(data => {
          this.events = data;
        });
      } else if (this._plt.is('android')) {
        this.pageTitle = 'Rendez-vous des 31 prochains jours';
        let start = new Date();
        let end = new Date();
        end.setDate(end.getDate() + 365);
        this._calendar.listEventsInRange(start, end).then(data => {
          /*    console.log(data); */
          this.events = data;
        });
      }
    });
  }

  segmentChanged(event) {
    this.filterValue = event.detail.value;
  }
}
