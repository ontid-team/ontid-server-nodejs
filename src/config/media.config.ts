import { resolve } from 'path';

import { ConfigCore } from '@core/index';

class MediaConfig extends ConfigCore {
  readonly storagePathFolder: string;
  readonly imgPathFolder: string;

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
