import { exec } from 'child_process';

export const openProcess = async () => {
  return new Promise<void>((resolve, reject) => {
    exec(
      'start explorer.exe',
      { shell: 'cmd.exe' },
      (error, stdout, stderr) => {
        setTimeout(() => {
          resolve();
        }, 2000);
      }
    );
  });
};

export const closeProcess = async () => {
  return new Promise<void>((resolve, reject) => {
    exec(
      'taskkill /fi explorer.exe',
      { shell: 'cmd.exe' },
      async (error, stdout, stderr) => {
        // const higherPIDS = findHigherPids(stdout);
        // for (const PID of higherPIDS) {
        // await closeProcessess(PID);
        // }
        setTimeout(() => {
          resolve();
        }, 2000);
      }
    );
  });
};
