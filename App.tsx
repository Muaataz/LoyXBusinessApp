import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/shared/store/store';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider } from './src/shared/hooks/themeContext';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Dimensions, Linking, View, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import { CrossIcon, ErrorIcon, SuccessIcon } from './src/shared/components/SvgIcon';
import { hasDynamicIsland } from 'react-native-device-info';
import { Typography } from './src/shared/utils/typography';

const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  // success: (props: any) => (
  //   <BaseToast
  //     {...props}
  //     style={{ borderLeftColor: 'green' }}
  //     contentContainerStyle={{ paddingHorizontal: 15 }}
  //     text1Style={{
  //       fontSize: 15,
  //       fontWeight: '400',
  //     }}
  //   />
  // ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  // error: (props: any) => (
  //   <ErrorToast
  //     {...props}
  //     text1Style={{
  //       fontSize: 17,
  //     }}
  //     text2Style={{
  //       fontSize: 15,
  //     }}
  //   />
  // ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  error: ({ text1, text2 }: any) => (
    <View
      style={{
        // height: 60,
        padding: 16,
        marginTop: hasDynamicIsland() ? 10 : 0,
        width: Dimensions.get('screen').width - 20,
        backgroundColor: 'white',
        borderColor: '#E60000',
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ErrorIcon />
      <View style={{ flex: 1, paddingLeft: 14, paddingRight: 10 }}>
        <Text
          style={{
            ...Typography.CustomText,
            fontSize: 14,
            fontWeight: '600',
            color: '#222222',
          }}
        >
          {text1}
        </Text>
        {!!text2 && (
          <Text
            style={{
              ...Typography.CustomText,
              fontSize: 12,
              fontWeight: '500',
              color: '#222222',
            }}
          >
            {text2}
          </Text>
        )}
      </View>
      <CrossIcon
        onPress={() => {
          Toast.hide();
        }}
        width={24}
        height={24}
      />
    </View>
  ),

  success: ({ text1, text2 }: any) => (
    <View
      style={{
        // height: 60,
        padding: 16,
        marginTop: hasDynamicIsland() ? 10 : 0,
        width: Dimensions.get('screen').width - 20,
        backgroundColor: 'white',
        borderColor: '#089c14',
        borderWidth: 1,
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SuccessIcon />
      <View style={{ flex: 1, paddingLeft: 14, paddingRight: 10 }}>
        <Text
          style={{
            ...Typography.CustomText,
            fontSize: 14,
            fontWeight: '600',
            color: '#222222',
          }}
        >
          {text1}
        </Text>
        {!!text2 && (
          <Text
            style={{
              ...Typography.CustomText,
              fontSize: 12,
              fontWeight: '500',
              color: '#222222',
            }}
          >
            {text2}
          </Text>
        )}
      </View>
      <CrossIcon
        onPress={() => {
          Toast.hide();
        }}
        width={24}
        height={24}
      />
    </View>
  ),
};

const App = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <Provider store={store}>
          <AppNavigator />
        </Provider>
        <Toast config={toastConfig} />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
