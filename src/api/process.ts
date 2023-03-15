import { IProcessByDay } from '../services/read';
import instance from './axios';

const sendProcesses = async (processes: string[]) => {
  await instance.post('/collect', {
    processes: processes
  });
};

const sendLostProcesses = async (processesByDay: IProcessByDay) => {
  await instance.post('/recover', processesByDay);
};

export { sendProcesses, sendLostProcesses };
