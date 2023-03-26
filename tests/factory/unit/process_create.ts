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

// const closeProcessess = async (PID: number) => {
//   return new Promise<void>((resolve, reject) => {
//     exec(
//       `taskkill /F /PID ${PID}`,
//       { shell: 'cmd.exe' },
//       (error, stdout, stderr) => {
//         resolve();
//       }
//     );
//   });
// };

// const findHigherPids = (string: string) => {
//   // separa a saída por linha
//   const lines = string.trim().split('\n');
//   const PIDS = lines.map(line => {
//     const topics = line.split(',');
//     return Number(topics?.at(1).replaceAll('"', ''));
//   });

//   const minorPID = PIDS.reduce(
//     (value, pid) => (pid <= value ? pid : value),
//     Infinity
//   );
//   return PIDS.filter(pid => pid != minorPID);
// };
