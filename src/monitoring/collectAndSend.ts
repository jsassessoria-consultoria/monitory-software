import { sendProcesses } from '../api/process';
import { error } from '../handlers/errorHandler';
import writeBackupFilePath from '../services/write';
import collectProcesses from '../services/collect';
import {
  getGeolocation,
  IGeolocation
} from '../services/geolocation';

const collect = async () => {
  let processes: string[] = [];
  let geolocation: IGeolocation;
  try {
    processes = await collectProcesses();
    geolocation = await getGeolocation();
    if (processes.length === 0) return error.COLLECT_DATA_EMPTY();
    if (!geolocation) return error.COLLECT_LOCATION_EMPTY();
    await sendProcesses(processes, geolocation);
  } catch (requestError) {
    writeBackupFilePath(processes);
    error.COLLECT_SEND(requestError);
  }
};

export default collect;
