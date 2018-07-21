import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-3f1ea.firebaseio.com'
});

export default instance;