import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import base64 from 'react-native-base64';
import axios from 'axios';
import {URL} from '../../constants/configure';
const {height, width} = Dimensions.get('window');
const DateFilter = () => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    getResource();
  }, [loding, newData]);

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
      //console.log(newData[0].RequestedAmount, '------------data');
      setNewData(data.data.Items);
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(true);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={{start: 20, top: 10}}>
        <View
          style={{
            backgroundColor: 'white',
            height: height / 7,
            top: 30,
            margin: 10,
            width: width - 55,
            borderRadius: 10,
          }}>
          <View
            style={{
              margin: 20,
              start: 10,
              flexDirection: 'row',
            }}>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={{fontSize: 16}}>From Date</Text>
              <TextInput
                placeholder="dd mmm yyyy"
                style={{fontSize: 16, right: 5}}></TextInput>
            </View>
            <View
              style={{
                borderWidth: 1,
                bottom: 20,
                height: height / 7,
                right: 10,
                borderColor: 'lightgrey',
              }}></View>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={{fontSize: 16}}>To Date</Text>
              <TextInput
                placeholder="dd mmm yyyy"
                style={{fontSize: 16, right: 5}}
              />
            </View>
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
export default DateFilter;
