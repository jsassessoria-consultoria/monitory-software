import path from 'path';
import { Menu, nativeImage, Tray } from 'electron';
import createWindow from './window';
import { app } from 'electron';

function createTray(TOKEN: string) {
  const icon = path.join(
    app.getAppPath(),
    'assets',
    'electron-icon.png'
  ); // required.
  const trayicon = nativeImage.createFromPath(icon);
  const tray = new Tray(trayicon.resize({ width: 16 }));
  return tray;
}
export default createTray;
