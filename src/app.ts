import collect from './monitoring/collectAndSend';
import { server } from './views/server';
import open from 'open';

const PORT = 5000;
//url da API do backend do ODS SAURON
const _API_URL = 'http://localhost:4000/register';
const _URL = `http://localhost:${PORT}`;

let TOKEN = null;

const openBrownser = async () => {
  server.start(PORT, _API_URL);
  await open(_URL);

  const checkToken = setInterval(() => {
    TOKEN = server.token();
    if (TOKEN) {
      collect(10000);
      clearInterval(checkToken);
    }
  }, 1000);
};

if (!TOKEN) {
  openBrownser();
} else {
  collect(10000);
}
