import { ConfigCore } from '@core/index';
import { ENV_DEVELOPMENT, ENV_PRODUCTION, ENV_TEST } from '@utils/index';

class AppConfig extends ConfigCore {
  readonly env: string;
  readonly name: string;
  readonly port: number;
  readonly host: string;
  readonly storage: string;
  readonly secret: string;
  readonly secretExpiresIn: string;

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
      5656,
    );
    this.host = this.set<string>(
      'APP_HOST',
      this.joi.string().required(),
      'http://localhost',
    );
    this.secret = this.set<string>(
      'APP_SECRET',
      this.joi.string().required(),
      'localhost',
    );
    this.secretExpiresIn = this.set<string>(
      'APP_SECRET_EXPIRES_IN',
      this.joi.string().required(),
      '1h',
    );
    this.storage = this.set<string>(
      'APP_STORAGE',
      this.joi.string().required(),
      null,
    );
  }
}

export default new AppConfig();
