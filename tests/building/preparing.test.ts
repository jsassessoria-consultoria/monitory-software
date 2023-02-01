import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import util from 'util';
const executor = util.promisify(exec);

beforeAll(async () => {
  await executor('npm run build:restore');
});

afterEach(async () => {
  await executor('npm run build:restore');
});

describe('Fase 2 - Prepare to deploy', () => {
  it('Should create a .zip file of build/ folder in assets/ called build.zip', async () => {
    const zipPath = path.join(process.cwd(), 'assets/build.zip');

    await executor('npm run build:ts');
    await executor('npm run build:webpack-prepare');
    await executor('npm run deploy:zip');

    const fileExist = fs.existsSync(zipPath);

    expect(fileExist).toBe(true);
  });

  it('Should create a .exe file of containing build.zip, decompress.js and config/ folder in root dir', async () => {
    const zipPath = path.join(process.cwd(), 'monitory_sftw.exe');

    await executor('npm run build:ts');
    await executor('npm run build:webpack-prepare');
    await executor('npm run deploy:zip');
    await executor('npm run deploy:exe');

    const fileExist = fs.existsSync(zipPath);

    expect(fileExist).toBe(true);
  });
});
