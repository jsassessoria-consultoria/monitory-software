import path from 'path';
import dotenv from 'dotenv';
import { app } from 'electron';

const setEnv = () => {
  dotenv.config();
};

export default setEnv;
