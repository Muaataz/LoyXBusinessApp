import { Platform, TextStyle } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Typography = {
  KaioTitleText: {
    fontFamily: 'Inter Tight',
    // fontFamily:'Inter Tight Regular',
    fontSize: RFValue(45, 850),
    fontWeight: '700',
    // ...(Platform.OS == 'android' && { lineHeight: RFValue(35, 850) }),
    color: '#222222',
    textAlign: 'center',
  } as TextStyle,
  DisplayText: {
    fontFamily: 'Inter Tight',
    fontSize: RFValue(24, 850),
    fontWeight: '600',
    textAlign: 'left',
    color: '#222222',
  } as TextStyle,
  KaioCustomText: {
    fontFamily: 'Inter Tight',
    fontSize: RFValue(20, 850),
    fontWeight: '700',
    color: '#222222',
  } as TextStyle,
  TitleText: {
    fontFamily: 'Inter Tight',
    fontSize: RFValue(26, 850),
    fontWeight: '600',
    textAlign: 'left',
    color: '#222222',
  } as TextStyle,
  BodyText: {
    fontFamily: 'Inter Tight',
    fontSize: RFValue(18, 850),
    color: '#222222',
    lineHeight: RFValue(25, 850),
    fontWeight: 'regular',
    textAlign: 'left',
  } as TextStyle,
  LegalText: {
    fontFamily: 'Inter Tight',
    fontSize: 12,
    color: '#222222',
    lineHeight: 16,
    fontWeight: '500',
    textAlign: 'center',
  } as TextStyle,
  InputText: {
    fontFamily: 'Inter Tight',
    fontSize: RFValue(16, 850),
    // lineHeight: RFValue(22, 850),
    color: '#222222',
    fontWeight: 'regular',
    textAlign: 'left',
  } as TextStyle,
  ButtonText: {
    fontFamily: 'Inter Tight',
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'left',
  } as TextStyle,

  SmallButtonText: {
    fontFamily: 'Inter Tight',
    fontSize: 14,
    // lineHeight: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  } as TextStyle,

  BottomTabText: {
    fontFamily: 'Inter Tight',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  } as TextStyle,

  HeaderText: {
    fontFamily: 'Inter Tight',
    fontSize: RFValue(18, 850),
    fontWeight: 'bold',
    color: '#222222',
    textAlign: 'center',
  } as TextStyle,

  TabTitleText: {
    fontFamily: 'Inter Tight',
    fontSize: RFValue(16, 850),
    color: '#222222',
    fontWeight: '600',
    textAlign: 'center',
  } as TextStyle,

  BrandSmallTitleText: {
    fontFamily: 'Inter Tight',
    fontSize: 12,
    color: '#222222',
    lineHeight: 14,
    fontWeight: '600',
    textAlign: 'center',
  } as TextStyle,
  BrandBigTitleText: {
    fontFamily: 'Inter Tight',
    fontSize: 14,
    color: '#222222',
    fontWeight: '600',
    textAlign: 'left',
  } as TextStyle,

  EmptyScreenText: {
    fontFamily: 'Inter Tight',
    fontSize: RFValue(18, 850),
    lineHeight: 28,
    color: '#222222',
    fontWeight: '500',
    textAlign: 'center',
  } as TextStyle,

  DiscountText: {
    fontFamily: 'Inter Tight',
    fontSize: 11,
    fontWeight: '600',
  } as TextStyle,

  CustomText: { fontFamily: 'Inter Tight' } as TextStyle,
};
