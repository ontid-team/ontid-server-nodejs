import { expect } from 'chai';

import { AppConfig } from '../../../src/config/index';
import {
  getHashName,
  generateToken,
  verifyToken,
  isArray,
  isObject,
  snakeToCamelCase,
  convertSnakeToCamelCaseInObject,
} from '../../../src/utils/helpers';

type JWT = {
  userId: number;
  email: string;
  jwtid: string;
  iat: number;
  exp: number;
};

describe('GetHashName Function Test', () => {
  it('Should return 948c77e6653bcbea', () => {
    const name = getHashName('HasName - file');

    expect(name).to.be.eq('948c77e6653bcbea');
    expect(name).to.be.a('string');
  });
});

describe('VerifyToken Function Test', () => {
  let token = '';
  const payloadBody = {
    userId: 10,
    email: 'info@ontid.com',
  };

  before(() => {
    token = generateToken(payloadBody);
  });

  it('Should return', async () => {
    const data = await verifyToken<JWT>(token, AppConfig.secret);

    expect(data).to.be.an('object');
    expect(data).to.have.all.keys('userId', 'email', 'jwtid', 'iat', 'exp');

    expect(data.email).to.be.eq(payloadBody.email);
    expect(data.email).to.be.a('string');

    expect(data.userId).to.be.eq(payloadBody.userId);
    expect(data.userId).to.be.a('number');
  });
});

describe('isArray Function Test', () => {
  it('Should return - true', async () => {
    const data = isArray(['test', 'test']);

    expect(data).to.be.true;
  });

  it('Should return - false', async () => {
    const data = isArray('true');

    expect(data).to.be.false;
  });

  it('Should return - false', async () => {
    const data = isArray({ test: 'test' });

    expect(data).to.be.false;
  });
});

describe('isObject Function Test', () => {
  it('Should return - true', async () => {
    const data = isObject({ test: 'test' });

    expect(data).to.be.true;
  });

  it('Should return - false', async () => {
    const data = isObject('true');

    expect(data).to.be.false;
  });

  it('Should return - false', async () => {
    const data = isObject([{ test: 'test' }]);

    expect(data).to.be.false;
  });
});

describe('snakeToCamelCase Function Test', () => {
  it('Should return - oneToOne', async () => {
    const data = snakeToCamelCase('one_to_one');

    expect(data).to.be.eq('oneToOne');
  });

  it('Should return - oneToOne', async () => {
    const data = snakeToCamelCase('one-to_one');

    expect(data).to.be.eq('oneToOne');
  });

  it('Should return - oneToOne', async () => {
    const data = snakeToCamelCase('one-to-one');

    expect(data).to.be.eq('oneToOne');
  });

  it('Should return - onetoone', async () => {
    const data = snakeToCamelCase('onetoone');

    expect(data).to.be.eq('onetoone');
  });
});

describe('convertSnakeToCamelCaseInObject Function Test', () => {
  it('Should return - { userId: 1, profile: { firstName: "FirstName", lastName: "LastName" }}', async () => {
    const query = {
      user_id: 1,
      profile: { first_name: 'FirstName', last_name: 'LastName' },
    };
    const data = convertSnakeToCamelCaseInObject(query);

    expect(data).to.be.an('object');
    expect(data).to.deep.own.include({
      userId: 1,
      profile: { firstName: 'FirstName', lastName: 'LastName' },
    });
  });

  it('Should return - [{ userId: 1, profile: { firstName: "FirstName", lastName: "LastName" }}]', async () => {
    const query = [
      {
        user_id: 1,
        profile: { first_name: 'FirstName', last_name: 'LastName' },
      },
    ];
    const data = convertSnakeToCamelCaseInObject(query);

    expect(data).to.be.an('array');
    expect(data).to.deep.own.include({
      userId: 1,
      profile: { firstName: 'FirstName', lastName: 'LastName' },
    });
  });

  it('Should return - firstName', async () => {
    const query = 'firstName';
    const data = convertSnakeToCamelCaseInObject(query);

    expect(data).to.be.a('string');
  });
});
