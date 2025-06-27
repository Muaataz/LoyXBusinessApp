import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  CrossIcon,
  MinusIcon,
  PlusIcon,
  RibIcon,
} from '../../../shared/components/SvgIcon';
import {Typography} from '../../../shared/utils/typography';
import {RFValue} from 'react-native-responsive-fontsize';
import {Category} from '../screens/SelectProductScreen';
import {formatNumber} from '../../../shared/utils/utils';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onAdd: (quantity: number, discount: number) => void;
  product: any;
}

export default function ProductModal({
  visible,
  onClose,
  onAdd,
  product,
}: ProductModalProps) {
  const [quantity, setQuantity] = useState(product?.quantity || 1);
  const [discount, setDiscount] = useState(product?.discount || '0');
  const [percentage, setPercentage] = useState<any>(0);
  const [finalAmount, setFinalAmount] = useState<any>(0);

  useEffect(() => {
    if (product?.discount) {
      updateValue(product?.discount, 'discountAmount');
    } else {
      // updateValue(0, 'discountAmount');
    }
  }, [product]);

  const updateValue = (value: any, type: any) => {
    const qty = quantity;
    const productPrice = product.product.price;
    const total = productPrice * qty;
    if (type == 'percentage') {
      const perValue = (total * value) / 100;
      setPercentage(formatNumber(value));
      setDiscount(formatNumber(perValue));
      setFinalAmount(formatNumber(total - perValue));
    } else if (type == 'discountAmount') {
      setDiscount(formatNumber(value));
      setPercentage(formatNumber((value * 100) / total));
      setFinalAmount(formatNumber(total - value));
    } else if (type == 'finalAmount') {
      const discountAmount = total - value;
      setFinalAmount(formatNumber(value));
      setDiscount(formatNumber(discountAmount));
      setPercentage(formatNumber((discountAmount * 100) / total));
    } else if (type == 'qtyPlus') {
      const updatedQty = parseInt(value) + 1;
      const updatedTotal = productPrice * updatedQty;
      setQuantity(formatNumber(updatedQty));
      const perValue = (updatedTotal * percentage) / 100;
      // setPercentage(value);
      setDiscount(formatNumber(perValue));
      setFinalAmount(formatNumber(updatedTotal - perValue));
    } else if (type == 'qtyMinus') {
      const updatedQty = parseInt(quantity) < 2 ? 1 : parseInt(quantity) - 1;
      const updatedTotal = productPrice * updatedQty;
      setQuantity(formatNumber(updatedQty));
      const perValue = (updatedTotal * percentage) / 100;
      // setPercentage(value);
      setDiscount(formatNumber(perValue));
      setFinalAmount(formatNumber(updatedTotal - perValue));
    }
  };

  const increase = () => updateValue(quantity, 'qtyPlus');
  const decrease = () => updateValue(quantity, 'qtyMinus');

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            {/* <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={styles.modalContainer}> */}
            <View style={styles.modal}>
              {/* Header */}
              <View style={styles.headerRow}>
                <Text style={styles.headerText}></Text>
                <TouchableOpacity style={{padding: 10}} onPress={onClose}>
                  <CrossIcon />
                  {/* <Icon name="close" size={24} /> */}
                </TouchableOpacity>
              </View>

              {/* Product Info */}
              <View style={styles.productRow}>
                <View style={{flex: 1}}>
                  <Text style={styles.productName}>{product.product.name}</Text>
                  <Text style={styles.productCategory}>{product.category}</Text>
                </View>
                <Text style={styles.productPrice}>
                  {product.product.price} {product.product.currency}
                </Text>
              </View>

              <View style={styles.qtyRow}>
                <TouchableOpacity style={styles.qtyButton} onPress={decrease}>
                  <MinusIcon />
                </TouchableOpacity>
                <View style={[styles.qtyInputRow]}>
                  <TextInput
                    style={[
                      styles.input,
                      {fontSize: RFValue(22, 850), paddingVertical: 0},
                    ]}
                    editable={false}
                    value={quantity.toString()}
                  />
                </View>
                {/* <View style={{flex: 1}} /> */}

                <TouchableOpacity style={styles.qtyButton} onPress={increase}>
                  <PlusIcon />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: '#F5F5F7',
                  marginTop: 11,
                  padding: 16,
                  borderRadius: 20,
                }}>
                {/* Rabatt */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 29,
                  }}>
                  <Text style={[styles.label, {flex: 1}]}>Rabatt</Text>
                  <RibIcon />
                  <Text
                    style={{
                      ...Typography.CustomText,
                      fontSize: 14,
                      color: '#636163',
                      fontWeight: '500',
                      marginLeft: 4,
                    }}>
                    Fyll i en av dem
                  </Text>
                </View>
                <Text style={styles.inputTitle}>Pris efter rabatt</Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={`${finalAmount}`}
                    placeholder="0"
                    onChangeText={setFinalAmount}
                    returnKeyType="done"
                    placeholderTextColor={'#222'}
                    onBlur={event => {
                      const txt = event.nativeEvent.text;
                      // if (parseFloat(txt) > 100) {
                      // } else {
                      updateValue(txt ? parseFloat(txt) : 0, 'finalAmount');
                      // }
                    }}
                  />
                  <Text style={styles.unit}>kr</Text>
                </View>

                <Text style={[styles.inputTitle, {marginTop: 19}]}>
                  Rabatt i kronor
                </Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={`${discount}`}
                    placeholder="0"
                    returnKeyType="done"
                    placeholderTextColor={'#222'}
                    onChangeText={setDiscount}
                    onBlur={event => {
                      const txt = event.nativeEvent.text;
                      // if (parseFloat(txt) > 100) {
                      // } else {
                      updateValue(txt ? parseFloat(txt) : 0, 'discountAmount');
                      // }
                    }}
                  />
                  <Text style={styles.unit}>kr</Text>
                </View>
                {parseFloat(discount) >
                  parseFloat(product?.product?.price * quantity) && (
                  <Text style={styles.errText}>
                    Rabatten kan inte vara större än priset.
                  </Text>
                )}
                {parseFloat(discount) < 0 && (
                  <Text style={styles.errText}>
                    Rabatten kan inte vara större än priset.
                  </Text>
                )}
                <Text style={[styles.inputTitle, {marginTop: 19}]}>
                  Rabatt i %
                </Text>
                <View style={styles.inputRow}>
                  <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={`${percentage}`}
                    onChangeText={setPercentage}
                    placeholder="0"
                    returnKeyType="done"
                    placeholderTextColor={'#222'}
                    onBlur={event => {
                      const txt = event.nativeEvent.text;
                      if (parseFloat(txt) > 100) {
                        updateValue(100, 'percentage');
                      } else {
                        updateValue(txt ? parseFloat(txt) : 0, 'percentage');
                      }
                    }}
                  />
                  <Text style={styles.unit}>kr</Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 18,
                  marginBottom: 21,
                  height: 1,
                  width: '100%',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...Typography.CustomText,
                    fontSize: 22,
                    fontWeight: '600',
                    color: '#222',
                  }}>
                  Total:
                </Text>
                <Text
                  style={{
                    ...Typography.CustomText,
                    fontSize: 22,
                    fontWeight: '600',
                    color: '#222',
                  }}>
                  {finalAmount} kr
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 13,
                }}>
                <Text
                  style={{
                    ...Typography.CustomText,
                    fontSize: 16,
                    fontWeight: '500',
                    color: parseFloat(discount) > 0 ? '#E05A2A' : '#909090',
                  }}>
                  Rabatt:
                </Text>
                <Text
                  style={{
                    ...Typography.CustomText,
                    fontSize: 16,
                    fontWeight: '500',
                    color: parseFloat(discount) > 0 ? '#E05A2A' : '#909090',
                  }}>
                  {discount} kr
                </Text>
              </View>
              {/* Add Button */}
              <TouchableOpacity
                disabled={
                  parseFloat(discount) >
                    parseFloat(product?.product?.price * quantity) ||
                  parseFloat(discount) < 0
                }
                style={[
                  styles.addButton,
                  (parseFloat(discount) >
                    parseFloat(product?.product?.price * quantity) ||
                    parseFloat(discount) < 0) && {
                    opacity: 0.5,
                  },
                ]}
                onPress={() => onAdd(quantity, Number(discount))}>
                <Text style={styles.addButtonText}>Lägg till</Text>
              </TouchableOpacity>
            </View>
            {/* </KeyboardAvoidingView> */}
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000030',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 40,
    // padding: 20,
    width: '92%',
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 40,
    width: '92%',
    paddingHorizontal: 25,
    paddingBottom: 17,
    paddingTop: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    ...Typography.CustomText,
    fontWeight: '600',
    color: '#222',
    fontSize: RFValue(20, 850),
  },
  productRow: {
    // marginTop: 20,
    marginTop: RFValue(15, 850),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  productName: {
    ...Typography.CustomText,
    fontWeight: '600',
    color: '#222',
    fontSize: RFValue(16, 850),
  },
  productCategory: {
    ...Typography.CustomText,
    fontWeight: '400',
    marginTop: 2,
    color: 'rgba(34,34,34,0.7)',
    fontSize: RFValue(14, 850),
  },
  productPrice: {
    ...Typography.CustomText,
    fontWeight: '600',
    color: '#222',
    fontSize: RFValue(16, 850),
  },
  label: {
    // marginBottom: 5,
    ...Typography.CustomText,
    fontWeight: '600',
    color: '#E05A2A',
    fontSize: RFValue(18, 850),
  },
  qtyInputRow: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    height: RFValue(50, 850),
    justifyContent: 'center',
    borderColor: '#E4E4E4',
    // backgroundColor: '#f7f7f9',
    // paddingHorizontal: RFValue(16, 850),

    // height: 48,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',

    // backgroundColor: '#f7f7f9',
    // paddingHorizontal: RFValue(16, 850),

    // height: 48,
  },
  input: {
    // flex: 1,
    padding: 0,
    ...Typography.CustomText,
    fontWeight: '500',

    color: '#222',
    flex: 1,

    paddingVertical: RFValue(18, 850),
    fontSize: RFValue(18, 850),
  },
  unit: {
    ...Typography.CustomText,
    fontWeight: '500',
    fontSize: RFValue(16, 850),
    color: '#222',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 5,
    marginTop: 15,
  },
  qtyButton: {
    flex: 1,
    backgroundColor: '#F5F5F7',
    height: RFValue(50, 850),
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 20,
    fontWeight: '600',
  },
  addButton: {
    backgroundColor: '#111',
    height: RFValue(60, 850),
    justifyContent: 'center',
    // paddingVertical: RFValue(28, 850),
    borderRadius: 40,
    alignItems: 'center',
    marginTop: RFValue(28, 850),
  },
  addButtonText: {
    ...Typography.CustomText,
    fontWeight: '600',
    fontSize: RFValue(18, 850),
    color: '#fff',
  },
  inputTitle: {
    ...Typography.CustomText,
    fontSize: 15,
    color: '#373737',
    fontWeight: '500',
    marginBottom: 6,
  },
  errText: {
    ...Typography.CustomText,
    fontWeight: '500',
    fontSize: 12,
    marginTop: 6,
    color: '#E60000',
  },
});
