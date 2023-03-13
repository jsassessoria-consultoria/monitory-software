import { error } from '../handlers/errorHandler';
import { sendLostProcesses } from '../api/process';
import { readBackupFiles } from '../services/read';
import { deleteFiles } from '../services/delete';
import logger from '../config/logger';

const readAndSend = async () => {
  try {
    const event = await readBackupFiles();
    if (!event) return;
    await sendLostProcesses(event.processesByDay);
    await deleteFiles(event.files);
    logger.info('Backup sended');
  } catch (e) {
    error.BACKUP_SEND(e);
  }
};

export { readAndSend };
