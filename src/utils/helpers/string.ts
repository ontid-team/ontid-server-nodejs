export const capitalize = (s: string): string => {
  if (typeof s !== 'string') {
    return '';
  }

  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const isArray = (
  input: Record<string, unknown> | Record<string, unknown>[] | unknown,
): input is Record<string, unknown>[] => {
  return Array.isArray(input);
};

export const isObject = (
  obj: Record<string, unknown> | Record<string, unknown>[] | unknown,
): obj is Record<string, unknown> => {
  return (
    obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
  );
};

export const snakeToCamelCase = (str: string): string =>
  str.replace(/([-_][a-z])/g, (group) =>
    group.toUpperCase().replace('-', '').replace('_', ''),
  );

export const convertSnakeToCamelCaseInObject = (
  input: Record<string, unknown> | Record<string, unknown>[] | unknown,
) => {
  if (isObject(input)) {
    return Object.keys(input).reduce((acc, key) => {
      return Object.assign(acc, {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        [snakeToCamelCase(key)]: convertSnakeToCamelCaseInObject(input[key]),
      });
    }, {});
  }

  if (isArray(input)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return input.map((i) => convertSnakeToCamelCaseInObject(i));
  }

  return input;
};

export const sortByDate = (a: Date, b: Date) => a.getTime() - b.getTime();

export const sortByKey = (a: { name: string }, b: { name: string }) =>
  a?.name?.localeCompare(b?.name);

export const getJobIdOfQueue = (id: string | number, jobName: string) => {
  return `${id}-${jobName}`;
};

export const replate = (
  str: string,
  keys: { [key: string]: string | number },
  delimiter = ['{', '}'],
): string => {
  Object.keys(keys).forEach((key) => {
    if (delimiter && delimiter[0] && delimiter[1]) {
      str = str.replaceAll(
        `${delimiter[0]}${key}${delimiter[1]}`,
        `${keys[key] || ''}`,
      );
    }
  });

  return str;
};
