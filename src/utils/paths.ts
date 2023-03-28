import path from 'path';
import globals from '../config/paths';

const backupPath = () => {
  let filePath: string = path.join(
    globals.__deployAbsolutePath(),
    'tmp'
  );
  if (
    process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'test'
  ) {
    filePath = path.join(globals.__localAbsolutePath(), 'tmp');
  }

  return filePath;
};

export { backupPath };
