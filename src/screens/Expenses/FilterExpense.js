import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import CategoryFilter from './CategoryFilter';
import StatusFilter from './StatusFilter';
import DateFilter from './DateFilter';
import base64 from 'react-native-base64';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {dpforHeight, dpforWidth} from '../../constants/SizeScreen';
import axios from 'axios';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import * as yup from 'yup';
import {URL} from '../../constants/configure';

import DocumentPicker from 'react-native-document-picker';

const {height, width} = Dimensions.get('window');
const FilterScreen = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const initialLayout = {width: Dimensions.get('window').width};
  const [state, setstate] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'category', title: 'Category'},
    {key: 'status', title: 'Status'},
    {key: 'date', title: 'Date'},
    {key: 'date', title: ''},
  ]);
  const nameReg = /^[^-\s][a-zA-Z\s-]+$/;

  const pdf = /(http(s?)):\/\//i;
  const number = /^[0-9]*$/;
  const loginValidationSchema = yup.object().shape({
    CategoryName: yup
      .string()
      .required('These field is Required')
      .matches(nameReg, 'Please enter a valid name'),
    ExpenseDate: yup.string().required('Please fill out this filed'),

    RequestedAmount: yup
      .string()
      .required('Please fill out this filed')
      .matches(number, 'Please enter a valid name'),

    Description: yup
      .string()
      .required('Please fill out this filed')
      .matches(nameReg, 'Please enter a valid url'),
    Event: yup
      .string()
      .required('Please fill out this filed')
      .matches(nameReg, 'Please enter a valid url'),
    Images: yup
      .string()
      .required('Please fill out this filed')
      .matches(pdf, 'Please enter a valid url'),
  });

  useEffect(() => {
    getResource();
    //getAccountFilterData();
  }, [search, loding]);

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
      // console.log(newData.CategoryName, '------------data');
      setNewData(data.data.Items[0]);
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(true);
    }
  };
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      // console.log('res : ' + JSON.stringify(res));
      setSingleFile(res);
    } catch (err) {
      setSingleFile(null);

      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
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
  const CategoryRoute = () => (
    <View style={{flex: 1}}>
      <CategoryFilter setFilterData={setFilterData} />
    </View>
  );

  const StatusRoute = () => (
    <View style={{flex: 1}}>
      <StatusFilter setFilterData={setFilterData} />
    </View>
  );

  const DateRoute = () => (
    <View style={{flex: 1}}>
      <DateFilter setFilterData={setFilterData} />
    </View>
  );
  const renderScene = SceneMap({
    category: CategoryRoute,
    status: StatusRoute,
    date: DateRoute,
  });

  const handleIndexChange = index => setstate({index});

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.5,
            ),
          });

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => setstate({index: i})}>
              <Animated.Text style={{opacity}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: '#4E5AC7',
          height: dpforHeight(7),
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <AntDesign
          name="left"
          size={20}
          color="white"
          style={{left: 10, top: 15}}
          onPress={() => navigation.navigate('Expenses')}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: 'white',
            bottom: 5,
          }}>
          Expense Filter
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text
            style={{
              bottom: 25,
              alignSelf: 'flex-end',
              color: 'white',
              right: 20,
            }}>
            CLEAR
          </Text>
        </TouchableOpacity>
      </View>
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        initialLayout={initialLayout}
        style={styles.container}
        renderTabBar={props => (
          <TabBar
            indicatorStyle={{backgroundColor: 'black'}}
            {...props}
            style={{color: 'black', backgroundColor: 'white'}}
            renderLabel={({route, focused, color}) => (
              <Text style={{color: 'black', margin: 8}}>{route.title}</Text>
            )}
          />
        )}
        onIndexChange={handleIndexChange}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
export default FilterScreen;
