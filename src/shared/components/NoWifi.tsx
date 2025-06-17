import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { RFValue } from 'react-native-responsive-fontsize';
import { Easing } from 'react-native-reanimated';
import { hasDynamicIsland } from 'react-native-device-info';
import { useNetInfo } from '@react-native-community/netinfo';
import { useTheme } from '../hooks/themeContext';
import { NoWifiIcon } from './SvgIcon';
import Button from './Button';
import { Typography } from '../utils/typography';

const { width } = Dimensions.get('screen');

const NoWifi = () => {
  const [isVisible, setVisible] = useState(false);
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const { type, isConnected } = useNetInfo();

  useEffect(() => {
    setTimeout(() => {
      if (isConnected == false) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }, 2000);
  }, [isConnected]);
 

  return (
    <Modal
      isVisible={isVisible}
      // onBackdropPress={() => setIsVisible(false)}
      style={styles.modal}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      animationInTiming={500} // Smooth open animation
      animationOutTiming={1000} // Smooth close animation
      useNativeDriver
      useNativeDriverForBackdrop
      easing={Easing.out(Easing.exp)} // Apply easing for smooth effect
    >
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: hasDynamicIsland() ? 30 : RFValue(30, 850),
          }}
        >
          <NoWifiIcon />
          <Text style={styles.title}>No internet connection</Text>

          <Text style={styles.description}>
            Something went wrong. Try refreshing the{'\n'}page or checking your
            internet connection.
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            // marginTop: 30,
            marginHorizontal: RFValue(16, 850),
            marginBottom: hasDynamicIsland() ? 10 : RFValue(30, 850),
            paddingBottom: hasDynamicIsland() ? 20 : 0,
          }}
        >
          <Button
            testID="acceptRequestButton"
            accessibilityLabel="acceptRequestButton"
            onPress={() => {
              //   onSubmit(true);
            }}
            style={{ marginBottom: 0 }}
            text={'Try again'}
          />
        </View>
      </View>
    </Modal>
  );
};

export default NoWifi;

const createStyles = (theme: any) =>
  StyleSheet.create({
    modal: {
      justifyContent: 'flex-end',
      margin: 0,
    },
    container: {
      width: '100%',
      height: Dimensions.get('screen').height,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      ...Typography.CustomText,
      color: theme.colors.primaryBlack,
      fontSize: RFValue(22, 850),
      fontWeight: '700',
      marginTop: RFValue(20, 850),
      marginBottom: RFValue(36, 850),
    },
    description: {
      ...Typography.CustomText,
      color: theme.colors.primaryBlack,
      fontSize: RFValue(16, 850),
      fontWeight: '400',
      textAlign: 'center',
    },
    button: {
      width: width * 0.9,
      padding: 15,
      borderRadius: 50,
      alignItems: 'center',
      marginBottom: 10,
    },
    buttonText: {
      fontSize: RFValue(16, 850),
      fontWeight: '600',
    },
    outlineButton: {
      borderWidth: 1,
      borderColor: '#000',
    },
    rejectText: {
      fontSize: RFValue(14, 850),
      color: '#666',
      textDecorationLine: 'underline',
      marginTop: 10,
    },
  });
