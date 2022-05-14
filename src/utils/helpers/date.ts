import {
  addMilliseconds as fnsAddMilliseconds,
  addDays as fnsaddDays,
  getUnixTime as fnsGetUnixTime,
  isDate as fnsIsDate,
  parseISO as fnsParseISO,
} from 'date-fns';
import ms from 'ms';

export default (() => {
  const parseISO = (date: DateCtx) =>
    typeof date === 'string' ? fnsParseISO(date) : date;

  const toDate = (date: DateCtx) => parseISO(date);

  const toMs = (input: string): number => ms(input);

  const toUnix = (date?: DateCtx): number =>
    fnsGetUnixTime(
      date && fnsIsDate(new Date(date)) ? parseISO(date) : new Date(),
    );

  const addMillisecondToDate = (date?: DateCtx, amount?: number): Date =>
    fnsAddMilliseconds(
      date && fnsIsDate(new Date(date)) ? parseISO(date) : new Date(),
      amount || 0,
    );

  const addDayToDate = (date?: DateCtx, amount?: number) =>
    fnsaddDays(
      date && fnsIsDate(new Date(date)) ? parseISO(date) : new Date(),
      amount || 0,
    );

  return {
    toDate,
    parseISO,
    toMs,
    toUnix,
    addMillisecondToDate,
    addDayToDate,
  };
})();
