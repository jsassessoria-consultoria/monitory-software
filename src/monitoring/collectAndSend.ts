import collectProcesses from '../services/collect';
import { sendProcesses } from '../api/process';
import logger from '../config/logger';
import writeBackupFile from '../services/backup';

//TODO: recolocar a request
const collect = async () => {
  try {
    const processes = await collectProcesses();
    try {
      logger.verbose(processes);
      logger.info('Data collected');
      await sendProcesses(processes);
    } catch (requestError) {
      writeBackupFile(processes);
      logger.error('Could not send data');
    }
  } catch (collectError) {
    logger.error('Could not collect data');
  }
};

export default collect;
