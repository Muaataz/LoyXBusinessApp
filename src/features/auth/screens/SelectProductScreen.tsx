import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  TextInput,
} from 'react-native';
import {
  CrossIcon,
  DownArrow,
  SearchIcon,
  UpArrow,
} from '../../../shared/components/SvgIcon';
import {RFValue} from 'react-native-responsive-fontsize';
import {Typography} from '../../../shared/utils/typography';
import ProductModal from '../components/ProductModal';
import {getProductList} from '../services/authService';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Product = {
  id: string;
  name: string;
  price?: string;
};

export type Category = {
  id: string;
  name: string;
  products: Product[];
};

const catData = [
  {id: 'p1', name: 'Quickfix Ansikte'},
  {id: 'p2', name: 'Hydrabeauty Ansikte'},
  {id: 'p3', name: 'Hydrabeauty Hals'},
  {id: 'p4', name: 'Hydrabeauty Dekolletage'},
  {id: 'p5', name: 'Product name'},
  {id: 'p6', name: 'Product name'},
  {id: 'p7', name: 'Product name'},
];

// const data: Category[] = [
//   {
//     id: '1',
//     name: 'Ansiktbehandling',
//     products: catData,
//   },
//   {id: '2', name: 'Muskeluppbyggnad', products: catData},
//   {id: '3', name: 'Laser', products: catData},
//   {id: '4', name: 'Fettfrysning', products: catData},
//   {id: '5', name: 'Peeling', products: catData},
//   {id: '6', name: 'Cryopen', products: catData},
//   {id: '7', name: 'Microneedling', products: catData},
//   {id: '8', name: 'Radiofrekvens', products: catData},
//   {id: '9', name: 'Plasma Pen', products: catData},
//   {id: '10', name: 'Lashlift & Browlift', products: catData},
// ];

export default function SelectProductScreen({navigation, route}: any) {
  const productList = route.params.productList;
  const responseUser = route.params.responseUser;
  const setProductList = route.params.setProductList;
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(
    '1',
  );

  const [data, setData] = useState<any>();
  const [search, setSearch] = useState<string>('');
  const [selectedProductId, setSelectedProductId] = useState<any>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleExpand = (id: string) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };
  useEffect(() => {
    getData();
  }, []);

  const transformData = (dataSet: any[]): Category[] => {
    const categoryMap: {[key: string]: Category} = {};

    dataSet.forEach(item => {
      const {category, id, name, price} = item;

      if (!categoryMap[category]) {
        categoryMap[category] = {
          id: category.toLowerCase().replace(/\s+/g, '-'),
          name: category,
          products: [],
        };
      }

      categoryMap[category].products.push({
        id,
        name,
        price: price.value,
        currency: price.currency,
      });
    });

    return Object.values(categoryMap);
  };

  const searchProductsByName = (data1: any, searchText: string) => {
    const lowerCaseSearch = searchText.toLowerCase();

    return data1
      ?.map((item: any) => {
        const matchedProducts = item.products.filter((product: any) =>
          product.name.toLowerCase().includes(lowerCaseSearch),
        );

        if (matchedProducts.length > 0) {
          return {
            ...item,
            products: matchedProducts,
          };
        }

        return null;
      })
      .filter(Boolean); // remove nulls
  };

  const getData = async () => {
    try {
      const response = await getProductList();
      // console.log('response - ', response);

      if (!!response) {
        const dataSet = transformData(response);
        console.log('dataSet - ', JSON.stringify(dataSet));

        setData(dataSet);
      } else {
      }
    } catch (error) {}
  };

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
            navigation?.pop();
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
      <View
        style={{
          height: 60,
          borderWidth: 1,
          marginHorizontal: 16,
          marginBottom: 10,
          borderColor: '#F1F1F1',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          borderRadius: 50,
          paddingHorizontal: 20,
          shadowColor: 'rgba(0,0,0,0.08)',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.08,
          shadowRadius: 24,

          elevation: 5,
        }}>
        <SearchIcon />
        <TextInput
          placeholder="Sök"
          value={search}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setSearch}
          style={{
            flex: 1,
            height: 60,
            paddingHorizontal: 8,
            ...Typography.CustomText,
            fontSize: 14,
            fontWeight: '400',
            color: '#222',
          }}
        />
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <FlatList
          data={!!search ? searchProductsByName(data, search) : data}
          bounces={false}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View
              style={[
                styles.categoryContainer,
                expandedCategoryId === item.id && {
                  marginBottom: RFValue(25, 850),
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.categoryHeader,
                  {
                    paddingBottom: 12,
                    paddingTop: 5,
                  },
                ]}
                onPress={() => toggleExpand(item.id)}>
                <Text style={styles.categoryTitle}>{item.name}</Text>
                {expandedCategoryId === item.id || !!search ? (
                  <UpArrow />
                ) : (
                  <DownArrow />
                )}
              </TouchableOpacity>

              {(expandedCategoryId === item.id || !!search) &&
                item.products.map(product => (
                  <TouchableOpacity
                    key={product.id}
                    disabled={
                      productList?.findIndex(itm => itm?.id == product.id) != -1
                    }
                    style={[
                      styles.productItem,
                      productList?.findIndex(itm => itm?.id == product.id) !=
                        -1 && {
                        opacity: 0.5,
                      },
                    ]}
                    onPress={() => {
                      setModalVisible(true);
                      setSelectedProductId({
                        category: item?.name,
                        product: product,
                      });
                    }}>
                    <Text style={styles.productText}>{product.name}</Text>
                    <View
                      style={[
                        styles.radioCircle,
                        // selectedProductId === product.id &&
                        //   styles.selectedRadio,
                      ]}>
                      {productList?.findIndex(itm => itm?.id == product.id) !=
                        -1 && (
                        <View
                          style={{
                            backgroundColor: '#222',
                            width: '80%',
                            height: '80%',
                            borderRadius: 50,
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
          contentContainerStyle={{paddingBottom: 40}}
        />
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

            // console.log({qty, discount});
            setModalVisible(false);
            navigation.pop();
          }}
          product={selectedProductId}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 16,
  },
  categoryContainer: {
    marginBottom: RFValue(8, 850),
  },
  categoryHeader: {
    // backgroundColor:'red',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryTitle: {
    ...Typography.CustomText,
    color: '#222',
    flex: 1,
    fontSize: RFValue(20, 850),
    fontWeight: '600',
  },
  productItem: {
    backgroundColor: '#f7f7f9',
    paddingVertical: 14,
    // paddingHorizontal: 16,
    marginVertical: 2,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productText: {
    ...Typography.CustomText,
    color: '#222',
    flex: 1,
    marginHorizontal: RFValue(20, 850),
    fontSize: RFValue(14, 850),
    fontWeight: '500',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: RFValue(16, 850),
    borderWidth: 2,
    borderColor: '#999',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadio: {
    backgroundColor: '#333',
    borderColor: '#333',
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
});
