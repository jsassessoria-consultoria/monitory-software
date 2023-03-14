import fs from 'fs';
import path from 'path';
import { backupPath } from '../utils/paths';

const checkFolderExistence = (
  filePath: string,
  filename: string
) => {
  if (!fs.existsSync(path.join(filePath, filename))) {
    fs.mkdirSync(filePath, { recursive: true });
  }
  return path.join(filePath, filename);
};

const writeFile = (stream: fs.WriteStream, processes: string[]) => {
  stream.write(processes.join('\n') + '\n');
  stream.end();
};

const fileName = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const date = `${year}-${month}-${day}`;

  return date.concat('.txt'); //Data atual "AAAA-MM-DD"
};

const writeBackupFilePath = (processes: string[]) => {
  const filePath = backupPath();
  const filename = fileName();
  const fullPath = checkFolderExistence(filePath, filename);

  const wstream = fs.createWriteStream(fullPath, {
    flags: 'a'
  });
  writeFile(wstream, processes);
};

export default writeBackupFilePath;
