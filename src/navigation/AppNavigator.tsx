import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../features/auth/screens/SplashScreen';
import {RootStackParamList} from '../shared/types/navigation';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../shared/hooks/themeContext';
import ScanBrandQR from '../features/auth/screens/ScanBrandQR';
import ScanQRResponse from '../features/auth/screens/ScanQRResponse';
import QrDataTransaction from '../features/auth/screens/QrDataTransaction';
import NoWifi from '../shared/components/NoWifi';
import PurchaseScreen from '../features/auth/screens/ProductList';
import SelectProductScreen from '../features/auth/screens/SelectProductScreen';
import LoginScreen from '../features/auth/screens/LoginScreen';
import PhoneScreen from '../features/auth/screens/PhoneScreen';
import PhoneVerificationScreen from '../features/auth/screens/PhoneVerificationScreen';
import LandingScreen from '../features/auth/screens/LandingScreen';

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

const screenOption: any = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {duration: 600, easing: easeOutExpo},
    },
    close: {
      animation: 'timing',
      config: {duration: 600, easing: easeOutExpo},
    },
  },
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const {theme} = useTheme();

  return (
    <NavigationContainer>
      <View style={{flex: 1}}>
        <Stack.Navigator
          screenOptions={screenOption}
          initialRouteName="LandingScreen">
          <Stack.Screen
            name="Phone"
            component={PhoneScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PhoneVerification"
            component={PhoneVerificationScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LandingScreen"
            component={LandingScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="ScanBrandQR"
            component={ScanBrandQR}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="PurchaseScreen"
            component={PurchaseScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SelectProductScreen"
            component={SelectProductScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ScanQRResponse"
            component={ScanQRResponse}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QrDataTransaction"
            component={QrDataTransaction}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
        <NoWifi />
      </View>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({
  tabIcon: {height: 24, width: 24, marginTop: 5},
});
