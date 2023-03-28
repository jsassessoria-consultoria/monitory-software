import fs from 'fs';
import path from 'path';
import { jest } from '@jest/globals';
import * as writeFile from '../../src/services/write';
import * as appPaths from '../../src/utils/paths';
import * as factory from '../factory/unit/writefile_delete';

describe('writeBackupFilePath', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    factory.deleteTmpFolder();
  });

  it('should write processes to a backup file', () => {
    const filename = '2023-03-27.txt';
    const filePath = path.join(process.cwd(), 'tmp');
    const mockedFullPath = `${filePath}\\${filename}`;
    jest
      .spyOn(writeFile, 'fileName')
      .mockImplementationOnce(() => filename);
    jest
      .spyOn(appPaths, 'backupPath')
      .mockImplementationOnce(() => filePath);

    const processes = ['process1', 'process2', 'process3'];

    writeFile.writeBackupFilePath(processes);

    let cont = 0;
    const interval = setInterval(() => {
      if (fs.existsSync(mockedFullPath) || cont >= 4) {
        expect(fs.existsSync(mockedFullPath)).toBe(true);

        const fileContent = fs.readFileSync(mockedFullPath, {
          encoding: 'utf-8'
        });
        const fileProcesses = fileContent.trim().split('\n');
        expect(fileProcesses).toEqual(processes);
        clearInterval(interval);
      }
      cont++;
    }, 1000);
  });
});
