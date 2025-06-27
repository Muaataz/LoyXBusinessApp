import { Platform } from 'react-native';
import { TCommonData } from '../types/utils';

export const env = __DEV__ || Platform.OS == 'android' ? 'test' : 'prod';

export let CommonData: TCommonData = {
  userData: null,
  navigation: null,
  bankid_api_env: env,
};

export const formatNumber = (value: any) => {
  const num = parseFloat(value);
  const decimalPart = num % 1;

  if (decimalPart === 0) {
    return num.toFixed(0); // No decimals
  } else if (decimalPart.toFixed(2) === decimalPart.toFixed(1)) {
    return num.toFixed(2); // Up to 2 decimals, round if necessary
  } else {
    return num.toFixed(2); // Round to 2 decimals
  }
};
