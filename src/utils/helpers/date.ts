import {
  addMilliseconds as fnsAddMilliseconds,
  getUnixTime as fnsGetUnixTime,
  isDate as fnsIsDate,
  parseISO as fnsParseISO,
  addDays as fnsaddDays,
} from 'date-fns';
import ms from 'ms';

export const parseISO = (date: DateCtx) =>
  typeof date === 'string' ? fnsParseISO(date) : date;

export const toDate = (date: DateCtx) => parseISO(date);

export const toMs = (input: string): number => ms(input);

export const toUnix = (date?: DateCtx): number =>
  fnsGetUnixTime(
    date && fnsIsDate(new Date(date)) ? parseISO(date) : new Date(),
  );

export const addMillisecondToDate = (date?: DateCtx, amount?: number): Date =>
  fnsAddMilliseconds(
    date && fnsIsDate(new Date(date)) ? parseISO(date) : new Date(),
    amount || 0,
  );

export const addDayToDate = (date?: DateCtx, amount?: number) =>
  fnsaddDays(
    date && fnsIsDate(new Date(date)) ? parseISO(date) : new Date(),
    amount || 0,
  );
