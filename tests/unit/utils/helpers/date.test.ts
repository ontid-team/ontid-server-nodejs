import { assert, expect } from 'chai';

import { DateHelper } from '@utils/helpers';

describe('DateHelper.toDate - Function Test', () => {
  it('Should return - 2021-06-10T11:00:00.000Z', () => {
    const date = '2021-06-10T11:00:00.000Z';

    assert.deepEqual(DateHelper.toDate(date), new Date(Date.parse(date)));
  });

  it('Should return - 2020-12-20T18:45:00.000Z', () => {
    const date = '2020-12-21T02:45:00+08:00';

    assert.deepEqual(DateHelper.toDate(date), new Date(Date.parse(date)));
  });
});

describe('DateHelper.toUnix - Function Test', () => {
  it('Should return - 1623322800', () => {
    const date = '2021-06-10T11:00:00.000Z';

    expect(DateHelper.toUnix(date)).to.equal(1623322800);
  });

  it('Should return - 1608489900', () => {
    const date = '2020-12-21T02:45:00+08:00';

    expect(DateHelper.toUnix(date)).to.equal(1608489900);
  });
});
