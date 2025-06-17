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
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../shared/types/navigation';
import {useTheme} from '../../../shared/hooks/themeContext';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import {ScannerBtnQR} from '../../../shared/components/SvgIcon';
import {hasDynamicIsland} from 'react-native-device-info';
import {Typography} from '../../../shared/utils/typography';

// Type for navigation prop
type SplashScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Splash'
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const SplashScreen: React.FC<Props> = ({navigation}) => {
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
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <FastImage
        source={require('../../../assets/images/LB.png')}
        resizeMode="contain"
        style={[styles.Img]}
      />
      </View>
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => {
             navigation.navigate('ScanBrandQR')
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
      width:RFValue(114,850),
      height:RFValue(54,850),
      marginBottom:'15%',
      // height: '100%',
      resizeMode: 'contain',
    },
    acceptButton: {
      backgroundColor: theme.colors.primaryBlack,
      borderRadius: 100,
      width:'90%',
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
