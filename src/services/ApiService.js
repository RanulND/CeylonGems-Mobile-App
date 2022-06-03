import ax from 'axios';
import { REACT_APP_BASE_URL } from '../../env.config';

const axios = ax.create({
    baseURL: REACT_APP_BASE_URL,
    headers: {
        'content-Type': 'application/json'
    }
});

export default axios;