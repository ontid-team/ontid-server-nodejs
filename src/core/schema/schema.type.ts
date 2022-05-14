import { JSONSchema7 } from 'json-schema';

import { SORT } from '@utils';

export interface JSONSchemaCustom extends JSONSchema7 {
  consumes?: string[];
  maximum?: any;
  minimum?: any;
  properties?: {
    [key: string]: JSONSchemaCustom | boolean;
  };
  transform?: string[];
}

export interface IJsonSchema {
  body: JSONSchemaCustom | { [key: string]: JSONSchemaCustom };
  params: JSONSchemaCustom;
  query: JSONSchemaCustom | { [key: string]: JSONSchemaCustom };
}

export const PAGE_SCHEMA = {
  limit: {
    type: 'integer',
    minimum: 1,
  },
  page: {
    type: 'integer',
    minimum: 0,
  },
  order: {
    type: 'object',
    properties: {
      createdAt: {
        type: 'string',
        enum: SORT,
        transform: ['toUpperCase'],
      },
    },
  },
} as { [key: string]: JSONSchemaCustom | boolean };

export const ID_SCHEMA = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  required: ['id'],
  additionalProperties: false,
  properties: {
    id: {
      type: ['integer', 'string'],
    },
  },
} as JSONSchemaCustom;
