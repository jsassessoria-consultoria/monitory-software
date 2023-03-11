import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
const env = dotenv.config();
dotenvExpand.expand(env);

import collect from './monitoring/collectAndSend';
import { server } from './views/server';
import open from './services/open';

const PORT = +process.env.PORT;
const LOCAL_URL = process.env.LOCAL_URL;

//url da API do backend do ODS SAURON
const _API_URL = process.env.API_URL;

let TOKEN: string | null = null;

const createLoop = (timer: number) => {
  setTimeout(async () => {
    TOKEN = server.token();
    await collect();
    // if (!TOKEN && !server.isServerUp()) {
    //   server.start(PORT, _API_URL);
    //   open(LOCAL_URL);
    // } else if (TOKEN) {
    //   return createLoop(10000);
    // }
    createLoop(timer);
  }, timer);
};

createLoop(1000);
