import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {IMAGES} from '../constants/Images';
import axios from 'axios';
import {URL} from '../constants/configure';
import base64 from 'react-native-base64';
const CustomDrawer = props => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  useEffect(() => {
    getResource();
  }, []);

  const getResource = async () => {
    try {
      let token = base64.encode('8113899206' + ':' + '12345678');

      const requestOptions = {
        method: 'GET',
        Accept: 'application/json',
        'Content-Type': 'application/json',

        headers: {Authorization: 'Basic ' + token},
      };
      const {data} = await axios.get(URL.BASE_URL + '/Users', requestOptions);
      //console.log(data.data.Items[0].Name, '-----------------hey');
      setNewData(data.data.Items[0]);
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(true);
    }
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'white'}}>
        <ImageBackground style={{padding: 20}}>
          <Image
            source={IMAGES.nimaplogo}
            style={{
              height: 100,
              width: 120,
              resizeMode: 'contain',
              top: 10,
              alignSelf: 'center',
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                padding: 15,
                top: 10,
                alignSelf: 'center',
                fontFamily: 'Roboto-Medium',
              }}>
              Welcome,
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                top: 10,
                fontFamily: 'Roboto-Medium',
                color: 'grey',
                alignSelf: 'center',
              }}>
              {newData.Name}
            </Text>
          </View>
        </ImageBackground>

        <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          {/* <View><Text>Dashboard</Text></View> */}

          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{padding: 2, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('SignInScreen')}
          style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={22} style={{marginStart: 15}} />
            <Text
              style={{
                fontSize: 15,
                fontFamily: 'Roboto-Medium',
                marginLeft: 10,
              }}>
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomDrawer;
