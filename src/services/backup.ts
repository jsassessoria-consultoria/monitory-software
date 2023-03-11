import fs from 'fs';
import path from 'path';
import globals from '../../config/globals';

const writeBackupFile = (processes: string[]) => {
  let filePath = globals.__deployAbsolutePath();
  if (process.env.NODE_ENV !== 'production') {
    filePath = path.join(path.dirname(__dirname), '..');
  }
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = `${year}-${month}-${day}`;
  console.log(date);
  const datedProcesses = {};
  datedProcesses[date] = processes;
  console.log(datedProcesses);
  fs.writeFileSync(
    path.join(filePath, 'teste.txt'),
    JSON.stringify(datedProcesses).concat('\n'),
    {
      flag: 'a'
    }
  );
};

export default writeBackupFile;
