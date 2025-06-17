import { Platform } from 'react-native';
import { TCommonData } from '../types/utils';

export const env = __DEV__ || Platform.OS == 'android' ? 'test' : 'prod';

export let CommonData: TCommonData = {
  userData: null,
  navigation: null,
  bankid_api_env: env,
};
