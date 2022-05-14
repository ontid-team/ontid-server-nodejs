import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { JSONSchema7 } from 'json-schema';

import { MiddlewareCore, IJsonSchema } from '@core';
import { CodeResponse, Role } from '@utils';
import { StringHelper, SanitizerHelper } from '@utils/helpers';

class ValidateMiddleware extends MiddlewareCore {
  protected ajv: Ajv;

  constructor() {
    super();

    this.ajv = new Ajv({
      $data: true,
      allErrors: true,
      coerceTypes: true,
      useDefaults: true,
    });
    addFormats(this.ajv);
    addKeywords(this.ajv, ['transform', 'uniqueItemProperties']);
    this.ajv.addFormat('phone', /^\+[0-9]*/);

    this.ajv.addKeyword({
      keyword: 'sanitize',
      modifying: true,
      compile(schema) {
        return (data, dataCxt) => {
          if (
            !dataCxt?.parentDataProperty &&
            dataCxt?.parentDataProperty !== 0
          ) {
            throw new TypeError('Data must be a property of an object');
          }

          if (
            typeof schema === 'string' &&
            schema === 'escape' &&
            dataCxt?.parentData &&
            dataCxt?.parentDataProperty
          ) {
            dataCxt.parentData[dataCxt.parentDataProperty] =
              SanitizerHelper.escape(data as string);
          }

          return true;
        };
      },
      errors: false,
    });
  }

  handler(schemas: IJsonSchema): RequestHandler {
    return async (
      req: Request<Record<string, unknown>, any, Record<string, unknown>>,
      res: Response,
      next: NextFunction,
    ) => {
      try {
        const role = req?.user?.role || Role.USER;

        const params = (schemas?.params[role] || schemas.params) as JSONSchema7;
        const query = (schemas?.query[role] || schemas.query) as JSONSchema7;
        const body = (schemas?.body[role] || schemas.body) as JSONSchema7;

        await this.validate(params, req.params);
        await this.validate(query, req.query);
        await this.validate(body, req.body);
        next();
      } catch (errors) {
        res.status(422).json({
          ...CodeResponse.UNPROCESSABLE_ENTITY,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          errors,
        });
      }
    };
  }

  private async validate(
    schema: JSONSchema7,
    data: Record<string, unknown>,
  ): Promise<void> {
    const validate = this.ajv.compile(schema);

    return new Promise((resolve, reject) => {
      if (!validate(data) && validate.errors) {
        const errors: { [key: string]: string } = {};

        for (const err of validate.errors) {
          const name =
            // (err.params.missingProperty as string) ||
            // (err.params.additionalProperty as string) ||
            err.instancePath.slice(1);

          if (name) {
            errors[name] = StringHelper.capitalize(err.message || '');
          }
        }

        reject(errors);
      } else {
        resolve();
      }
    });
  }
}

export default new ValidateMiddleware();
