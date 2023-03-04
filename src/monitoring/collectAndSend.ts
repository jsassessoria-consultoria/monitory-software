import collectProcesses from '../services/collect';
import { sendProcesses } from '../api/process';

//TODO: recolocar a request
const collect = (timer: number) => {
  setTimeout(async () => {
    const processes = await collectProcesses();
    console.log(processes);
    await sendProcesses(processes);
    collect(timer);
  }, timer);
};

export default collect;
