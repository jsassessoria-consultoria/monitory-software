import { app, BrowserWindow, ipcMain } from 'electron';
import setEnv from './config/dotenv';
setEnv();

import callCron from './services/callCron';
import createWindow from '../electron/window';
import { tokenHandler } from './handlers/tokenHandler';

let mainWindow: BrowserWindow;
app.whenReady().then(() => {
  ipcMain.handle('close', (event, token) => {
    if (token) {
      tokenHandler.setToken(token);
      mainWindow.hide();
      callCron();
    }
  });

  ipcMain.handle('errors', (event, errors) => {
    console.log(JSON.parse(errors));
  });
  if (process.platform === 'win32')
    mainWindow = createWindow(tokenHandler.getToken());

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
