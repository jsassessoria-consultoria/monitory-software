import collectProcesses from './services/collect';
import { sendProcesses } from './api/process';

const keywords = ['code.exe'];

const interval = (timer: number) => {
  setTimeout(async () => {
    const processes = await collectProcesses(keywords);
    await sendProcesses(processes);
    interval(timer);
  }, timer);
};

interval(10000);
