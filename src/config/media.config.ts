import { resolve } from 'path';

import { Config } from '@core/config';

class MediaConfig extends Config {
  readonly imgPathFolder: string;
  readonly storagePathFolder: string;

  constructor() {
    super();

    this.storagePathFolder = resolve(process.cwd(), 'storage');
    this.imgPathFolder = resolve(this.storagePathFolder, 'img');
  }

  get init(): string[] {
    return [this.storagePathFolder, this.imgPathFolder];
  }
}

export default new MediaConfig();
