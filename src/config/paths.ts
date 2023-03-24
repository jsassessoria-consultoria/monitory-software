import path from 'path';
import setEnv from './dotenv';
setEnv();
import { app } from 'electron';

export = {
  __localAbsolutePath: function () {
    // C:\<User>\...\<diretorio principal>
    return app.getAppPath();
  },
  __deployAbsolutePath: function () {
    // C:\ProgramData\<__appName>
    return path.join(process.env.PROGRAMFILES, 'ODSSauron');
  },
  __executorDeployPath: function () {
    // C:\ProgramData\<__appName>\<filename>
    return path.join(
      process.env.PROGRAMFILES,
      'ODSSauron',
      'ODSSauron.exe'
    );
  }
};
