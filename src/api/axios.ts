import axios from 'axios';
import { tokenHandler } from '../handlers/tokenHandler';

const URL = process.env.API_URL;
const instance = axios.create({
  baseURL: URL
});

export default instance;
