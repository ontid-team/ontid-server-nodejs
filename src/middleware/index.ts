import ContextMiddleware from './context.middleware';
import InitMiddleware from './init.middleware';
import LoggerMiddleware from './logger.middleware';
import MetricsMiddleware from './metrics.middleware';
import QueryMiddleware from './query.middleware';

export { default as AsyncMiddleware } from './async.middleware';
export { default as ErrorMiddleware } from './error.middleware';
export { default as PermissonMiddleware } from './permission.middleware';
export { default as UploadFileMiddleware } from './upload-file.middleware';
export { default as ValidateMiddleware } from './validate.middleware';

export default [
  MetricsMiddleware,
  InitMiddleware,
  QueryMiddleware,
  ContextMiddleware,
  LoggerMiddleware,
];
