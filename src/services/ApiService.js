/* eslint-disable no-empty */
import ax from 'axios';
import { getAccessToken, getRefreshToken, setAccessToken } from './TokenService';
import { REACT_APP_BASE_URL } from '../../env.config';

const axios = ax.create({
  baseURL: REACT_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default axios;