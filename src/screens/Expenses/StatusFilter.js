import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import base64 from 'react-native-base64';
import axios from 'axios';
import {URL} from '../../constants/configure';
const {height, width} = Dimensions.get('window');
const FilterScreen = ({navigation}) => {
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
            height: height / 1.5,
            top: 30,
            margin: 10,
            width: width - 55,
            borderRadius: 10,
          }}>
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
            ) : newData.length !== 0 ? (
              <FlatList
                data={newData}
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
                        {item.ReportStatus === null ? '-' : item.ReportStatus}
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
export default FilterScreen;
