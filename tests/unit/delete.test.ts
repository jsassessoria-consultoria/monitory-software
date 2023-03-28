import fs from 'fs';
import path from 'path';
import { jest } from '@jest/globals';
import * as deleteFile from '../../src/services/delete';
import * as appPaths from '../../src/utils/paths';
import * as factory from '../factory/unit/writefile_delete';

describe('writeBackupFilePath', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    factory.deleteTmpFolder();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    factory.deleteTmpFolder();
  });

  it('should delete files in tmp folder', async () => {
    const filenames = ['2023-03-27.txt', '2023-03-28.txt'];
    const filePath = path.join(process.cwd(), 'tmp');

    jest
      .spyOn(appPaths, 'backupPath')
      .mockImplementation(() => filePath);

    const mockedFullPath: string[] = [];
    for await (const name of filenames) {
      mockedFullPath.push(`${filePath}\\${name}`);
      await factory.createAndWriteFile(
        ['chrome.exe'],
        filePath,
        name
      );
    }

    expect(fs.existsSync(mockedFullPath[0])).toBe(true);
    expect(fs.existsSync(mockedFullPath[1])).toBe(true);

    await deleteFile.deleteFiles(filenames);

    expect(fs.existsSync(mockedFullPath[0])).toBe(false);
    expect(fs.existsSync(mockedFullPath[1])).toBe(false);
  });
});
