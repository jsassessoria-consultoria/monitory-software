
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import open from 'open';
import collect from './monitoring/collectAndSend';
import { server } from './views/server';

const env = dotenv.config();
dotenvExpand.expand(env);

const PORT = +process.env.PORT;
const LOCAL_URL = process.env.LOCAL_URL;

//url da API do backend do ODS SAURON
const _API_URL = process.env.API_URL;

let TOKEN = null;

const registerDevice = async () => {
  server.start(PORT, _API_URL);

  if (process.env.NODE_ENV === 'dev') {
    await open(LOCAL_URL);
  }

  const checkToken = setInterval(() => {
    TOKEN = server.token();
    if (TOKEN) {
      collect(10000);
      clearInterval(checkToken);
    }
  }, 1000);
};

if (!TOKEN) {
  registerDevice();
} else {
  collect(10000);
}

