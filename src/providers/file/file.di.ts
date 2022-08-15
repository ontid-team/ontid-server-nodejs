import { container } from 'tsyringe';

import FileService from './file.service';
import { FileInject } from './file.type';
import { IFileService } from './interface';

container.registerSingleton<IFileService>(FileInject.FILE_SERVICE, FileService);
