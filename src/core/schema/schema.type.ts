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

export const EMAIL_SCHEMA = {
  email: {
    type: 'string',
    format: 'email',
    transform: ['trim', 'toLowerCase'],
  },
} as { [key: string]: JSONSchemaCustom };

export const ORDER_ID_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    id: {
      type: 'string',
      enum: SORT,
      transform: ['toUpperCase'],
    },
  },
} as JSONSchemaCustom;

export const ORDER_CREATED_AT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    createdAt: {
      type: 'string',
      enum: SORT,
      transform: ['toUpperCase'],
    },
  },
} as JSONSchemaCustom;
