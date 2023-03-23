import { tokenHandler } from '../handlers/tokenHandler';
import { IGeolocation } from '../services/geolocation';
import { IProcessByDay } from '../services/read';
import instance from './axios';

const sendProcesses = async (
  processes: string[],
  geolocation: IGeolocation
) => {
  await instance.post(
    '/collect',
    {
      processes: processes,
      geolocation: geolocation
    },
    {
      headers: {
        Authorization: `Bearer ${tokenHandler.getToken()}`
      }
    }
  );
};

const sendLostProcesses = async (processesByDay: IProcessByDay) => {
  await instance.post('/recover', processesByDay, {
    headers: {
      Authorization: `Bearer ${tokenHandler.getToken()}`
    }
  });
};

export { sendProcesses, sendLostProcesses };
