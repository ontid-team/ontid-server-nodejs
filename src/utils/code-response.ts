import { HttpExceptionType, IHttpException } from './utility-types';

export const CodeResponse = {
  [HttpExceptionType.OK]: {
    message: 'Ok',
    status: 200,
    code: HttpExceptionType.OK,
  },
  [HttpExceptionType.SENT_SMS]: {
    message: 'Code sent to phone',
    status: 200,
    code: HttpExceptionType.SENT_SMS,
  },
  [HttpExceptionType.VERIFIED_EMAIL]: {
    message: 'Your email is verified',
    status: 200,
    code: HttpExceptionType.VERIFIED_EMAIL,
  },
  [HttpExceptionType.WRONG_EMAIL_CONFIRM_TOKEN]: {
    message: 'Confirm email token is not registered. Probably it already used',
    status: 400,
    code: HttpExceptionType.WRONG_EMAIL_CONFIRM_TOKEN,
  },
  [HttpExceptionType.BAD_REQUEST]: {
    message: 'Bad Request',
    status: 400,
    code: HttpExceptionType.BAD_REQUEST,
  },
  [HttpExceptionType.INVALID_CREDENTIALS]: {
    message: 'Invalid credentials',
    status: 400,
    code: HttpExceptionType.INVALID_CREDENTIALS,
  },
  [HttpExceptionType.EMPTY_EMAIL]: {
    message: 'Empty email is not allowed. Please fill the email',
    status: 400,
    code: HttpExceptionType.EMPTY_EMAIL,
  },
  [HttpExceptionType.TOKEN_VERIFY]: {
    message: 'Token verify error',
    status: 400,
    code: HttpExceptionType.TOKEN_VERIFY,
  },
  [HttpExceptionType.PARSE_TOKEN]: {
    message: 'Trying get data from access token. Something wrong',
    status: 401,
    code: HttpExceptionType.PARSE_TOKEN,
  },
  [HttpExceptionType.TOKEN_EXPIRED]: {
    message: 'Token expired',
    status: 401,
    code: HttpExceptionType.TOKEN_EXPIRED,
  },
  [HttpExceptionType.TOKEN_MALFORMED]: {
    status: 401,
    code: HttpExceptionType.TOKEN_MALFORMED,
    message: 'Trying get data from token. Something wrong',
  },
  [HttpExceptionType.FORBIDDEN]: {
    message: 'Forbidden',
    status: 403,
    code: HttpExceptionType.FORBIDDEN,
  },
  [HttpExceptionType.NOT_FOUND]: {
    message: 'Not found',
    status: 404,
    code: HttpExceptionType.NOT_FOUND,
  },
  [HttpExceptionType.ROUTE_NOT_FOUND]: {
    message: 'Route not found',
    status: 404,
    code: HttpExceptionType.ROUTE_NOT_FOUND,
  },
  [HttpExceptionType.USER_ALREADY_TAKEN]: {
    message: 'This email or phone already taken, try use another',
    status: 409,
    code: HttpExceptionType.USER_ALREADY_TAKEN,
  },
  [HttpExceptionType.UNPROCESSABLE_ENTITY]: {
    message: 'Validation Failed',
    status: 422,
    code: HttpExceptionType.UNPROCESSABLE_ENTITY,
  },
  [HttpExceptionType.LIMIT_FILE_IMAGE_SIZE]: {
    message:
      'This file is too large to upload. The maximum supported file sizes are: 5 MB.',
    status: 500,
    code: HttpExceptionType.LIMIT_FILE_IMAGE_SIZE,
  },
  [HttpExceptionType.FILE_FORMAT]: {
    message: 'Wrong file format',
    status: 500,
    code: HttpExceptionType.FILE_FORMAT,
  },
  [HttpExceptionType.EXTERNAL]: {
    message: 'External service error',
    status: 500,
    code: HttpExceptionType.EXTERNAL,
  },
  [HttpExceptionType.SERVER_ERROR]: {
    message: 'Server error occurred',
    status: 500,
    code: HttpExceptionType.SERVER_ERROR,
  },
  [HttpExceptionType.DB_ERROR]: {
    message: 'DB error',
    status: 500,
    code: HttpExceptionType.DB_ERROR,
  },
} as Record<HttpExceptionType, IHttpException>;
