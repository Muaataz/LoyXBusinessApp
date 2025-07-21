import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useTheme} from '../../../shared/hooks/themeContext';
import FastImage from 'react-native-fast-image';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonData} from '../../../shared/utils/utils';

const LandingScreen = ({navigation}: any) => {
  const {theme} = useTheme();

  const styles = createStyles(theme);

  useEffect(() => {
    EncryptedStorage.getItem('companyData').then(data => {
      if (data) {
        const response: any = JSON.parse(data);
        CommonData.userData = response;
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Splash'}],
          });
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Phone'}],
          });
        }, 1000);
      }
    });
  });

  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor={'black'} barStyle="light-content" /> */}
      {/* <Animated.Image
        source={require('../../../assets/images/LoyX.png')}
        style={[styles.Img, { transform: [{ scale: scaleAnim }] }]}
      /> */}
      <FastImage
        source={require('../../../assets/images/LB.png')}
        resizeMode="contain"
        style={[styles.Img]}
      />
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    Img: {
      width: '50%',
      height: '100%',
      resizeMode: 'contain',
    },
    logoContainer: {
      alignItems: 'center',
    },
    logo: {
      width: 100,
      height: 100,
      backgroundColor: '#3498db',
      borderRadius: 50,
    },
    logoText: {
      // marginTop: 20,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
  });

export default LandingScreen;
