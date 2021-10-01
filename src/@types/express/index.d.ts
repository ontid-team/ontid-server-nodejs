type CurrentUser = {
  userId: number;
  email: string;
  role: string;
};

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
    currentUser: CurrentUser;
    params: any;
    rawBody: Buffer;
  }
}
