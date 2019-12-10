import { Component } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss']
})
export class CalendarPage {
  date: any;
  week = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  daysInThisMonth: any;
  daysInLastMonth: any;
  daysInNextMonth: any;
  monthNames: string[];
  currentMonth: any;
  currentYear: any;
  currentDate: any;
  event = { title: '', location: '', message: '', startDate: '', endDate: '' };

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    private calendar: Calendar
  ) {}

  ionViewWillEnter() {
    this.date = new Date();
    this.monthNames = [
      'Janvier',
      'Février',
      'Mars',
      'Avril',
      'Mai',
      'Juin',
      'Juillet',
      'Août',
      'Septembre',
      'Octobre',
      'Novembre',
      'Décembre'
    ];
    this.getDaysOfMonth();
  }

  save() {
    this.calendar
      .createEvent(
        this.event.title,
        this.event.location,
        this.event.message,
        new Date(this.event.startDate),
        new Date(this.event.endDate)
      )
      .then(
        m => console.log('ok')
        /*     msg => {
          let alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Event saved successfully',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.pop();
        },
        err => {
          let alert = this.alertCtrl.create({
            title: 'Failed!',
            subTitle: err,
            buttons: ['OK']
          });
          alert.present();
        } */
      );
  }

  onEvent(e) {
    console.log(e);
  }

  getDaysOfMonth() {
    this.daysInThisMonth = new Array();
    this.daysInLastMonth = new Array();
    this.daysInNextMonth = new Array();
    this.currentMonth = this.monthNames[this.date.getUTCMonth()];
    this.currentYear = this.date.getFullYear();
    if (this.date.getUTCMonth() === new Date().getUTCMonth()) {
      this.currentDate = new Date().getDate();
    } else {
      this.currentDate = 999;
    }

    var firstDayThisMonth =
      new Date(this.date.getFullYear(), this.date.getUTCMonth(), 1).getDay() || 7 - 1;
    var prevNumOfDays = new Date(this.date.getFullYear(), this.date.getUTCMonth(), 0).getDate();
    for (var i = prevNumOfDays - (firstDayThisMonth - 1); i <= prevNumOfDays; i++) {
      this.daysInLastMonth.push(i);
    }

    var thisNumOfDays = new Date(this.date.getFullYear(), this.date.getUTCMonth() + 1, 0).getDate();
    for (var i = 0; i < thisNumOfDays; i++) {
      this.daysInThisMonth.push(i + 1);
    }

    var lastDayThisMonth =
      new Date(this.date.getFullYear(), this.date.getUTCMonth() + 1, 0).getDay() || 7 - 1;
    var nextNumOfDays = new Date(this.date.getFullYear(), this.date.getUTCMonth() + 2, 0).getDate();
    for (var i = 0; i < 6 - lastDayThisMonth; i++) {
      this.daysInNextMonth.push(i + 1);
    }
    var totalDays =
      this.daysInLastMonth.length + this.daysInThisMonth.length + this.daysInNextMonth.length;
    if (totalDays < 36) {
      for (var i = 7 - lastDayThisMonth; i < 7 - lastDayThisMonth + 7; i++) {
        this.daysInNextMonth.push(i);
      }
    }
  }

  goToLastMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getUTCMonth(), 0);
    this.getDaysOfMonth();
  }

  goToNextMonth() {
    this.date = new Date(this.date.getFullYear(), this.date.getUTCMonth() + 2, 0);
    this.getDaysOfMonth();
  }

  /*   collapseCard: boolean;
  viewTitle = '';
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  minDate = new Date().toISOString();

  eventSource = [];

  calendar = {
    mode: 'week',
    currentDate: new Date()
  }; */

  /*   @ViewChild(CalendarComponent, { static: false }) myCalendar: CalendarComponent;

  constructor(private _alertCtrl: AlertController, @Inject(LOCALE_ID) private _locale: string) {} */

  /* ngOnInit() {
    this.resetEvent();
  }

  ionViewWillEnter() {
    this.collapseCard = true;
  }

  addEvent() {
    let eventCopy = {
      title: this.event.title,
      desc: this.event.desc,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      allDay: this.event.allDay
    };
    if (eventCopy.allDay) {
      const start = eventCopy.startTime;
      const end = eventCopy.startTime;
      eventCopy.startTime = new Date(
        Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())
      );
      eventCopy.endTime = new Date(
        Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1)
      );
    }
    this.eventSource.push(eventCopy);
    this.myCalendar.loadEvents();
    this.resetEvent();
  }

  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false
    };
  }

  changeMode(mode) {
    this.calendar.mode = mode;
  }

  back() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next() {
    const swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today() {
    this.calendar.currentDate = new Date();
  }

  async onEventSelected(event) {
    const start = formatDate(event.startTime, 'medium', this._locale);
    const end = formatDate(event.endTime, 'medium', this._locale);

    const alert = await this._alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: `De: ${start} <br><br>A: ${end}`,
      buttons: ['OK']
    });
    alert.present();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    const selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = selected.toISOString();
  } */
}
