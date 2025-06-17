import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableOpacity,
  Text,
  Platform,
  AppState,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../shared/types/navigation';
import {useTheme} from '../../../shared/hooks/themeContext';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  CrossIcon,
  QrBrandFail,
  ScannerBtnQR,
} from '../../../shared/components/SvgIcon';
import {hasDynamicIsland} from 'react-native-device-info';
import {Typography} from '../../../shared/utils/typography';

const ScanQRResponse = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current.match(/active/) && nextAppState === 'background') {
        navigation.pop();
        console.log('App has gone to the background!');
        // Do something like pause tasks, stop timers, etc.
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  // useEffect(()=>{
  //   setTimeout(() => {
  //       navigation.pop()
  //   }, 10000);
  // },[])

  // return (
  //   <View style={styles.container}>
  //     <StatusBar
  //       backgroundColor={theme.colors.black}
  //       barStyle="light-content"
  //     />
  //     <Image
  //       source={require('../../../assets/images/LoyX.png')}
  //       style={styles.Img}
  //     />
  //   </View>
  // );
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      {/* <Animated.Image
        source={require('../../../assets/images/LoyX.png')}
        style={[styles.Img, { transform: [{ scale: scaleAnim }] }]}
      /> */}
      <View
        style={{
          paddingTop: hasDynamicIsland() ? 55 : 20,
          paddingBottom: hasDynamicIsland() ? 20 : 0,
          width: '100%', // width: width,
          alignSelf: 'center',
          // height: height,
          flex: 1,
          backgroundColor: theme.colors.background,
        }}>
        <View
          style={[
            styles.boxContainer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => {
              if (Platform.OS == 'android') {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Splash' }],
                });
              } else navigation.pop();
            }}
            style={styles.crossBtnView}>
            <CrossIcon />
          </TouchableOpacity>
          <QrBrandFail />
          <Text
            style={{
              marginTop: 24,
              marginBottom: 18,
              ...Typography.KaioCustomText,
              fontWeight: '700',
              color: theme.colors.primaryBlack,
              fontSize: RFValue(45, 850),
            }}>
            Ej medlem
          </Text>

          <Text
            style={{
              ...Typography.CustomText,
              fontWeight: '500',
              textAlign: 'center',
              color: theme.colors.primaryBlack,
              fontSize: RFValue(18, 850),
            }}>
            Be kunden att bli medlem först!
          </Text>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          navigation.replace('ScanBrandQR');
        }}
        style={[styles.acceptButton]}>
        <ScannerBtnQR style={{marginRight: RFValue(8, 850)}} />
        <Text style={styles.acceptButtonText}>Skanna</Text>
      </TouchableOpacity>
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
      width: RFValue(114, 850),
      height: RFValue(54, 850),
      marginBottom: '15%',
      // height: '100%',
      resizeMode: 'contain',
    },
    acceptButton: {
      backgroundColor: theme.colors.primaryBlack,
      borderRadius: 100,
      width: '90%',
      height: 55,
      marginHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      flexDirection: 'row',
      marginBottom: hasDynamicIsland() ? 10 : RFValue(30, 850),
    },
    acceptButtonText: {...Typography.ButtonText},
    boxContainer: {
      flex: 1,
      paddingHorizontal: 12,
      marginTop: hasDynamicIsland()
        ? 20
        : Platform.OS == 'ios'
          ? RFValue(60, 850)
          : RFValue(20, 850),
      alignItems: 'center',
    },
    title: {
      ...Typography.CustomText,
      color: theme.colors.primaryBlack,
      fontSize: RFValue(22, 850),
      fontWeight: '700',
    },
    crossBtnView: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
      position: 'absolute',
      top: -12,
      right: 10,
    },
  });

export default ScanQRResponse;
