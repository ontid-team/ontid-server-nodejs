export interface IFileService {
  uploadThumbnail(file: string): Promise<string>;
}
