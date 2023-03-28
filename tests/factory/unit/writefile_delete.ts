import path from 'path';
import fs from 'fs';

export const createAndWriteFile = (
  processes: string[],
  filePath: string,
  filename: string
) => {
  return new Promise<void>((resolve, reject) => {
    try {
      const fullPath = `${filePath}\\${filename}`;
      fs.mkdirSync(filePath, { recursive: true });
      fs.writeFileSync(fullPath, processes.join('\n') + '\n');
      if (fs.existsSync(fullPath)) resolve();
    } catch (e) {
      reject();
    }
  });
};
export const deleteTmpFolder = () => {
  const filePath = path.join(process.cwd(), 'tmp');
  fs.rmSync(filePath, { force: true, recursive: true });
};
