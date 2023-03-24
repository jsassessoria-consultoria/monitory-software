import geolocation from '@nodert-win10-rs3/windows.devices.geolocation';
import axios from 'axios';
import { networkInterfaces } from 'os';
import logger from '../config/logger';
import { error } from '../handlers/errorHandler';

export interface IGeolocation {
  lat: number;
  long: number;
  isAccuracy: boolean;
}

const getGeolocation = async (): Promise<IGeolocation | null> => {
  try {
    return await geolocationByDevice();
  } catch (e) {
    return await geolocationByIP();
  }
};

const geolocationByDevice = (): Promise<IGeolocation | null> => {
  const locator = new geolocation.Geolocator();
  return new Promise((resolve, reject) => {
    locator.getGeopositionAsync(function (err, res) {
      if (err) {
        console.error(err);
        reject(null);
        return;
      }
      const long = res.coordinate.longitude;
      const lat = res.coordinate.latitude;
      resolve({ lat, long, isAccuracy: true });
    });
  });
};

const geolocationByIP = async (): Promise<IGeolocation | null> => {
  const ip = getIPAddress();
  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    const geolocation: IGeolocation = {
      lat: response.data.lat,
      long: response.data.lon,
      isAccuracy: false
    };
    return geolocation;
  } catch (e) {
    logger.error(error.COLLECT_LOCATION_EMPTY(e));
    return null;
  }
};

function getIPAddress() {
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

export { getGeolocation };
