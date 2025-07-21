import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Dimensions,
  TextInput,
} from 'react-native';
import {useTheme} from '../../../shared/hooks/themeContext';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {ScannerBtnQR} from '../../../shared/components/SvgIcon';
import {Typography} from '../../../shared/utils/typography';

const LoginScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      {/* <Animated.Image
        source={require('../../../assets/images/LoyX.png')}
        style={[styles.Img, { transform: [{ scale: scaleAnim }] }]}
      /> */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
          source={require('../../../assets/images/LB.png')}
          resizeMode="contain"
          style={[styles.Img]}
        />
        <View
          style={styles.textContainer}>
          <Text
            style={styles.titleTxt}>
            Log in
          </Text>
          <TextInput
            style={styles.textBox}
            placeholder="Email"
          />
           <TextInput
             style={styles.textBox}
            secureTextEntry={true}
            placeholder="Password"
          />
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          navigation.navigate('ScanBrandQR');
          // navigation.navigate('PurchaseScreen')
        }}
        style={[styles.acceptButton]}>
        {/* <ScannerBtnQR style={{marginRight: RFValue(8, 850)}} /> */}
        <Text style={styles.acceptButtonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
      // marginBottom: hasDynamicIsland() ? 10 : RFValue(30, 850),
    },
    acceptButtonText: {...Typography.ButtonText},
    textContainer:{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            width: Dimensions.get('screen').width,
            paddingHorizontal: 16,
          },
          titleTxt:{
              ...Typography.CustomText,
              fontSize: RFValue(22, 850),
              fontWeight: '700',
              color: theme.colors.primaryBlack,
              paddingHorizontal: 8,
              marginTop: 100,
              marginBottom: 20,
            },
            textBox:{
              width: '100%',
              ...Typography.CustomText,
              color: theme.colors.primaryBlack,
              fontSize: RFValue(18, 850),
              backgroundColor: '#F5F5F7',
              borderRadius: 50,
              fontWeight:'500',
              paddingHorizontal: 18,
              paddingVertical:20,
              marginBottom:8
            }
  });

export default LoginScreen;
