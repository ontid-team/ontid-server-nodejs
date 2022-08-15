import {
  ID_SCHEMA,
  IJsonSchema,
  ORDER_CREATED_AT_SCHEMA,
  ORDER_ID_SCHEMA,
  PAGE_SCHEMA,
} from '@core/schema';

export const GetListUserSchema: IJsonSchema = {
  params: { type: 'object', maxProperties: 0 },
  query: {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    additionalProperties: true,
    properties: {
      ...PAGE_SCHEMA,
      order: {
        anyOf: [ORDER_ID_SCHEMA, ORDER_CREATED_AT_SCHEMA],
      },
    },
  },
  body: { type: 'object', maxProperties: 0 },
};

export const GetOneUserSchema: IJsonSchema = {
  params: ID_SCHEMA,
  query: { type: 'object', maxProperties: 0 },
  body: { type: 'object', maxProperties: 0 },
};
