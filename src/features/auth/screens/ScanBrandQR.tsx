import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Typography} from '../../../shared/utils/typography';
import {useTheme} from '../../../shared/hooks/themeContext';
import {RFValue} from 'react-native-responsive-fontsize';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {
  CameraShadow,
  CrossIcon,
  QrScannerBox,
} from '../../../shared/components/SvgIcon';
import {hasDynamicIsland} from 'react-native-device-info';
import {useBarcodeScanner} from '@mgcrea/vision-camera-barcode-scanner';
import {Worklets} from 'react-native-worklets-core';
import {useFocusEffect} from '@react-navigation/native';
import {getScanData} from '../services/authService';

const ScanBrandQR = ({navigation}: any) => {
  const [userId, setUserId] = useState('');
  const [activeTab, setActiveTab] = useState<string>('QR');
  const {theme} = useTheme();
  const [hasPermission, setHasPermission] = useState(false);
  const device = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
  const [isScanning] = useState(true);
  const [loader, setLoader] = useState(false);
  const styles = createStyles(theme);
  let QRData = '';
  let dataCheck: any = null;
  let loadStart = false;

  useEffect(() => {
    const check = async () => {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === 'granted');
    };
    check();
  }, []);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor('rgba(0,0,0,0)');
      StatusBar.setTranslucent(true);
      StatusBar.setBarStyle('light-content', true);
      return () => {
        // console.log('');
        StatusBar.setBackgroundColor('#fff');
        StatusBar.setTranslucent(false);
        StatusBar.setBarStyle('dark-content', true);
      };
    }, []),
  );

  //   useEffect(() => {
  //     try {
  //       clearInterval(dataCheck);
  //     } catch (error) {}
  //     dataCheck = setInterval(() => {
  //       if (!!QRData) {
  //         try {
  //           clearInterval(dataCheck);
  //         } catch (error) {}
  //         doTransaction(QRData);
  //       }
  //     }, 2000);
  //   }, []);

  useEffect(() => {
    if (scannedCode) {
      doTransaction(scannedCode);
    }
  }, [scannedCode]);

  const doTransaction = async (receipt_id: string) => {
    if (!loadStart) {
      loadStart = true;
      setLoader(true);
      try {
        console.log('call start - ', receipt_id);
        const response = await getScanData(receipt_id);
        console.log('response - ', response);

        if (response?.status == 'success') {
          navigation.replace('PurchaseScreen', {
            user_id: receipt_id,
            response: response,
          });
        } else {
          navigation.replace('ScanQRResponse');
        }
        // setTimeout(() => {
        //   setLoader(false);
        // }, 1000);
      } catch (error) {
        navigation.replace('ScanQRResponse');
        setLoader(false);
      }
    }
  };

  const [scannedCode, setScannedCode] = useState<string | null>(
    __DEV__ ? '43f2d852-b5c0-4feb-8085-dbe7ea1bbecf' : null,
  );

  // console.log('scannedCode - ',scannedCode);

  const setBarCodeJs = Worklets.createRunOnJS(doTransaction);
  const {props: cameraProps} = useBarcodeScanner({
    fps: 5,
    onBarcodeScanned: newData => {
      'worklet';
      // console.log(
      //   `Scanned ${newData.length} codes with values=${JSON.stringify(
      //     newData.map(({ value }) => value),
      //   )} !`,
      // );
      // runOnJS(setScannedCode)(newData?.[0]?.value || '')
      setBarCodeJs(`${newData?.[0]?.value}`);
    },
  });

  return (
    <>
      {/* <SafeAreaView style={styles.container}> */}

      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        translucent={true}
        // barStyle={activeTab == 'Scan' ? 'light-content' : 'dark-content'}
      />

      <View style={styles.container}>
        {/* Full Screen Camera */}
        {!!device && !!hasPermission ? (
          <Camera
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isScanning}
            {...cameraProps}
            // frameProcessor={frameProcessor}
            // frameProcessorFps={5}
          />
        ) : null}
        <View style={styles.overlay}>
          <View
            style={{
              flex: 1,
              // justifyContent: 'center',
              alignContent: 'center',
            }}>
            <CameraShadow height={RFValue(130, 850)} />
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}
              style={{
                top: -70,
                padding: 16,
                alignSelf: 'flex-end',
              }}>
              <CrossIcon color={'white'} />
            </TouchableOpacity>
          </View>
          <QrScannerBox />
          <View style={{flex: 2}} />
          {/* <Pressable onPress={()=>{
              navigation.navigate('ScanQrBrandScreen')
            }} style={styles.scanButton}>
              <Text style={styles.scanButtonText}>Scan the QR Code</Text>
            </Pressable> */}
        </View>
      </View>
    </>
  );
};

export default ScanBrandQR;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    container: {flex: 1, backgroundColor: 'white'},
    spaceContainer: {
      flex: 1,
      backgroundColor: 'white',
      paddingTop: hasDynamicIsland()
        ? RFValue(60, 850)
        : Platform.OS == 'ios'
          ? RFValue(50, 850) - (StatusBar?.currentHeight || 0)
          : RFValue(30, 850),
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingLeft: 16,
      paddingVertical: 0,
    },
    headerTitle: {...Typography.DisplayText},
    descText: {
      ...Typography.CustomText,
      fontSize: 16,
      fontWeight: '400',
      paddingHorizontal: 16,
    },
    mainContainer: {
      paddingHorizontal: 16,
      flex: 1,
      alignItems: 'center',
      paddingTop: RFValue(60, 850),
    },
    QRContainer: {
      width: RFValue(280, 850),
      height: RFValue(280, 850),
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 4.85},
      shadowOpacity: 0.25,
      shadowRadius: 4.85,
      elevation: 8,
    },

    overlay: {
      position: 'absolute',
      width: '100%',
      zIndex: 10,
      height: '100%',
      // justifyContent: 'center',
      alignItems: 'center',
    },
    scanButton: {
      // backgroundColor: 'rgba(44, 44, 44,0.8)',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.3,
      shadowRadius: 4,
      top: -50,
      elevation: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    scanButtonText: {
      ...Typography.CustomText,
      fontSize: RFValue(16, 850),
      color: 'white',
      fontWeight: '500',
    },
    qrDataContainer: {
      position: 'absolute',
      top: 100,
      alignSelf: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      padding: 10,
      borderRadius: 8,
    },
    qrDataText: {color: 'white', fontSize: 16},
    title: {
      ...Typography.CustomText,
      fontWeight: '600',
      color: theme.colors.primaryBlack,
      textAlign: 'center',
      fontSize: 16,
    },
    description: {
      ...Typography.CustomText,
      marginTop: 6,
      marginBottom: RFValue(1, 850),
      fontWeight: '400',
      color: theme.colors.primaryBlack,
      textAlign: 'center',
      fontSize: 16,
    },
  });
};
