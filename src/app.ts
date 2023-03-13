import cron from 'node-cron';

import { setEnv } from '../config/dotenv';
setEnv();

import open from './services/open';
import { server } from './views/server';
import collect from './monitoring/collectAndSend';
import { readAndSend } from './monitoring/backupAndSend';
import { cronExpression } from './utils/cronExpressions';

const PORT = +process.env.PORT;
const LOCAL_URL = process.env.LOCAL_URL;
//url da API do backend do ODS SAURON
const _API_URL = process.env.API_URL;
let TOKEN: string | null = null;

const createLoop = (timer: number) => {
  const timeout = setTimeout(async () => {
    TOKEN = server.token();
    if (!TOKEN && !server.isServerUp()) {
      server.start(PORT, _API_URL);
      open(LOCAL_URL);
    }
    createLoop(timer);
  }, timer);

  if (!TOKEN) {
    cron.schedule(cronExpression.EVERY_10_SECONDS, collect); // Não retorna Erro
    cron.schedule(cronExpression.EVERY_1_HOURS, readAndSend); // Não retorna Erro
    clearTimeout(timeout);
  }
};

createLoop(1000);
