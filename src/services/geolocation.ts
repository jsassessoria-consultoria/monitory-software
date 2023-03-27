import geolocation from '@nodert-win10-rs3/windows.devices.geolocation';
import axios from 'axios';
import { networkInterfaces } from 'os';
import logger from '../config/logger';
import { error } from '../handlers/errorHandler';

export interface IGeolocation {
  lat: string | null;
  long: string | null;
  isAccuracy: boolean | null;
}

export const getGeolocation =
  async (): Promise<IGeolocation | null> => {
    try {
      return await geolocationByDevice();
    } catch (e) {
      return await geolocationByIP();
    }
  };

export const geolocationByDevice =
  (): Promise<IGeolocation | null> => {
    const locator = new geolocation.Geolocator();
    return new Promise((resolve, reject) => {
      locator.getGeopositionAsync(function (err, res) {
        if (err) {
          console.error(err);
          reject(null);
          return;
        }
        const long = String(res.coordinate.longitude);
        const lat = String(res.coordinate.latitude);
        resolve({ lat, long, isAccuracy: true });
      });
    });
  };

export const geolocationByIP =
  async (): Promise<IGeolocation | null> => {
    const ip = getIPAddress();
    try {
      const response = await axios.get(
        `http://ip-api.com/json/${ip}`
      );
      const geolocation: IGeolocation = {
        lat: response.data.lat,
        long: response.data.lon,
        isAccuracy: false
      };
      return geolocation;
    } catch (e) {
      logger.error(error.COLLECT_LOCATION_EMPTY(e));
      const geolocationNulled: IGeolocation = {
        lat: null,
        long: null,
        isAccuracy: null
      };
      return geolocationNulled;
    }
  };

export function getIPAddress() {
  const interfaces = networkInterfaces();
  for (const devName in interfaces) {
    const iface = interfaces[devName];

    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (
        alias.family === 'IPv6' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal &&
        alias.scopeid === 0
      )
        return alias.address;
    }
  }
  return '0.0.0.0';
}
