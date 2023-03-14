import { sendProcesses } from '../api/process';
import { error } from '../handlers/errorHandler';
import writeBackupFilePath from '../services/write';
import collectProcesses from '../services/collect';

const collect = async () => {
  let processes = [];
  try {
    processes = await collectProcesses();
    if (processes.length === 0) return error.COLLECT_DATA_EMPTY();
    await sendProcesses(processes);
  } catch (requestError) {
    writeBackupFilePath(processes);
    error.COLLECT_SEND(requestError);
  }
};

export default collect;
