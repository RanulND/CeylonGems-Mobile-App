import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeviceEventEmitter} from 'react-native';

export const getRefreshToken = () => AsyncStorage.getItem('CR_' + encode('refresh_token'));

export const setRefreshToken = (token) => AsyncStorage.setItem('CR_' + encode('refresh_token'), token);

export const getAccessToken = () => AsyncStorage.getItem('CR_' + encode('access_token'));

export const setAccessToken = (token) => {
  AsyncStorage.setItem('CR_' + encode('access_token'), token);
  DeviceEventEmitter.emit('user-change');
};

export const removeTokens = () => AsyncStorage.multiRemove(['CR_' + encode('access_token'), 'CR_' + encode('refresh_token')]);

const encode = (token) => token.split('').map(c => c.charCodeAt(0)).map(n => (n + 10).toString(16)).join('');