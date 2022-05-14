import { ConfigCore } from '@core';
import { ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST } from '@utils';

class AppConfig extends ConfigCore {
  readonly domain: string;
  readonly env: string;
  readonly host: string;
  readonly name: string;
  readonly port: number;
  readonly storage: string;

  constructor() {
    super();

    this.env = this.set<string>(
      'NODE_ENV',
      this.joi.string().valid(ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST),
      ENV_DEVELOPMENT,
    );

    this.name = this.set<string>('APP_NAME', this.joi.string().required(), '');

    this.port = this.set<number>(
      'APP_PORT',
      this.joi.number().port().required(),
      5757,
    );

    this.host = this.set<string>(
      'APP_HOST',
      this.joi.string().required(),
      'http://localhost',
    );

    this.domain = this.set<string>(
      'APP_DOMAIN',
      this.joi.string().required(),
      'localhost',
    );

    this.storage = this.set<string>(
      'APP_STORAGE',
      this.joi.string().required(),
      null,
    );
  }
}

export default new AppConfig();
