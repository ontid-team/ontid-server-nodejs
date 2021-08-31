import http from 'http';

import { json, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import { MediaConfig } from '@config/index';
import { MiddlewareCore, Logger } from '@core/index';
import { createFolder } from '@utils/index';

import Router from './router';

type ServerType = {
  port: number;
  initMiddleware: MiddlewareCore[];
  errorMiddleware: MiddlewareCore;
};

export default class Server {
  app!: express.Express;
  httpServer!: http.Server;
  private readonly port: number;
  private readonly initMiddleware: MiddlewareCore[];
  private readonly errorMiddleware: MiddlewareCore;

  constructor({ port, initMiddleware, errorMiddleware }: ServerType) {
    this.port = port;
    this.initMiddleware = initMiddleware;
    this.errorMiddleware = errorMiddleware;
  }

  async init(): Promise<void> {
    this.app = express();
    this.httpServer = http.createServer(this.app);
    this.createFolder();
    this.middleware();
    this.routes();
    this.addErrorHandler();

    await this.listen();
  }

  private routes(): void {
    this.app.get('/', this.basePathRoute);
    Router(this.app);
  }

  private middleware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(
      json({
        verify: (req: express.Request, _res, buf) => {
          req.rawBody = buf;
        },
      }),
    );
    this.app.use(urlencoded({ extended: false }));
    this.app.use(cookieParser());

    for (const m of this.initMiddleware) {
      try {
        m.init();
        this.app.use(m.handler());
      } catch (err) {
        // throw err;
      }
    }
  }

  private basePathRoute(_req: express.Request, res: express.Response): void {
    res.json({ message: 'base path' });
  }

  private addErrorHandler(): void {
    try {
      this.errorMiddleware.init();
      this.app.use(this.errorMiddleware.handler());
    } catch (err) {
      throw new Error('Default error middleware failed.');
    }
  }

  private createFolder(): void {
    MediaConfig.init.forEach((folder) => createFolder(folder).then());
  }

  private async listen(): Promise<void> {
    return new Promise((resolve) => {
      process.on('unhandledRejection', (reason) => {
        const error = 'Error - unhandled rejection';

        Logger.error('unhandledRejection', new Error(error), reason);
      });

      process.on('rejectionHandled', (reason) => {
        const error = 'Error - rejection handled';

        Logger.warn('rejectionHandled', new Error(error), reason);
      });

      process.on('multipleResolves', (type, promise, value) => {
        const error = 'Error - multiple resolves';

        Logger.error('multipleResolves', new Error(error), {
          type,
          promise,
          value,
        });
      });

      process.on('uncaughtException', (error) => {
        Logger.fatal('uncaughtException', error);
        process.exit(1);
      });

      return this.app.listen(this.port, () => resolve());
    });
  }
}