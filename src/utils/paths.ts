import path from 'path';
import globals from '../../config/globals';

const backupPath = () => {
  let filePath: string = path.join(
    globals.__deployAbsolutePath(),
    'tmp'
  );
  if (process.env.NODE_ENV !== 'production') {
    filePath = path.join(path.dirname(__dirname), '..', 'tmp');
  }

  return filePath;
};

export { backupPath };
