import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  TextInput,
} from 'react-native';

import base64 from 'react-native-base64';
import axios from 'axios';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {URL} from '../../constants/configure';
const {height, width} = Dimensions.get('window');
const CategoryFilter = () => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    getResource();
    getAccountFilterData();
  }, [search, loding, newData]);

  const getResource = async () => {
    try {
      let token = base64.encode('8113899206' + ':' + '12345678');
      // console.log(token, 'token');
      const requestOptions = {
        method: 'GET',
        Accept: 'application/json',
        'Content-Type': 'application/json',

        headers: {Authorization: 'Basic ' + token},
      };
      const {data} = await axios.get(
        URL.BASE_URL + '/Expense/Report',
        requestOptions,
      );

      setNewData(data.data.Items);
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(true);
    }
  };

  const handleChangeValue = value => {
    setSearchValue(value);
  };

  const setSearchValue = value => {
    setSearch(value);
  };
  const getAccountFilterData = () => {
    if (!loding) {
      const filterValue = newData?.filter(data => {
        if (search.length === 0) {
          return data;
        } else if (
          data.CategoryName.toLowerCase().includes(search.toLowerCase())
        ) {
          console.log(data);
          return data;
        }
      });
      setFilterData(filterValue);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{start: 20, top: 10}}>
        <View
          style={{
            backgroundColor: 'white',
            height: height / 1.5,
            top: 30,
            margin: 10,
            width: width - 55,
            borderRadius: 10,
          }}>
          <View
            style={{
              width: wp('90%'),
              height: hp('7%'),
              margin: 5,
              flexDirection: 'row',
              backgroundColor: 'white',
              marginStart: 20,
              borderRadius: 10,
              marginTop: 10,
            }}>
            <TextInput
              placeholder="search"
              style={{
                marginHorizontal: 10,
                fontSize: 15,
                flex: 1,
                marginTop: 1,
              }}
              onChangeText={handleChangeValue}
              value={search}
            />
          </View>
          <View style={{margin: 20, start: 10}}>
            {loding ? (
              <ActivityIndicator
                animating={true}
                size="large"
                style={{
                  opacity: 1,
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            ) : filterData.length !== 0 ? (
              <FlatList
                data={filterData}
                renderItem={({item}) => (
                  <View
                    style={{
                      backgroundColor: 'white',

                      padding: 10,
                      marginHorizontal: 20,
                      borderRadius: 10,
                      top: 10,
                      backgroundColor: 'white',
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        bottom: 20,
                        right: 30,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          margin: 2,
                          marginStart: 5,
                        }}>
                        {item.CategoryName === null ? '-' : item.CategoryName}
                      </Text>
                    </View>
                  </View>
                )}
              />
            ) : (
              <View style={styles.mainContainer}></View>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
export default CategoryFilter;
