import axios from 'axios';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const env = dotenv.config();
dotenvExpand.expand(env);

const URL = process.env.API_URL;

const instance = axios.create({
  baseURL: URL
});

export default instance;
