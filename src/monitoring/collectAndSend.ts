import collectProcesses from '../services/collect';
import { sendProcesses } from '../api/process';
import logger from '../config/logger';

//TODO: recolocar a request
const collect = async () => {
  try {
    const processes = await collectProcesses();
    logger.verbose(processes);
    logger.info('Data collected');
    await sendProcesses(processes);
  } catch (e) {
    logger.error('Could not collect or send data');
  }
};

export default collect;
