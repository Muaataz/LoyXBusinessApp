import EncryptedStorage from 'react-native-encrypted-storage';
import apiClient from '../../../shared/utils/apiClient';
import {CommonData} from '../../../shared/utils/utils';

export const getScanData = async (user_id: string) => {
  const response: any = await apiClient.get(
    `/api/v1/loyx-business-app/loyalty/check-membership/${CommonData?.userData?.company_id}/${user_id}`,
  );
  return response;
};

export const doScanData = async (user_id: string, amount: number) => {
  const response: any = await apiClient.post(
    `/api/v1/loyx-business-app/loyalty/register-purchase`,
    {
      user_id: user_id,
      company_id: CommonData?.userData?.company_id,
      amount: amount,
    },
  );
  return response;
};

export const getProductList = async () => {
  const response: any = await apiClient.get(
    `/api/v1/loyx-business-app/products/${CommonData?.userData?.company_id}`,
  );
  return response;
};

export const updateProductList = async (user_id: string, lines: any) => {
  const params = {
    user_id: user_id,
    company_id: CommonData?.userData?.company_id,
    lines: lines,
  };
  console.log('params = ', JSON.stringify(params));
  const response: any = await apiClient.post(
    `/api/v1/loyx-business-app/loyalty/register-purchase`,
    params,
  );
  return response;
};

export const sendCodeToVerify = async (phone_number: string) => {
  const response: any = await apiClient.get(
    `/api/v1/loyx-business-app/signin/${phone_number}`,
  );
  return response;
};

export const getToken = async (): Promise<string | null> => {
  try {
    const tokenData = await EncryptedStorage.getItem('authToken');
    if (tokenData) {
      const {token} = JSON.parse(tokenData);
      return token;
    }
    return null;
  } catch (error) {
    console.error('Error fetching token:', error);
    return null;
  }
};
