import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import utc from 'dayjs/plugin/utc';

import { TIME_FORMAT } from './time.constant';
import { TimeOption } from './time.type';

class TimeService {
  private readonly time: typeof dayjs;

  constructor() {
    dayjs.extend(isoWeek);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(utc);

    this.time = dayjs;
  }

  getTimeUNIX(date: Date | string): number {
    return this.time(date).utc().unix();
  }

  getDateToFormat(date: Date | string, format = TIME_FORMAT): string {
    return this.time(date).utc().format(format);
  }

  getISOWeekDay(date: Date | string): number {
    return this.time(date).utc().isoWeekday();
  }

  getDate(date: Date | string): Date {
    return this.time(date).utc().toDate();
  }

  getISOString(date: Date | string): string {
    return this.time(date).utc().toISOString();
  }

  getDiff(
    startDate: Date | string,
    endDate?: Date | string,
    options?: TimeOption['unit'],
  ): number {
    return this.time(startDate).diff(this.time(endDate), options || 'hour');
  }

  getIsBefore(startDate: Date | string, endDate: Date | string): boolean {
    return this.time(startDate).isBefore(endDate);
  }

  getIsSameOrBefore(startDate: Date | string, endDate: Date | string): boolean {
    return this.time(startDate).isSameOrBefore(endDate);
  }

  convertDate(value?: Date | string, option?: TimeOption): Date {
    let date = this.time(value).utc();

    if (option?.type === 'startOf') {
      date = date.startOf(option?.unit || 'day');
    } else if (option?.type === 'endOf') {
      date = date.endOf(option?.unit || 'day');
    }

    if (option?.subtract) {
      date = date.subtract(option.subtract.amount, option.subtract.unit);
    }

    if (option?.add) {
      date = date.add(option.add.amount, option.add.unit);
    }

    return date.toDate();
  }
}

export default new TimeService();
