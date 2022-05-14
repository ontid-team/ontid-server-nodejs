import crypto from 'crypto';
import { mkdir } from 'fs';

import { AppConfig } from '@config';

export default (() => {
  const create = async (path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      mkdir(path, { recursive: true }, (err) => {
        if (err) {
          return reject(err);
        }

        return resolve(path);
      });
    });
  };

  const getHashName = (name: string): string => {
    const nameHash = crypto.createHash('md5').update(name).digest('hex');

    return nameHash.slice(0, Math.round(nameHash.length / 2));
  };

  const generateStorage = (name?: string): string => {
    if (name && !/(http(s?)):\/\//i.test(name)) {
      return `${AppConfig.storage}/${name}`;
    }

    return name || '';
  };

  return {
    create,
    getHashName,
    generateStorage,
  };
})();
