import React from 'react';
import {View, Text, StyleSheet, Modal} from 'react-native';
import {useTheme} from '../../../shared/hooks/themeContext';
import {Typography} from '../../../shared/utils/typography';
import {RFValue} from 'react-native-responsive-fontsize';
import Button from '../../../shared/components/Button';

const ConfirmationPopup = ({
  visible,
  onClose,
  onConfirm,
  title = '',
  description = '',
  leftButtonText = '',
  leftButtonClick = () => {},
  rightButtonClick = () => {},
  rightButtonText = '',
}: any) => {
  const {theme} = useTheme();
  const styles = createStyles(theme);

  if (!visible) return null;

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer]}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>{title}</Text>
          </View>

       {description &&   <Text style={styles.messageText}>{description}</Text>}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 8,
              alignItems: 'center',
              width: '100%',
            }}>
            <Button
              onPress={leftButtonClick}
              style={{
                flex: 1,
                marginBottom: 0,
                backgroundColor: 'white',
                borderWidth: 1,
                height: 52,
                borderColor: theme.colors.primaryBlack,
              }}
              textStyle={{
                color: theme.colors.primaryBlack,
              }}
              text={leftButtonText}
            />
            <Button
              onPress={rightButtonClick}
              style={{
                marginBottom: 0,
                flex: 1,
                height: 52,
              }}
              text={rightButtonText}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationPopup;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    // Modal styles
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 24,
      paddingVertical: 24,
      paddingHorizontal: 16,
      width: '100%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    timerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
       marginBottom: RFValue(27, 850),
    },
    timerText: {
      ...Typography.CustomText,
      fontSize: RFValue(20, 850),
      fontWeight: '600',

      color: theme.colors.primaryBlack,
    },
    messageText: {
      ...Typography.CustomText,
      fontSize: RFValue(18, 850),
      fontWeight: '400',
      //   marginLeft: 10,
      textAlign: 'center',
      marginBottom: RFValue(27, 850),
      color: theme.colors.primaryBlack,
    },
    notNowButton: {
      width: '100%',
      paddingVertical: 16,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: '#333',
      marginBottom: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notNowText: {
      fontSize: 18,
      fontWeight: '600',
      color: '#333',
    },
    confirmButton: {
      width: '100%',
      paddingVertical: 16,
      borderRadius: 40,
      backgroundColor: '#222',
      alignItems: 'center',
      justifyContent: 'center',
    },
    confirmText: {
      fontSize: 18,
      fontWeight: '600',
      color: 'white',
    },
  });
};
