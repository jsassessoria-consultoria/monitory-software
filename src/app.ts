import { app, BrowserWindow, ipcMain } from 'electron';
import setEnv from './config/dotenv';
setEnv();

import callCron from './services/callCron';
import createWindow from '../electron/window';
import { createTokenVar } from './utils/setVariable';

let TOKEN: string | undefined = process.env.ODS_SAURON_TOKEN;
let mainWindow: BrowserWindow;
app.whenReady().then(() => {
  ipcMain.handle('close', (event, token) => {
    if (token) {
      TOKEN = token;
      createTokenVar(token);
      mainWindow.hide();
      callCron();
    }
  });
  if (process.platform === 'win32') mainWindow = createWindow(TOKEN);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length > 1) app.quit();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

app.on('second-instance', (event, argv, cwd) => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});
