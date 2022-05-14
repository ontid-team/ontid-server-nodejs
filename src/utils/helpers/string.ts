export default (() => {
  const capitalize = (s: string): string => {
    if (typeof s !== 'string') {
      return '';
    }

    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const isArray = (
    input: Record<string, unknown> | Record<string, unknown>[] | unknown,
  ): input is Record<string, unknown>[] => {
    return Array.isArray(input);
  };

  const isObject = (
    obj: Record<string, unknown> | Record<string, unknown>[] | unknown,
  ): obj is Record<string, unknown> => {
    return (
      obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
    );
  };

  const snakeToCamelCase = (str: string): string =>
    str.replace(/([-_][a-z])/g, (group) =>
      group.toUpperCase().replace('-', '').replace('_', ''),
    );

  const convertSnakeToCamelCaseInObject = (
    input: Record<string, unknown> | Record<string, unknown>[] | unknown,
  ) => {
    if (isObject(input)) {
      return Object.keys(input).reduce((acc, key) => {
        return Object.assign(acc, {
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

  return {
    capitalize,
    convertSnakeToCamelCaseInObject,
  };
})();
