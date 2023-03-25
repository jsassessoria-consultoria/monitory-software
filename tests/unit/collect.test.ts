import * as collect from '../../src/services/collect';
import * as factory from '../factory/unit/process_create';
import { error } from '../../src/handlers/errorHandler';
import { jest } from '@jest/globals';
import logger from '../../src/config/logger';

describe('collectProcesses', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should return an array with one process', async () => {
    jest
      .spyOn(collect, 'getWindowsProcesses')
      .mockImplementation(() => Promise.resolve(['explorer.exe']));
    const processes = await collect.collectProcesses();
    expect(processes.at(0)).toEqual('explorer.exe');
  });

  it('should throw if getWindowsProcesses throws', async () => {
    jest
      .spyOn(collect, 'getWindowsProcesses')
      .mockImplementation(() => Promise.reject());
    const spyError = jest
      .spyOn(error, 'COLLECT_DATA')
      .mockImplementationOnce(() => null);

    await collect.collectProcesses();

    expect(spyError).toBeCalled();
  });

  it('should return processes with .exe extension', async () => {
    await factory.openProcess();
    const processes = await collect.collectProcesses();
    expect(processes.every(p => p.endsWith('.exe'))).toBe(true);
  });

  it('should return at least one process', async () => {
    await factory.openProcess();

    const processes = await collect.collectProcesses();
    expect(processes.length).toBeGreaterThan(0);
  });

  it('should log data collection', async () => {
    const loggerSpy = jest.spyOn(logger, 'info');
    await collect.collectProcesses();
    expect(loggerSpy).toHaveBeenCalledWith(
      expect.stringContaining('Data Collected')
    );
  });

  it('should log verbose data', async () => {
    jest
      .spyOn(collect, 'getWindowsProcesses')
      .mockImplementation(() => Promise.resolve(['explorer.exe']));
    const loggerSpy = jest.spyOn(logger, 'verbose');
    await collect.collectProcesses();
    expect(loggerSpy).toHaveBeenCalledWith(
      expect.arrayContaining(['explorer.exe'])
    );
  });
});
