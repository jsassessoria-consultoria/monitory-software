import { readAndSend } from '../monitoring/backupAndSend';
import collect from '../monitoring/collectAndSend';
import cron from 'node-cron';
import { cronExpression } from '../utils/cronExpressions';

const callCron = () => {
  cron.schedule(cronExpression.EVERY_60_SECONDS, collect); // Não retorna Erro
  cron.schedule(cronExpression.EVERY_1_HOURS, readAndSend); // Não retorna Erro
};

export default callCron;
