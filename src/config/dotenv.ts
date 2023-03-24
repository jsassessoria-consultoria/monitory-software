import path from 'path';
import dotenv from 'dotenv';
import { app } from 'electron';

const setEnv = () => {
  dotenv.config({
    path: path.join(app.getAppPath(), '.env')
  });
};

export default setEnv;
