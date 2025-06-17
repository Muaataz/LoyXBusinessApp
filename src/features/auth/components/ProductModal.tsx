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
} from '../../../shared/components/SvgIcon';
import {Typography} from '../../../shared/utils/typography';
import {RFValue} from 'react-native-responsive-fontsize';
import {Category} from '../screens/SelectProductScreen';
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
  const [discount, setDiscount] = useState(product?.discount || '');
  useEffect(() => {
    setQuantity(product?.quantity || 1);
    setDiscount(product?.discount || '');
  }, [product]);

  const increase = () => setQuantity(q => q + 1);
  const decrease = () => setQuantity(q => (q > 1 ? q - 1 : 1));

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
                <Text style={styles.headerText}>Välj product/tjänst</Text>
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

              {/* Rabatt */}
              <Text style={styles.label}>Rabatt</Text>
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  value={`${discount}`}
                  placeholder="0"
                  returnKeyType="done"
                  placeholderTextColor={'#888888'}
                  onChangeText={setDiscount}
                />
                <Text style={styles.unit}>kr</Text>
              </View>
              {parseInt(discount) > parseInt(product?.product?.price) && (
                <Text
                  style={{
                    ...Typography.CustomText,
                    fontWeight: '500',
                    fontSize: 12,
                    marginTop: 6,
                    color: '#E60000',
                  }}>
                  Rabatten kan inte vara större än priset.
                </Text>
              )}

              {/* Antal */}
              <Text style={styles.label}>Antal</Text>
              <View style={styles.qtyRow}>
                <View style={[styles.inputRow, {width: 120}]}>
                  <TextInput
                    style={[styles.input, {flex: 1}]}
                    editable={false}
                    value={quantity.toString()}
                  />
                </View>
                <View style={{flex: 1}} />
                <TouchableOpacity style={styles.qtyButton} onPress={decrease}>
                  <MinusIcon />
                </TouchableOpacity>
                <TouchableOpacity style={styles.qtyButton} onPress={increase}>
                  <PlusIcon />
                </TouchableOpacity>
              </View>

              {/* Add Button */}
              <TouchableOpacity
                disabled={
                  parseInt(discount) > parseInt(product?.product?.price)
                }
                style={[
                  styles.addButton,
                  parseInt(discount) > parseInt(product?.product?.price) && {
                    opacity: 0.5,
                  },
                ]}
                onPress={() => onAdd(quantity, Number(discount))}>
                <Text style={styles.addButtonText}>Add</Text>
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
    paddingHorizontal: 30,
    paddingBottom: 17,
    paddingTop: 30,
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
    marginTop: RFValue(25, 850),
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
    marginTop: RFValue(18, 850),
    marginBottom: 5,
    ...Typography.CustomText,
    fontWeight: '500',
    color: '#373737',
    fontSize: RFValue(16, 850),
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#E4E4E4',
    // backgroundColor: '#f7f7f9',
    paddingHorizontal: RFValue(16, 850),

    // height: 48,
  },
  input: {
    flex: 1,
    padding: 0,
    ...Typography.CustomText,
    fontWeight: '500',
    color: '#888888',
    paddingVertical: RFValue(18, 850),
    fontSize: RFValue(20, 850),
  },
  unit: {
    ...Typography.CustomText,
    fontWeight: '500',
    fontSize: RFValue(20, 850),
    color: '#888888',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    width: RFValue(65, 850),
    height: RFValue(65, 850),
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
    paddingVertical: RFValue(28, 850),
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
});
