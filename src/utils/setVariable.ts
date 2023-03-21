import { execSync } from 'node:child_process';
import logger from '../config/logger';
import { error } from '../handlers/errorHandler';

const createTokenVar = (TOKEN: string) => {
  try {
    execSync(`setx ODS_SAURON_TOKEN ${TOKEN} /m`);
  } catch (e) {
    logger.info(error.CREATE_TOKEN_ENV(e));
  }
};

export { createTokenVar };
