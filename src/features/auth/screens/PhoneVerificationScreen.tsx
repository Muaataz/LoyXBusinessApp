import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {ArrowLeft} from 'lucide-react-native';
import axios from 'axios';
import {Typography} from '../../../shared/utils/typography';
import {RFValue} from 'react-native-responsive-fontsize';
import {useTheme} from '../../../shared/hooks/themeContext';
import {VerifyCodeRequestResponse} from '../types';
// import { verifyCodeRequest } from '../services/authService';
import Toast from 'react-native-toast-message';
import {OtpInput} from 'react-native-otp-entry';
import {Theme} from '../../../shared/types/theme';
import {t} from 'i18next';
// import EmailConfirm from '../components/EmailConfirm';

export default function PhoneVerificationScreen({navigation, route}: any) {
  const {theme} = useTheme();
  const styles = createStyles(theme);
  const phone = route?.params?.phone;
  const [code, setCode] = useState(['', '', '', '']);
  const inputRefs: any = useRef([]);

  const [timeLeft, setTimeLeft] = useState(59); // Start from 59 seconds
  const [isTimerComplete, setIsTimerComplete] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsTimerComplete(true); // Timer complete
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(59); // Reset timer
    setIsTimerComplete(false); // Hide button, show timer again
    // Add your "resend code" logic here
  };

  const inputRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (inputRef?.current) {
        inputRef?.current?.focus();
      }
    }, 500);
  }, []);

  // Initialize refs array
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 4);
  }, []);

  const handleCodeChange = async (fullCode: string) => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Splash'}],
    });
    return true;
    if (fullCode.length == 4) {
      const response: VerifyCodeRequestResponse = await verifyCodeRequest(
        fullCode,
        'mobile_number',
      );
      if (response?.user_id) {
        // Toast.show({
        //   type: 'success',
        //   text1: 'Phone number verified',
        //   text2: '',
        // });
        navigation.reset({
          index: 0,
          routes: [{name: 'Email'}],
        });
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace' && index > 0 && !code[index]) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={'white'}
        barStyle="dark-content"
      />

      {/* Header */}
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          navigation.pop();
        }}
        style={styles.backButton}>
        <Image
          source={require('../../../assets/images/backButton.png')}
          resizeMode="contain"
          style={styles.backButtonIcon}
        />
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Verifera mobilnummer</Text>
        <Text style={styles.description}>
          En 4-siffrig kod har skickats till{'\n'}
          <Text style={{fontWeight: '600'}}>
            {__DEV__ ? ' +91' : ' +46'}{phone}
          </Text>
          {/*  {t('unlessYouAlreadyHaveAccount')} */}
        </Text>

        <OtpInput
          ref={inputRef}
          numberOfDigits={6}
          autoFocus={false}
          focusColor={theme.colors.primaryBlack}
          focusStickBlinkingDuration={500}
          onFilled={text => handleCodeChange(text)}
          textInputProps={{
            accessibilityLabel: 'mobileNumberOTP',
            testID: 'mobileNumberOTP',
          }}
          theme={{
            containerStyle: styles.otpContainer,
            pinCodeContainerStyle: styles.pinCodeContainer,
            pinCodeTextStyle: styles.pinCodeText,
            focusStickStyle: styles.focusStick,
            focusedPinCodeContainerStyle: styles.activePinCodeContainer,
          }}
        />

        {/* <Text style={[styles.resendUI, { color: '#22222', marginTop: 20 }]}>
          Resend code in 00:{timeLeft.toString().padStart(2, '0')}
        </Text> */}
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    backButton: {
      marginBottom:10,
      // padding: 16,
      // marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
      paddingHorizontal: 16,
    },
    title: {
      ...Typography.DisplayText,
      marginBottom: 12,
    },
    description: {
      ...Typography.BodyText,
      marginBottom: 20,
    },
    resendUI: {
      ...Typography.InputText,
      marginBottom: 20,
    },
    email: {
      fontWeight: '700',
    },
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
    },
    codeInput: {
      ...Typography.InputText,
      height: RFValue(60, 850),
      fontSize: RFValue(24, 852),
      width: 48,
      borderWidth: 1,
      borderColor: theme.colors.primaryBlack,
      borderRadius: 18,
      textAlign: 'center',
      backgroundColor: theme.colors.background,
    },
    backButtonIcon: {width: 50, height: 50},
    otpContainer: {
      // width:'80%',
      gap: 12,
      justifyContent: 'center',
      alignSelf: 'center',
    },
    pinCodeContainer: {
      width: 48,
      height: 60,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: theme.colors.primaryBlack,
    },
    pinCodeText: {
      ...Typography.InputText,
      fontSize: RFValue(24, 852),
      borderColor: theme.colors.primaryBlack,
    },
    focusStick: {},
    activePinCodeContainer: {},
  });
