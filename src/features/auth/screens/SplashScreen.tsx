import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  Animated,
  TouchableOpacity,
  Text,
  SafeAreaView,
} from 'react-native';
import {useTheme} from '../../../shared/hooks/themeContext';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {LogoutIcon, ScannerBtnQR} from '../../../shared/components/SvgIcon';
import {Typography} from '../../../shared/utils/typography';
import EncryptedStorage from 'react-native-encrypted-storage';
import {CommonData} from '../../../shared/utils/utils';

const SplashScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

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
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
      {/* <Animated.Image
        source={require('../../../assets/images/LoyX.png')}
        style={[styles.Img, { transform: [{ scale: scaleAnim }] }]}
      /> */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          paddingLeft: 20,
        }}>
        <FastImage
          source={require('../../../assets/images/LB.png')}
          resizeMode="contain"
          style={[styles.Img]}
        />
        <TouchableOpacity
          onPress={() => {
            EncryptedStorage.removeItem('companyData');
            navigation.reset({
              index: 0,
              routes: [{name: 'Phone'}],
            });
          }}
          style={{paddingHorizontal: 20, paddingVertical: 10}}>
          <LogoutIcon />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <FastImage
          source={{uri: CommonData?.userData?.logo_url}}
          resizeMode="contain"
          style={[styles.companyIcon]}
        />
        <Text
          style={{
            ...Typography.CustomText,
            fontSize: RFValue(18, 850),
            fontWeight: '600',
            color: '#222',
            marginTop: 18,
          }}>
          {CommonData?.userData?.display_name}
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
          navigation.navigate('ScanBrandQR');
          // navigation.navigate('PurchaseScreen')
        }}
        style={[styles.acceptButton]}>
        <ScannerBtnQR style={{marginRight: RFValue(8, 850)}} />
        <Text style={styles.acceptButtonText}>Skanna</Text>
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
      width: 60,
      height: 27,
    },
    companyIcon: {
      width: RFValue(88, 850),
      height: RFValue(88, 850),
      borderRadius: 23,
      borderCurve: 'continuous',
      borderColor: theme.colors.border_color,
      borderWidth: 0.5,
      // marginBottom: '15%',
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
  });

export default SplashScreen;
