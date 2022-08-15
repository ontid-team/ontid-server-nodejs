import crypto from 'crypto';
import { mkdir } from 'fs';

import { AppConfig } from '@config';

export const create = async (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    mkdir(path, { recursive: true }, (err) => {
      if (err) {
        return reject(err);
      }

      return resolve(path);
    });
  });
};

export const getHashName = (name: string): string => {
  const nameHash = crypto.createHash('md5').update(name).digest('hex');

  return nameHash.slice(0, Math.round(nameHash.length / 2));
};

export const generateStorage = (name?: string): string => {
  if (name && !/(http(s?)):\/\//i.test(name)) {
    return `${AppConfig.storage}/${name}`;
  }

  return name || '';
};
