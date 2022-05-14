type Id = {
  id: number;
};

type DateInfo = {
  createdAt: Date;
  updatedAt: Date;
};

type DateCtx = string | number | Date;

type HttpExceptionType = {
  code: string;
  message: string;
  status: number;
};

type OrderType = 'ASC' | 'DESC';

type Meta = {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number;
  prevPage: number;
  totalItems: number;
  totalPages: number;
};

type Page = { count: number; limit: number; page: number };

type ResponseData<T> = {
  data: T;
  meta?: Meta;
};
