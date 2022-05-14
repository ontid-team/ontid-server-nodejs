import { FindOneOptions, SelectQueryBuilder } from 'typeorm';

export type OptionCtx<T> = Pick<
  FindOneOptions<T>,
  'where' | 'order' | 'relations'
> & { skip?: number; take?: number };

export type FilterCtx<T> = {
  filter: Partial<T>;
};

export type Token = {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
};

export type JWT = {
  email: string;
  role: string;
  sub: string;
  userId: number;
};

export type TokenPayload = {
  email: string;
  userId: number;
};

export enum TokenType {
  BEARER = 'Bearer',
}

export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

export enum LoggerType {
  DB = 'DB',
  HTTP = 'Http',
  QUEUE = 'Queue',
  SERVER = 'Server',
}

export type LoggerCtxInfo = {
  error?: Error | any;
  info?: string | any;
  message: string;
  type?: LoggerType;
};

export type LoggerCtxError = Required<
  Pick<LoggerCtxInfo, 'message' | 'error'>
> &
  Pick<LoggerCtxInfo, 'type'>;

export enum FileName {
  AUDIO = 'audio',
  DOCS = 'docs',
  IMAGE = 'image',
  VIDEO = 'video',
}

export type RangeType = {
  max?: number | string | Date;
  min?: number | string | Date;
};

export type SqlRangeType<T> = {
  abs?: boolean;
  alias: string;
  key: string;
  queryBuilder: SelectQueryBuilder<T>;
  range?: RangeType;
  type?: 'date' | 'number' | 'date-time';
};
