import { FindOneOptions } from 'typeorm';

export type OptionCtx<T> = Pick<
  FindOneOptions<T>,
  'where' | 'order' | 'relations'
> & { skip?: number; take?: number };

export type FilterCtx<T> = {
  filter: Partial<T>;
};

export type Token = {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
};

export type JWT = {
  sub: string;
  email: string;
  userId: number;
  role: string;
};

export type TokenPayload = {
  keycloakId?: string;
  userId: number;
  email: string;
};

export enum Role {
  ADMIN = 'admin',
  EDITOR = 'editor',
  USER = 'user',
}

export interface IHttpException {
  message: string;
  status: number;
  code: string;
}

export enum HttpExceptionType {
  OK = 'OK',
  SENT_SMS = 'SENT_SMS',
  VERIFIED_EMAIL = 'VERIFIED_EMAIL',
  WRONG_EMAIL_CONFIRM_TOKEN = 'WRONG_EMAIL_CONFIRM_TOKEN',
  BAD_REQUEST = 'BAD_REQUEST',
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  EMPTY_EMAIL = 'EMPTY_EMAIL',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_VERIFY = 'TOKEN_VERIFY',
  PARSE_TOKEN = 'PARSE_TOKEN',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  USER_ALREADY_TAKEN = 'USER_ALREADY_TAKEN',
  UNPROCESSABLE_ENTITY = 'UNPROCESSABLE_ENTITY',
  LIMIT_FILE_SIZE = 'LIMIT_FILE_SIZE',
  EXTERNAL = 'EXTERNAL',
  SERVER_ERROR = 'SERVER_ERROR',
  DB_ERROR = 'DB_ERROR',
}
