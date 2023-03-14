import fs from 'fs/promises';
import path from 'path';
import { error } from '../handlers/errorHandler';
import { backupPath } from '../utils/paths';

const deleteFiles = async (filesReaded: string[]) => {
  for await (const file of filesReaded) {
    const filePath = path.join(backupPath(), file);
    try {
      await fs.unlink(filePath);
    } catch (e) {
      error.BACKUP_READ_DELETE(e);
    }
  }
};

export { deleteFiles };
