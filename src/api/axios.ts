import axios from 'axios';
import setEnv from '../config/dotenv';
setEnv();

const URL = process.env.API_URL;

const instance = axios.create({
  baseURL: URL
});

export default instance;
