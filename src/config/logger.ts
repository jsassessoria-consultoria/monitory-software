import winston from 'winston';
import path from 'path';
import globals from './paths';

const logger = winston.createLogger({
  level: 'verbose',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
      level: 'info'
    })
  ]
});

if (
  process.env.NODE_ENV !== 'dev' &&
  process.env.NODE_ENV !== 'test'
) {
  console.log(globals.__deployAbsolutePath());
  logger.add(
    new winston.transports.File({
      filename: path.join(
        globals.__deployAbsolutePath(),
        'logs\\ERROR.log'
      ),
      level: 'error'
    })
  );
  logger.add(
    new winston.transports.File({
      filename: path.join(
        globals.__deployAbsolutePath(),
        'logs\\INFO.log'
      ),
      level: 'info'
    })
  );
  logger.add(
    new winston.transports.File({
      filename: path.join(
        globals.__deployAbsolutePath(),
        'logs\\DETAILS.log'
      ),
      level: 'verbose'
    })
  );
}

export default logger;
