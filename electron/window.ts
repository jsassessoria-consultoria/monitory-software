import path from 'path';
import { BrowserWindow } from 'electron';
import callCron from '../src/services/callCron';
import createTray from './tray';

function createWindow(TOKEN: string) {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, './preloader.js')
    },
    icon: path.join(path.dirname(__dirname), 'assets', 'icon.png'),
    autoHideMenuBar: true,
    show: TOKEN ? false : true
  });
  mainWindow.webContents.openDevTools();
  console.log(TOKEN);
  if (TOKEN) {
    callCron();
  }
  createTray(TOKEN);
  mainWindow.loadFile('public/index.html');
  return mainWindow;
}

export default createWindow;
