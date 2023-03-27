import { contextBridge, ipcRenderer } from 'electron';
import axios from 'axios';
import os from 'node:os';

interface IRegister {
  deviceName: string;
  user: string;
}

contextBridge.exposeInMainWorld('windowState', {
  closeWindow: (token: string) => ipcRenderer.invoke('close', token),
  error: (errors: string) => ipcRenderer.invoke('errors', errors)
});

contextBridge.exposeInMainWorld('devices', {
  name: () => os.hostname()
});

contextBridge.exposeInMainWorld('env', {
  url_api: () => process.env.API_URL
});

contextBridge.exposeInMainWorld('axios', {
  register: async (data: IRegister) => {
    const response = await axios.post(
      process.env.API_URL.concat('/device'),
      data
    );
    return response.data.data;
  }
});
