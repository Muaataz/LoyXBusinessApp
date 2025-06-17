import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getToken } from '../../features/auth/services/authService';
import EncryptedStorage from 'react-native-encrypted-storage';
import { RootStackParamList } from '../types/navigation';
import { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;

// Create an Axios instance with default configuration
const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL, // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.X_API_KEY,
  },
});

// Request interceptor (e.g., to attach authorization tokens)
apiClient.interceptors.request.use(
  async (config) => {
    // You can add custom logic here, such as attaching a token
    const token = await getToken(); // Retrieve token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor (e.g., to handle errors globally)
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    console.log('api error - ', JSON.stringify(error));

    if (error.response?.status === 401) {
      // Token expired or invalid
      await EncryptedStorage.removeItem('authToken');
      const navigation = useNavigation<NavigationProp>();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      });
    } else if (error.response?.status === 400) {
      // console.log('error.response - ', error?.response?.config?.url);

      if (error?.response?.config?.url == '/api/v1/auth/verifications/verify') {
        Toast.show({
          type: 'error',
          text1: 'Ogiltig kod, vänligen försök igen',//Invalid code, please try again.
          text2: '',
          // error?.response?.data?.detail ||
          // 'Something went wrong. Try again later!',
        });
      }else{
        Toast.show({
          type: 'error',
          text1: 'Något gick fel, vänligen försök igen senare', //Something went wrong, please try again later
          text2: '',
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Något gick fel, vänligen försök igen senare', //Something went wrong, please try again later
        text2: '',
      });
    }
    return Promise.reject(error);
  },
);

export default apiClient;
