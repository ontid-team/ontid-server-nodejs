import { AppConfig } from '@config';
import db from '@db/index';
import { Logger } from '@lib';
import Middleware, { ErrorMiddleware } from '@middleware';
import { EventEmitter } from '@utils/helpers';

import Server from './server';

const server = new Server({
  port: Number(AppConfig.port),
  initMiddleware: Middleware,
  errorMiddleware: ErrorMiddleware,
});

db.connect()
  .then(() => {
    Logger.debug({ message: 'Database initialized...' });
    server
      .init()
      .then(() => {
        EventEmitter.emit('start');

        console.info('Server start initialization..');
        Logger.info({ message: 'Server start initialization..' });
      })
      .catch((error) => {
        EventEmitter.emit('close');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Logger.error({ message: 'Server fails to initialize...', error });
        process.exit(1);
      });
  })
  .catch((error) => {
    EventEmitter.emit('close');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    Logger.error({ message: 'Database fails to initialize...', error });
    process.exit(1);
  });
