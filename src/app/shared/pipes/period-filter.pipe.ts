import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'periodFilter'
})
export class PeriodFilterPipe implements PipeTransform {
  today = new Date();
  todayUTC = new Date(
    Date.UTC(
      this.today.getUTCFullYear(),
      this.today.getUTCMonth(),
      this.today.getUTCDate(),
      this.today.getUTCHours() + 2,
      this.today.getUTCMinutes(),
      this.today.getUTCSeconds()
    )
  );

  transform(value: any, period: string): any {
    if (value.length === 0) {
      return value;
    }
    if (period) {
      const resultArray = [];
      for (const item of value) {
        const date = new Date(item.dtstart);
        // console.log(this.condition(date, period));
        if (this.condition(date, period)) {
          resultArray.push(item);
        }
      }
      // console.log(resultArray);
      return resultArray;
    }
  }

  condition(date, period) {
    if (period === 'today') {
      return (
        date.getUTCFullYear() === this.todayUTC.getUTCFullYear() &&
        date.getUTCMonth() === this.todayUTC.getUTCMonth() &&
        date.getUTCDate() === this.todayUTC.getUTCDate()
      );
    } else if (period === 'week') {
      console.log(this.todayUTC.toISOString(), date);
      /*  console.log(
        date.getUTCFullYear(),
        this.todayUTC.getUTCFullYear(),
        date.getUTCMonth(),
        this.todayUTC.getMonth(),
        date.getUTCDate(),
        this.todayUTC.getUTCDate(),
        date.getUTCDate(),
        this.todayUTC.getUTCDate() + 7
      ); */
      return (
        date.getUTCFullYear() === this.todayUTC.getUTCFullYear() &&
        date.getUTCMonth() === this.todayUTC.getUTCMonth() &&
        date.getUTCDate() >= this.todayUTC.getUTCDate() &&
        date.getUTCDate() <= this.todayUTC.getUTCDate() + 7
      );
    }
  }
}
