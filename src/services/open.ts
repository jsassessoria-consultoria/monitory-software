import { exec } from 'child_process';

const open = (URL: string) => {
  exec(
    process.platform
      .replace('darwin', 'xdg-open')
      .replace('win32', 'start')
      .concat(' ', URL)
  );
};

export default open;
