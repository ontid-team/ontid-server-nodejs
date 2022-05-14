import { resolve } from 'path';

import { ConfigCore } from '@core';

class MediaConfig extends ConfigCore {
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
