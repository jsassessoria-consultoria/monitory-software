import instance from './axios';

const sendProcesses = async (processes: string[]) => {
  await instance.post('/collect', {
    processes: processes
  });
};

export { sendProcesses };
