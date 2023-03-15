import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { backupPath } from '../utils/paths';
import logger from '../config/logger';
import { error } from '../handlers/errorHandler';

export type IProcessByDay = Record<string, string[]>;

const getFilesAvailables = async () => {
  try {
    const files = await fsPromise.readdir(backupPath());
    return files;
  } catch (e) {
    logger.error('Não pode encontrar os arquivos e/ou pasta "tmp"');
    return [];
  }
};

const readFile = (
  readStream: fs.ReadStream,
  date: string,
  processByDay: IProcessByDay
) => {
  return new Promise<IProcessByDay>((resolve, reject) => {
    let str = '';

    readStream.on('data', chunk => {
      str = str.concat(chunk.toString());
    });

    readStream.on('close', () => {
      const strArr = str.split('\n');
      const processes = strArr.slice(0, strArr.length - 1);
      processByDay[date] = processes;
      resolve(processByDay);
    });

    readStream.on('error', error => {
      reject(error);
    });
  });
};

const readBackupFiles = async () => {
  const files = await getFilesAvailables();
  if (files.length === 0) return null;

  let processesByDay: IProcessByDay = {};
  for await (const file of files) {
    const fileDate = file.split('.txt').at(0);
    const readStream = fs.createReadStream(
      path.join(backupPath(), file),
      { flags: 'r' }
    );
    try {
      processesByDay = await readFile(
        readStream,
        fileDate,
        processesByDay
      );
    } catch (e) {
      error.BACKUP_READ(e);
    }
  }

  return { processesByDay, files };
};

export { readBackupFiles };
