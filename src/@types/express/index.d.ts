type UserContext = {
  email: string;
  role: string;
  userId?: number;
};

type Context = {
  browser?: string;
  ip?: string;
  order: { [key: string]: string };
  os?: string;
  pagination: {
    limit: number;
    page: number;
    skip: number;
  };
  role?: string;
  userAgent?: string;
};

declare namespace Express {
  export interface Request {
    ctx: Context;
    params: any;
    rawBody: Buffer;
    user: UserContext;
  }
}
