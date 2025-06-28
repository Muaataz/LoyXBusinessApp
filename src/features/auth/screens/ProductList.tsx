import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Typography} from '../../../shared/utils/typography';
import {
  CrossIcon,
  DeleteIcon,
  PenIcon,
} from '../../../shared/components/SvgIcon';
import ProductModal from '../components/ProductModal';
import Toast from 'react-native-toast-message';
import {getProductList, updateProductList} from '../services/authService';
import ConfirmationPopup from '../components/ConfirmationPopup';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function PurchaseScreen(props) {
  const [productList, setProductList] = useState<any>([]);
  const [selectedProductId, setSelectedProductId] = useState<any>(null);
  const user_id = props?.route?.params?.user_id || '';
  const responseUser = props?.route?.params?.response || '';

  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    console.log('selectedProductId - ', selectedProductId);
  }, [selectedProductId]);

  const total = productList.reduce(
    (sum, item) =>
      sum + (item.price?.value || 0) * (item.quantity || 1) - item.discount,
    0,
  );

  const totalDiscount = productList.reduce(
    (sum, item) => sum + (item.discount || 0),
    0,
  );

  const updateData = async () => {
    let lines: any = [];
    productList?.map(itm => {
      lines.push({
        discount: itm?.discount,
        id: itm?.id,
        name: itm?.name,
        price: {
          currency: itm.price.currency,
          value: itm.price.value,
        },
        quantity: itm?.quantity,
      });
    });
    // alert(JSON.stringify(lines))
    // return true
    try {
      const response = await updateProductList(user_id, lines);
      console.log('response - ', response);

      if (!!response) {
        Toast.show({
          type: 'success',
          text1: 'Klart!',
          text2: '',
        });
        props?.navigation.reset({
          index: 0,
          routes: [{name: 'Splash'}],
        });
      } else {
      }
    } catch (error) {}
  };

  const renderItem = ({item, index}: any) => (
    <View style={styles.serviceCard}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, marginRight: 24}}>
          <Text style={styles.serviceTitle}>
            {item?.quantity} x {item.name}
          </Text>
          <Text style={styles.category}>{item.category}</Text>
        </View>
        <Text style={styles.price}>
          {item.price.value * item?.quantity - item.discount}{' '}
          {item.price.currency}
        </Text>
      </View>

      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View style={styles.actionRow}>
          <TouchableOpacity
            onPress={() => {
              setSelectedProductId({
                category: item.category,
                product: {
                  name: item.name,
                  price: item?.price?.value,
                  currency: item?.price?.currency,
                  id: item.id,
                },
                discount: item?.discount,
                quantity: item?.quantity,
              });
              setTimeout(() => {
                setModalVisible(true);
              }, 100);
            }}>
            <PenIcon />
          </TouchableOpacity>
          <TouchableOpacity
            // style={{backgroundColor: 'red'}}
            onPress={() => {
              setProductList(prevList =>
                prevList.filter((_, i) => i !== index),
              );
            }}>
            <DeleteIcon />
          </TouchableOpacity>
        </View>
        {parseFloat(item.discount) > 0 && (
          <Text style={styles.discount}>Rabatt: {item.discount} kr</Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          // borderBottomWidth:1,
          paddingBottom: RFValue(10, 850),
          marginBottom: RFValue(15, 850),
        }}>
        <Text style={styles.customerName}>{responseUser?.user_name}</Text>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}
          style={{
            width: RFValue(63, 850),
            height: RFValue(50, 850),
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:'red',
          }}>
          <CrossIcon />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <Text style={styles.sectionLabel}>Produkt/tjänst</Text>
        <TouchableOpacity
          onPress={() => {
            props?.navigation.navigate('SelectProductScreen', {
              responseUser,
              productList,
              setProductList,
            });
          }}
          style={styles.addButton}>
          <Text style={styles.addText}>+ Lägg till</Text>
        </TouchableOpacity>

        <FlatList
          data={productList}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{gap: 4}}
          style={{marginBottom: 0}}
        />

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{total} kr</Text>
        </View>
        <View style={styles.totalRow}>
          <Text
            style={[
              styles.discountLabel,
              parseFloat(totalDiscount) > 0 && {color: '#E05A2A'},
            ]}>
            Rabatt
          </Text>
          <Text
            style={[
              styles.discountValue,
              parseFloat(totalDiscount) > 0 && {color: '#E05A2A'},
            ]}>
            {totalDiscount} kr
          </Text>
        </View>

        <TouchableOpacity
          disabled={productList?.length == 0}
          onPress={updateData}
          style={[
            styles.registerButton,
            productList?.length == 0 && {opacity: 0.5},
          ]}>
          <Text style={styles.registerText}>Registrera köp</Text>
        </TouchableOpacity>
      </View>
      {selectedProductId && (
        <ProductModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAdd={(qty, discount) => {
            setProductList(prevList => {
              const existingIndex = prevList.findIndex(
                item => item.id === selectedProductId.product.id,
              );

              const updatedItem = {
                discount,
                id: selectedProductId.product.id,
                category: selectedProductId.category,
                name: selectedProductId.product.name,
                price: {
                  currency: selectedProductId.product.currency,
                  value: selectedProductId.product.price,
                },
                quantity: qty,
              };

              if (existingIndex !== -1) {
                // Replace the existing item
                const newList = [...prevList];
                newList[existingIndex] = updatedItem;
                return newList;
              } else {
                // Add as new item
                return [...prevList, updatedItem];
              }
            });

            console.log({qty, discount});
            setModalVisible(false);
            // navigation.pop();
          }}
          product={selectedProductId}
        />
      )}
      <ConfirmationPopup
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        title={'Vill du avbryta?'}
        description={''}
        leftButtonText={'Ja'}
        leftButtonClick={() => {
          setVisible(false);
          setTimeout(() => {
            props?.navigation?.pop();
          }, 300);
        }}
        rightButtonClick={() => {
          setVisible(false);
        }}
        rightButtonText={'Nej'}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  customerName: {
    paddingHorizontal: 16,
    ...Typography.CustomText,
    color: '#222',
    fontSize: RFValue(20, 850),
    fontWeight: '600',
    textDecorationLine: 'underline',
    textAlign: 'center',
    // marginVertical: 10,
  },
  sectionLabel: {
    ...Typography.CustomText,
    fontWeight: 'bold',
    color: '#222',
    fontSize: RFValue(18, 850),
    marginTop: RFValue(25, 850),
    marginBottom: RFValue(15, 850),
  },
  addButton: {
    paddingHorizontal: RFValue(11, 850),
    paddingVertical: RFValue(17, 850),
    borderWidth: 1,
    borderColor: '#8F8F8F',
    borderStyle: 'dashed',
    borderRadius: 14,
    marginBottom: RFValue(17, 850),
    backgroundColor: '#F5F5F7',
  },
  addText: {
    ...Typography.CustomText,
    fontWeight: '600',
    color: '#222',
    fontSize: RFValue(16, 850),
  },
  serviceCard: {
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    backgroundColor: '#F5F5F7',
    paddingHorizontal: RFValue(16, 850),
    paddingTop: RFValue(16, 850),
    paddingBottom: RFValue(8, 850),
    borderRadius: 16,
  },
  serviceTitle: {
    ...Typography.CustomText,
    fontWeight: '600',
    flex: 1,
    textAlign: 'left',
    color: '#222',
    fontSize: RFValue(16, 850),
    marginBottom: RFValue(5, 850),
  },
  category: {
    ...Typography.CustomText,
    fontWeight: '500',
    color: 'rgba(34,34,34,0.8)',
    fontSize: RFValue(14, 850),
    marginBottom: 5,
  },
  actionRow: {
    flexDirection: 'row',
  },
  icon: {
    color: '#333',
  },
  priceBlock: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  price: {
    ...Typography.CustomText,
    fontWeight: '600',
    color: '#222',
    fontSize: RFValue(16, 850),
  },
  discount: {
    ...Typography.CustomText,
    fontWeight: '500',
    color: '#E05A2A',
    fontSize: RFValue(14, 850),
  },
  divider: {
    height: 1,
    backgroundColor: '#7F7F7F',
    marginBottom: RFValue(16, 850),
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: RFValue(2, 850),
  },
  totalLabel: {
    ...Typography.CustomText,
    fontWeight: '500',
    color: 'rgba(34,34,34,0.8)',
    fontSize: RFValue(24, 850),
  },
  discountLabel: {
    ...Typography.CustomText,
    fontWeight: '500',
    color: '#4E4E4E',
    fontSize: RFValue(16, 850),
  },
  totalValue: {
    ...Typography.CustomText,
    fontWeight: '500',
    color: '#222',
    fontSize: RFValue(24, 850),
  },
  discountValue: {
    ...Typography.CustomText,
    fontWeight: '500',
    color: '#4E4E4E',
    fontSize: RFValue(16, 850),
  },
  registerButton: {
    marginTop: RFValue(24, 850),
    backgroundColor: '#111',
    paddingVertical: RFValue(24, 850),
    borderRadius: 40,
    alignItems: 'center',
  },
  registerText: {
    ...Typography.CustomText,
    fontWeight: '600',
    color: '#fff',
    fontSize: RFValue(18, 850),
  },
});
