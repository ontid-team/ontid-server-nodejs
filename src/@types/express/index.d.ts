type Context = {
  pagination: {
    page: number;
    limit: number;
    skip: number;
  };
  order: { [key: string]: string };
};
declare namespace Express {
  export interface Request {
    ctx: Context;
    params: any;
    rawBody: Buffer;
  }
}
