import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addKeywords from 'ajv-keywords';
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { JSONSchema7 } from 'json-schema';

import { MiddlewareCore } from '@core/index';
import { IJsonSchema } from '@core/schema';
import { capitalize, CodeResponse, Role } from '@utils/index';

class ValidateMiddleware extends MiddlewareCore {
  protected ajv: Ajv;

  constructor() {
    super();

    this.ajv = new Ajv({
      allErrors: true,
      coerceTypes: true,
      useDefaults: true,
    });
    addFormats(this.ajv);
    addKeywords(this.ajv, ['transform', 'uniqueItemProperties']);
    this.ajv.addFormat('phone', /^\+[0-9]*/);
  }

  private async validate(
    schema: JSONSchema7,
    data: Record<string, unknown>,
  ): Promise<void> {
    const validate = this.ajv.compile(schema);

    return new Promise((resolve, reject) => {
      if (!validate(data) && validate.errors) {
        const errors: { [key: string]: string } = {};

        validate.errors.forEach((err) => {
          errors[
            (err.params.missingProperty as string) ||
              (err.params.additionalProperty as string) ||
              err.instancePath.slice(1)
          ] = capitalize(err.message || '');
        });
        reject(errors);
      } else {
        resolve();
      }
    });
  }

  /**
   * Handler
   *
   * @returns {Function}
   */
  handler(schemas: IJsonSchema): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const role = req?.currentUser?.role || Role.USER;

        const params = schemas?.params[role] || schemas.params;
        const query = schemas?.query[role] || schemas.query;
        const body = schemas?.body[role] || schemas.body;

        await this.validate(params, req.params);
        await this.validate(query, req.query);
        await this.validate(body, req.body);
        next();
      } catch (errors) {
        res.status(422).json({
          ...CodeResponse.UNPROCESSABLE_ENTITY,
          errors,
        });
      }
    };
  }
}

export default new ValidateMiddleware();
