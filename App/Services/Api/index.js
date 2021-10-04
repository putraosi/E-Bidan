import axios from 'axios';
import querystring from 'qs';
import config from '../../../env';
import {getData} from '../../Helpers';

const cluster = 'staging';
const {staging, production} = config;
const api = axios.create({
  baseURL: cluster == 'production' ? production : staging,
  timeout: 20000,
  headers: {
    Accept: 'application/json',
  },
  paramsSerializer: params => querystring.stringify(params),
});

api.interceptors.request.use(async req => {
  return getData('token').then(token => {
    req.timeout = 30000;
    req.headers['Content-Type'] = 'application/json';

    if (!token) return req;
    req.headers['Authorization'] = `Bearer ${token}`;
    return req;
  });
});

export const Api = {
  post: async ({url, body, showLog}) => {
    const data = JSON.stringify(body);

    try {
      const res = await api.post(url, data);

      if (showLog) console.log('API RES', res.data);

      // if (res.data.errors) {
      //   throw res.data.errors[0];
      // }

      return res.data.data;
    } catch (error) {
      if (showLog) console.log('API ERROR', error.message);
      throw error;
    }
  },
};
