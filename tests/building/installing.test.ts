import { exec } from 'child_process';
import fs from 'fs';
import util from 'util';
const executor = util.promisify(exec);
import globals from '../../config/globals.js';

beforeAll(async () => {
  await executor('npm run build:restore');
});

afterEach(async () => {
  await executor('npm run build:restore');
  if (fs.existsSync(globals.__deployAbsolutePath())) {
    await executor(
      `cmd.exe /c start ${globals.__deployAbsolutePath()}\\service-uninstall.exe && exit`
    );
    await executor(`rm -rf ${globals.__deployAbsolutePath()}`);
  }
});

describe('Fase 3 - Installing', () => {
  it('Should create a project folder in C:ProgramData, installing and start the service', async () => {
    await executor('npm run deploy:start');
    await executor(`cmd.exe /c start ods_sauron_sftw.exe`);
    const appPath = globals.__deployAbsolutePath();

    const fileExist = fs.existsSync(appPath);
    expect(fileExist).toBe(true);

    await expect(
      executor(`sc query ${globals.__serviceName}`)
    ).resolves.not.toThrowError();
  });
});
