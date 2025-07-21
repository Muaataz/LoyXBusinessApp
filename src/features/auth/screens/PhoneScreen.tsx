import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
  Image,
  Animated,
  TextInput,
} from 'react-native';
// import {Check} from 'lucide-react-native';
import axios from 'axios';
import {Typography} from '../../../shared/utils/typography';
import {moderateScale} from 'react-native-size-matters';
import {useTheme} from '../../../shared/hooks/themeContext';
// import { sendCodeToVerify } from '../services/authService';
import {SendCodeVerifyResponse} from '../types';
import Toast from 'react-native-toast-message';
import {CommonData} from '../../../shared/utils/utils';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTranslation} from 'react-i18next';
import {Theme} from '../../../shared/types/theme';
import {
  CrossInputIcon,
  LoginIcon,
  LogoutIcon,
} from '../../../shared/components/SvgIcon';
import FastImage from 'react-native-fast-image';
import {sendCodeToVerify} from '../services/authService';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function PhoneScreen({navigation}: any) {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const [phone, setPhone] = useState('');
  const [keepUpdated, setKeepUpdated] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    EncryptedStorage.getItem('companyData').then(data => {
      if (data) {
        const response: any = JSON.parse(data);
        CommonData.userData = response;
        navigation.reset({
          index: 0,
          routes: [{name: 'Splash'}],
        });
      }
    });
  });

  const [buttonAnimation] = useState(new Animated.Value(-32));

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      'keyboardWillShow',
      keyboardWillShowHandler,
    );
    const keyboardWillHide = Keyboard.addListener(
      'keyboardWillHide',
      keyboardWillHideHandler,
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const keyboardWillShowHandler = (event: any) => {
    Animated.timing(buttonAnimation, {
      duration: event.duration,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const keyboardWillHideHandler = (event: any) => {
    Animated.timing(buttonAnimation, {
      duration: event.duration,
      toValue: -32,
      useNativeDriver: true,
    }).start();
  };

  const isValidPhone = (phone: string) => {
    return phone?.length >= 9;
  };

  const handleContinue = async () => {
    // navigation.navigate('PhoneVerification', {phone: phone});
    // return true;
    if (isValidPhone(phone)) {
      setLoader(true);
      const response: SendCodeVerifyResponse = await sendCodeToVerify(
        `${__DEV__ ? '+91' : '+46'}${phone}`,
      );
      setLoader(false);
      if (response?.user_id) {
        await EncryptedStorage.setItem('companyData', JSON.stringify(response));
        CommonData.userData = response;
        navigation.reset({
          index: 0,
          routes: [{name: 'Splash'}],
        });
        // navigation.navigate('PhoneVerification', {phone: phone});
      } else {
        Toast.show({
          type: 'error',
          text1: 'Hittade inte', //Something went wrong, please try again later
          text2: '',
        });
      }
      // navigation.navigate('PhoneVerification', { phone: phone });
    }
  };

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef?.current) {
        inputRef?.current?.focus();
      }
    }, 500);
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar
            translucent={false}
            backgroundColor={'white'}
            barStyle="dark-content"
          />

          <View style={styles.content}>
            {/* Header */}
            <FastImage
              source={require('../../../assets/images/LB.png')}
              resizeMode="contain"
              style={[styles.logoimg]}
            />
            <View style={styles.header}>
              <Text style={styles.title}>
                {/* {t('hey')} {CommonData?.userData?.user_first_name},{' '} */}
                Logga in med mobilnummer
              </Text>
              {/* <Text style={styles.subtitle}>
                {t('whatsUrPhoneNumberDescription')}
              </Text> */}
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View
                style={{
                  height: 55,
                  borderWidth: 1,
                  paddingHorizontal: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 12,
                  borderColor: theme.colors.greyBlack,
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../../../assets/images/flag.png')}
                  style={{
                    width: RFValue(24, 850),
                    height: RFValue(24, 850),
                    marginRight: 5,
                  }}
                />
                <Text
                  style={{
                    ...Typography.InputText,
                    fontSize: RFValue(18, 850),
                  }}>
                  +46
                </Text>
              </View>
              <View
                style={{
                  height: 55,
                  marginLeft: 10,
                  flex: 1,
                  borderWidth: 1,
                  borderColor: theme.colors.greyBlack,
                  borderRadius: 15,
                  paddingLeft: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <TextInput
                  testID="mobileNumber"
                  ref={inputRef}
                  accessibilityLabel="mobileNumber"
                  style={styles.input}
                  maxLength={__DEV__ ? 10 : 9}
                  placeholder={'Mobilnummer'}
                  placeholderTextColor={theme.colors.greyBlack}
                  keyboardType="number-pad"
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoFocus={false}
                  value={phone}
                  onChangeText={text => {
                    // Filter out '0' directly and prevent it from updating
                    if (text === '0') {
                      return; // Do nothing, prevents even a millisecond render
                    }
                    setPhone(text); // Allow valid inputs
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    setPhone('');
                  }}
                  style={{padding: 16}}>
                  <CrossInputIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Continue Button */}
          <Animated.View
            style={[
              styles.buttonContainer,
              {transform: [{translateY: buttonAnimation}]},
            ]}>
            <TouchableOpacity
              testID="phoneNumberNextButton"
              accessibilityLabel="phoneNumberNextButton"
              activeOpacity={1}
              style={[
                styles.continueButton,
                isValidPhone(phone) && styles.continueButtonEnabled,
              ]}
              disabled={!isValidPhone(phone)}
              onPress={handleContinue}>
              {!loader && <LoginIcon />}
              {loader ? (
                <ActivityIndicator size={'small'} color={'#FFFFFF'} />
              ) : (
                <Text style={[styles.continueButtonText]}>Logga in</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    safeArea: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
      paddingTop: Platform.OS === 'ios' ? 30 : 0,
      marginBottom: 20,
    },
    title: {
      ...Typography.DisplayText,
      marginBottom: 12,
    },
    subtitle: {
      ...Typography.BodyText,
    },
    form: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    input: {
      ...Typography.InputText,
      padding: 0,
      fontSize: RFValue(18, 850),
      flex: 1,
      // paddingTop:-5,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      gap: 12,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#E5E5E5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    continueButton: {
      height: 55,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: '#E5E5E5',
      borderRadius: 100,
    },
    continueButtonEnabled: {
      backgroundColor: theme.colors.primaryBlack,
    },
    continueButtonText: {
      ...Typography.ButtonText,
      marginLeft: 4,
    },
    logoimg: {
      width: 60,
      height: 27,
      resizeMode: 'contain',
    },
  });
