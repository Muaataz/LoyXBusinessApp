import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableOpacity,
  Text,
  Platform,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../shared/types/navigation';
import {useTheme} from '../../../shared/hooks/themeContext';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  CrossIcon,
  QrBrandFail,
  QrBrandSuccess,
  ScannerBtnQR,
} from '../../../shared/components/SvgIcon';
import {hasDynamicIsland} from 'react-native-device-info';
import {Typography} from '../../../shared/utils/typography';
import moment from 'moment';
import {doScanData} from '../services/authService';

const QrDataTransaction = ({navigation, route}: any) => {
  const responseData = route?.params?.response;
  const user_id = route?.params?.user_id;
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const textInputRef = useRef(null);
  const [total, setTotal] = useState('');
  const [keepUpdated, setKeepUpdated] = useState<boolean>(false);
  const [isFocusTI, setFocusTI] = useState<boolean>(false);
  const [isSuccess, setSuccess] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);
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
  const doTransaction = async () => {
    setLoader(true);
    try {
      const response = await doScanData(user_id, parseInt(total) || 0);
      console.log('response - ', response);

      if (response?.status == 'success') {
        setSuccess(true);
        setTimeout(() => {
          navigation.pop();
        }, 2500);
      } else {
        navigation.replace('ScanQRResponse');
      }
      setLoader(false);
      //   setTimeout(() => {
      //     setLoader(false);
      //   }, 1000);
    } catch (error) {
      setLoader(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 50}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <StatusBar backgroundColor={'white'} barStyle="dark-content" />
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
                {justifyContent: 'flex-start', alignItems: 'center'},
              ]}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => {
                  navigation.pop();
                }}
                style={styles.crossBtnView}>
                <CrossIcon />
              </TouchableOpacity>
              <Text
                style={{
                  ...Typography.CustomText,
                  fontSize: RFValue(20, 850),
                  fontWeight: '600',
                  color: '#222',
                }}>
                {responseData?.user_name}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 22,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  marginBottom: 24,
                }}>
                <Text
                  style={{
                    ...Typography.CustomText,
                    color: '#727272',
                    fontWeight: '400',
                    fontSize: 16,
                  }}>
                  Behandling
                </Text>
                <Text
                  style={{
                    ...Typography.CustomText,
                    color: '#727272',
                    fontWeight: '400',
                    fontSize: 16,
                  }}>
                  {moment().format('DD/MM/YYYY')}
                </Text>
              </View>
              <TextInput
                placeholderTextColor={'#888888'}
                placeholder="Total"
                value={total}
                keyboardType="number-pad"
                ref={textInputRef}
                onFocus={() => {
                  setFocusTI(true);
                }}
                onBlur={() => {
                  setFocusTI(false);
                }}
                onChangeText={setTotal}
                style={{
                  height: 65,
                  padding: 18,
                  ...Typography.CustomText,
                  fontWeight: '500',
                  color: '#222',
                  fontSize: RFValue(24, 850),
                  borderRadius: 100,
                  borderWidth: 1,
                  width: '100%',
                  borderColor: '#888888',
                }}
              />

              <TouchableOpacity
                style={styles.checkboxContainer}
                activeOpacity={0.75}
                onPress={() => setKeepUpdated(!keepUpdated)}>
                <View
                  style={[
                    styles.checkbox,
                    keepUpdated && styles.checkboxChecked,
                  ]}>
                  {keepUpdated && (
                    <Image
                      source={require('../../../assets/images/rightIcon.png')}
                      resizeMode="contain"
                      style={{
                        width: RFValue(14, 850),
                        height: RFValue(14, 850),
                      }}
                    />
                  )}
                  {/* {keepUpdated && <Check size={16} color="#fff" />} */}
                </View>
                <Text style={styles.checkboxLabel}>Är total pris korrekt?</Text>
              </TouchableOpacity>
              {isSuccess ? (
                <>
                  <QrBrandSuccess style={{marginTop: 22}} />
                  <Text
                    style={{
                      marginTop: 8,
                      marginBottom: hasDynamicIsland() ? 10 : RFValue(30, 850),
                      ...Typography.KaioCustomText,
                      fontWeight: '700',
                      color: theme.colors.primaryBlack,
                      fontSize: RFValue(45, 850),
                    }}>
                    Klart!
                  </Text>
                </>
              ) : (
                <>
                  <View style={{flex: 1}} />
                  <View
                    style={{
                      paddingHorizontal: 16,
                      width:'100%',
                      // paddingBottom: Platform.OS === 'ios' ? 30 : 20,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.75}
                      disabled={!keepUpdated || !total || loader}
                      onPress={() => {
                        doTransaction();
                      }}
                      style={[
                        styles.acceptButton,
                        (!keepUpdated || !total) && {opacity: 0.5},
                      ]}>
                      <Text style={styles.acceptButtonText}>Skicka poäng</Text>
                      {loader && (
                        <ActivityIndicator size={'large'} color={'#fff'} />
                      )}
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
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
      paddingHorizontal: 10,
      paddingTop: 12,
      paddingBottom: 16,
      alignSelf: 'flex-end',
      //   position: 'absolute',
      //   top: -12,
      //   right: 10,
    },
    checkboxContainer: {
      flexDirection: 'row',
      marginTop: 50,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 12,
    },
    checkbox: {
      width: RFValue(24, 850),
      height: RFValue(24, 850),
      borderRadius: RFValue(7, 850),
      borderWidth: 1,
      borderColor: '#E5E5E5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxChecked: {
      backgroundColor: theme.colors.primaryBlack,
      borderColor: theme.colors.primaryBlack,
    },
    checkboxLabel: {
      // flex: 1,
      ...Typography.InputText,
    },
  });

export default QrDataTransaction;
