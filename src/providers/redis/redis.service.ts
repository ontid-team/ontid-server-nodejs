import { RedisClient } from 'redis';

import { RedisConfig } from '@config/index';
import { Logger } from '@core/index';
import { responseError, HttpExceptionType } from '@utils/index';

class RedisService {
  private readonly redisClient: RedisClient;

  constructor() {
    this.redisClient = new RedisClient({
      host: RedisConfig.host,
      port: RedisConfig.port,
    });
    this.init();
  }

  private init() {
    Logger.info(`${this.constructor.name} initialized...`);
  }

  get time(): number {
    return RedisConfig.time;
  }

  /**
   * Get data
   *
   * @param key
   */
  get(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, value) => {
        if (err) {
          Logger.error(`${this.constructor.name} - get`, err);

          return reject(responseError(HttpExceptionType.EXTERNAL));
        }

        if (value) {
          return resolve(value);
        }

        return resolve('');
      });
    });
  }

  /**
   * Set data
   *
   * @param key
   * @param value
   */
  set(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.redisClient.setex(key, this.time, JSON.stringify(value), (err) => {
        if (err) {
          Logger.error(`${this.constructor.name} - get`, err);

          return reject(responseError(HttpExceptionType.EXTERNAL));
        }

        return resolve();
      });
    });
  }

  /**
   * Remove data
   *
   * @param key
   */
  del(key: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.redisClient.del(key, (err) => {
        if (err) {
          Logger.error(`${this.constructor.name} - get`, err);

          return reject(responseError(HttpExceptionType.EXTERNAL));
        }

        return resolve();
      });
    });
  }
}

export default new RedisService();
