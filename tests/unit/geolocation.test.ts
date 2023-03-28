import axios from 'axios';
import { jest } from '@jest/globals';
import logger from '../../src/config/logger';
import { IGeolocation } from '../../src/services/geolocation';
import * as geolocation from '../../src/services/geolocation';

import { error } from '../../src/handlers/errorHandler';

describe('getGeolocation', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  test('should return a valid geolocation when obtained through device', async () => {
    // Mock the geolocationByDevice function to return a known value
    const mockDeviceGeolocation: IGeolocation = {
      lat: '51.5074',
      long: '0.1278',
      isAccuracy: true
    };
    jest
      .spyOn(geolocation, 'geolocationByDevice')
      .mockImplementation(() =>
        Promise.resolve(mockDeviceGeolocation)
      );

    const result = await geolocation.getGeolocation();

    expect(result).toEqual(mockDeviceGeolocation);
  });

  test('should return a valid geolocation when obtained through IP address', async () => {
    jest
      .spyOn(geolocation, 'geolocationByDevice')
      .mockImplementation(() => Promise.reject());

    // Mock the axios.get method to return a known value
    const mockAxiosResponse = {
      data: {
        lat: '51.5074',
        lon: '0.1278'
      }
    };
    jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.resolve(mockAxiosResponse));

    const result = await geolocation.getGeolocation();

    const expectedGeolocation: IGeolocation = {
      lat: '51.5074',
      long: '0.1278',
      isAccuracy: false
    };
    expect(result).toEqual(expectedGeolocation);
  });

  test('should return null when geolocation cannot be obtained', async () => {
    // Mock both geolocationByDevice and geolocationByIP to reject with null
    jest
      .spyOn(geolocation, 'geolocationByDevice')
      .mockImplementation(() => Promise.reject());
    jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.reject());

    const mockRejectIPGeolocation: IGeolocation = {
      lat: null,
      long: null,
      isAccuracy: null
    };
    const result = await geolocation.getGeolocation();

    expect(result).toEqual(mockRejectIPGeolocation);
  });

  it('should log data geolocation in case of error', async () => {
    // Mock geolocationByDevice and axios.get inside geolocationByIP to throw
    jest
      .spyOn(geolocation, 'geolocationByDevice')
      .mockImplementation(() => Promise.reject());
    jest
      .spyOn(axios, 'get')
      .mockImplementation(() => Promise.reject());

    const loggerSpy = jest.spyOn(logger, 'error');
    const errorSpy = jest.spyOn(error, 'COLLECT_LOCATION_EMPTY');

    await geolocation.getGeolocation();

    expect(loggerSpy).toHaveBeenCalled();
    expect(errorSpy).toHaveBeenCalled();
  });
});
