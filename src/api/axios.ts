import axios from 'axios';

const URL = 'http://localhost:4000/';

const instance = axios.create({
  baseURL: URL
});

export default instance;
