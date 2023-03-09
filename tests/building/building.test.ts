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

describe('Fase 1 - Building', () => {
  it('should transpile ts to js', async () => {
    const buildPath = path.join(process.cwd(), 'dist/app.js');

    await executor('npm run build:ts');
    const existFile = fs.existsSync(buildPath);

    expect(existFile).toBe(true);
  });

  it('Should create task-install.exe inside assets/', async () => {
    const buildPath = path.join(
      process.cwd(),
      'assets/task-install.exe'
    );

    await executor('npm run create:install');
    const existFile = fs.existsSync(buildPath);

    expect(existFile).toBe(true);
  });

  it('Should create task-uninstall.exe inside assets/', async () => {
    const buildPath = path.join(
      process.cwd(),
      'assets/task-uninstall.exe'
    );

    await executor('npm run create:uninstall');
    const existFile = fs.existsSync(buildPath);

    expect(existFile).toBe(true);
  });

  it('Should create a folder build/ with bundle.js inside', async () => {
    const buildPath = path.join(process.cwd(), 'build/bundle.js');

    await executor('npm run build:ts');
    await executor('npm run build:webpack');
    const existFile = fs.existsSync(buildPath);

    expect(existFile).toBe(true);
  });

  it('Should create a folder build/ with bundle.js inside', async () => {
    const buildPath = path.join(process.cwd(), 'build/bundle.js');

    await executor('npm run build:ts');
    await executor('npm run build:webpack');
    const existFile = fs.existsSync(buildPath);

    expect(existFile).toBe(true);
  });

  it('Folder buid/ should contain the same files of assets, except the .jsons and js/ folder', async () => {
    const buildPath = path.join(process.cwd(), 'build/');
    const assetsPath = path.join(process.cwd(), 'assets/');
    const filesInAssets = await fs.promises.readdir(assetsPath);

    await executor('npm run build:ts');
    await executor('npm run build:webpack-prepare');

    const allFileRequiredCopied = filesInAssets.every(file => {
      if (file.endsWith('.json') || file === 'js') return true;
      return fs.existsSync(path.join(buildPath, file));
    });

    expect(allFileRequiredCopied).toBe(true);
  });

  it('Should create a .exe file of bundle.js in build/ folder', async () => {
    const buildPath = path.join(process.cwd(), 'build/build.exe');

    await executor('npm run build:ts');
    await executor('npm run build:webpack-prepare');
    await executor('npm run build:app:exe');

    const fileExist = fs.existsSync(buildPath);

    expect(fileExist).toBe(true);
  });
});
