import express from 'express';
import path from 'path';
import os from 'node:os';
import axios from 'axios';
import logger from '../config/logger';

let USER_TOKEN = null;
let isServerUp = false;

type RegisterBody = {
  deviceName: string;
  user: string;
};

const start = (PORT: number, API_URL: string) => {
  const app = express();

  const currentFolder = path.basename(__dirname);
  const relativeViewFolder = path.join(
    path.dirname(__dirname),
    currentFolder,
    'public'
  );

  app.use(express.static(relativeViewFolder));
  app.use(express.json());

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/data', (req, res) => {
    res
      .send({
        deviceInfo: {
          hostname: os.hostname()
        }
      })
      .status(200);
  });

  app.post('/register', async (req, res) => {
    const API_HOST = `localhost:${PORT}`;
    const requestHost = req.headers.host;
    const body: RegisterBody = req.body;

    if (requestHost !== API_HOST) {
      return res.status(401).send('Invalid Host');
    }

    try {
      const { data } = await axios.post(
        API_URL.concat('/register'),
        body
      );
      const token = data.token;
      if (!token) {
        return res.status(400).send('Please try again');
      }
      USER_TOKEN = data.token;
      res.sendStatus(201);
    } catch (error) {
      return res.status(400).send('Please try again');
    }
  });

  app.post('/close', (req, res) => {
    const API_HOST = `localhost:${PORT}`;
    const requestHost = req.headers.host;

    if (requestHost !== API_HOST) {
      res.status(401).send('Invalid Host');
    } else {
      res.sendStatus(200);
      closeServer();
    }
  });

  const server = app.listen(PORT || 4000, () => {
    logger.info(`Server is running at ${PORT}`);
    isServerUp = true;
  });

  const closeServer = () => {
    server.closeAllConnections();
    server.close(() => {
      logger.info('Servidor local desconectado');
      isServerUp = false;
    });
  };
};
export const server = {
  start,
  token: () => USER_TOKEN,
  isServerUp: () => isServerUp
};
