import { SqlRangeType } from '../utility-types';

export default (() => {
  const range = <T>(ctx: SqlRangeType<T>) => {
    if (!range) {
      return;
    }
    const collumn = `${ctx.alias}."${ctx.key}"`;

    if (ctx.type === 'date' || ctx.type === 'date-time') {
      if (ctx?.range?.max) {
        ctx.queryBuilder.andWhere(
          `${ctx.type === 'date' ? `DATE(${collumn})` : collumn} <= :${
            ctx.key
          }Max`,
          {
            [`${ctx.key}Max`]: ctx.range.max,
          },
        );
      }

      if (ctx?.range?.min) {
        ctx.queryBuilder.andWhere(
          `${ctx.type === 'date' ? `DATE(${collumn})` : collumn} >= :${
            ctx.key
          }Min`,
          {
            [`${ctx.key}Min`]: ctx.range.min,
          },
        );
      }

      return;
    }

    const columnABS = ctx?.abs ? `ABS(${collumn})` : collumn;

    if (ctx?.range?.max || ctx?.range?.max === 0) {
      ctx.queryBuilder.andWhere(
        `(${columnABS} <= :${ctx?.key}Max${
          ctx?.range?.max === 0 ? ` OR ${columnABS} IS NULL` : ''
        })`,
        {
          [`${ctx?.key}Max`]: ctx.range.max,
        },
      );
    }

    if (ctx?.range?.min || ctx?.range?.min === 0) {
      ctx.queryBuilder.andWhere(
        `(${columnABS} >= :${ctx?.key}Min${
          ctx?.range?.min === 0 ? ` OR ${columnABS} IS NULL` : ''
        })`,
        {
          [`${ctx.key}Min`]: ctx.range.min,
        },
      );
    }
  };

  return { range };
})();
