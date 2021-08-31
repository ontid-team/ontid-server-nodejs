import { OpUnitType } from 'dayjs';

export type TimeOption = {
  type?: 'startOf' | 'endOf';
  unit?: OpUnitType;
  subtract?: {
    amount: number;
    unit: OpUnitType;
  };
  add?: {
    amount: number;
    unit: OpUnitType;
  };
};
