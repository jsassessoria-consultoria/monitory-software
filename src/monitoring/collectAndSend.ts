import collectProcesses from '../services/collect';
import { sendProcesses } from '../api/process';

const keywords = ['code.exe'];

//TODO: recolocar a request
const collect = (timer: number) => {
  setTimeout(async () => {
    const processes = await collectProcesses(keywords);
    console.log(processes);
    // await sendProcesses(processes);
    collect(timer);
  }, timer);
};

export default collect;
