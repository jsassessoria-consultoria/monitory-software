import fs from 'fs';
import path from 'path';
import { jest } from '@jest/globals';
import * as readFile from '../../src/services/read';
import * as factory from '../factory/unit/writefile_delete';
import * as appPaths from '../../src/utils/paths';
import logger from '../../src/config/logger';
import { error } from '../../src/handlers/errorHandler';

describe('readBackupFiles', () => {
  //   let readdirSpy: jest.SpyInstance;
  //   let createReadStreamSpy: jest.SpyInstance;

  beforeEach(() => {
    factory.deleteTmpFolder();
  });

  afterEach(() => {
    factory.deleteTmpFolder();
  });

  //   afterEach(() => {
  //     readdirSpy.mockRestore();
  //     createReadStreamSpy.mockRestore();
  //   });

  it('should return null when no files are available', async () => {
    jest
      .spyOn(readFile, 'getFilesAvailables')
      .mockImplementationOnce(() => Promise.resolve([]));

    const result = await readFile.readBackupFiles();

    expect(result).toBeNull();
  });

  it('should read all backup files and parse their contents', async () => {
    const filename = '2023-03-27.txt';
    const filePath = path.join(process.cwd(), 'tmp');
    jest
      .spyOn(readFile, 'getFilesAvailables')
      .mockImplementationOnce(() => Promise.resolve([filename]));
    jest
      .spyOn(appPaths, 'backupPath')
      .mockImplementationOnce(() => filePath);

    const expectfileContent = [
      'chome.exe',
      'code.exe',
      'terminal.exe'
    ];

    await factory.createAndWriteFile(
      expectfileContent,
      filePath,
      filename
    );
    const result = await readFile.readBackupFiles();

    expect(result).not.toBeNull();
    const expectedProcessesByDay: readFile.IProcessByDay = {
      '2023-03-27': expectfileContent
    };
    expect(result?.processesByDay).toEqual(expectedProcessesByDay);
  });

  it('should handle errors during file reading', async () => {
    const filename = '2023-03-27.txt';
    const filePath = path.join(process.cwd(), 'tmp');
    jest
      .spyOn(readFile, 'getFilesAvailables')
      .mockImplementationOnce(() => Promise.resolve([filename]));
    jest
      .spyOn(appPaths, 'backupPath')
      .mockImplementationOnce(() => filePath);

    const expectfileContent = [
      'chome.exe',
      'code.exe',
      'terminal.exe'
    ];

    await factory.createAndWriteFile(
      expectfileContent,
      filePath,
      filename
    );

    jest
      .spyOn(readFile, 'getFilesAvailables')
      .mockImplementationOnce(() =>
        Promise.resolve(['2022-03-24.txt'])
      );
    jest
      .spyOn(readFile, 'readFile')
      .mockImplementationOnce(() => Promise.reject());
    const loggerSpy = jest.spyOn(logger, 'error');
    const errorSpy = jest.spyOn(error, 'BACKUP_READ');

    const result = await readFile.readBackupFiles();
    console.log(result);

    expect(result).toBeNull();
    expect(loggerSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });
});
