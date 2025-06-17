import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { Typography } from '../utils/typography';
import { useTheme } from '../hooks/themeContext';

type propsType = {
  text: string;
  style?: {};
  textStyle?: {};
  onPress?: () => void;
  showLoader?: boolean;
  testID?: string;
  accessibilityLabel?: string;
};

const Button = ({
  text,
  style = {},
  textStyle = {},
  showLoader = false,
  onPress = () => {},
  testID = '',
  accessibilityLabel = '',
}: propsType) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      style={[styles.button, { ...style }]}
      activeOpacity={0.8}
    >
      {showLoader ? (
        <ActivityIndicator color={theme.colors.background} size={'small'} />
      ) : (
        <Text style={[styles.buttonText, { ...textStyle }]}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;

const createStyles = (theme: any) =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primaryBlack,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: 55,
      borderRadius: 100,
      width: '100%',
      marginBottom: 10,
    },
    buttonText: {
      ...Typography.ButtonText,
    },
    icon: {
      width: 30,
      height: 30,
      marginRight: 8,
    },
  });
