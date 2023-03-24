import logger from '../config/logger';
import { UTCDate } from '../utils/UTCDate';

type IErrorMessages = keyof typeof ErrorMessages;
type IActions = keyof typeof Actions;
type ILocations = keyof typeof Locations;

type ValidErrorMessage = (typeof ErrorMessages)[IErrorMessages];
type ValidActions = (typeof Actions)[IActions];
type ValidLocations = (typeof Locations)[ILocations];

interface IERROR_FUNC {
  (
    location: ValidLocations,
    message: ValidErrorMessage,
    action?: ValidActions | ''
  ): (error?: Error | ValidErrorMessage) => void;
}

const Locations = {
  BACKUP: 'Backup',
  COLLECT: 'Collect',
  ENV: 'Environment Variable'
} as const;

const Actions = {
  GET_LOCATION: 'Collect_Location',
  GET_PROCESSES: 'Collect_Processes',
  READ_FILE: 'Read_File',
  WRITE_FILE: 'Write_File',
  DELETE_FILE: 'Delete_File',
  CREATE_ENV: 'Create_env'
} as const;

const ErrorMessages = {
  SEND: 'could not send data',
  COLLECT: 'could not collect data',
  GEOLOCATION: 'could not locate device',
  READ: 'could not read data',
  EMPTY_WINDOWS: 'No windows open yet',
  DELETE: 'could not delete file',
  CREATE: 'could not create'
} as const;

const ERROR_FUNC: IERROR_FUNC =
  (errorLocation, message, action?) => (error?) => {
    if (!action) action = '';
    if (!error) error = message;
    const date = UTCDate();
    logger.info(
      `${date} in ${errorLocation} => ${action} Error: "${message}"\n Check ERROR.log for full messages`
    );
    new Error(`${errorLocation} in  ${action} Error: ${message}`);
    logger.error(
      `${date} in ${errorLocation} => ${action} Error: ${message}\n 
      Error: ${error}`
    );
  };

export const error = {
  BACKUP_SEND: ERROR_FUNC(Locations.BACKUP, ErrorMessages.SEND),
  COLLECT_SEND: ERROR_FUNC(Locations.COLLECT, ErrorMessages.SEND),
  BACKUP_READ: ERROR_FUNC(
    Locations.BACKUP,
    ErrorMessages.READ,
    Actions.READ_FILE
  ),
  COLLECT_DATA: ERROR_FUNC(
    Locations.COLLECT,
    ErrorMessages.COLLECT,
    Actions.GET_PROCESSES
  ),
  COLLECT_DATA_EMPTY: ERROR_FUNC(
    Locations.COLLECT,
    ErrorMessages.EMPTY_WINDOWS,
    Actions.GET_PROCESSES
  ),
  COLLECT_LOCATION_EMPTY: ERROR_FUNC(
    Locations.COLLECT,
    ErrorMessages.GEOLOCATION,
    Actions.GET_LOCATION
  ),
  BACKUP_READ_DELETE: ERROR_FUNC(
    Locations.BACKUP,
    ErrorMessages.DELETE,
    Actions.DELETE_FILE
  ),
  CREATE_TOKEN_ENV: ERROR_FUNC(
    Locations.ENV,
    ErrorMessages.CREATE,
    Actions.CREATE_ENV
  )
};
