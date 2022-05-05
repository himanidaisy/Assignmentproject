import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import base64 from 'react-native-base64';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SearchBox from '../../components/SearchBox';
import {dpforHeight, dpforWidth} from '../../constants/SizeScreen';
import axios from 'axios';
import {URL} from '../../constants/configure';
import AntDesign from 'react-native-vector-icons/AntDesign';
const {height, width} = Dimensions.get('window');
const ExpensesScreen = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [amount, setamount] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [offset, setOffset] = useState(1);
  useEffect(() => {
    getResource();
    getAccountFilterData();
  }, [search, loding]);

  const getResource = async () => {
    //console.log('getResource');
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
      setOffset(offset + 1);
      //console.log(newData[0].RequestedAmount, '------------data');
      setNewData(data.data.Items);
      setamount(data.data.Items[0]);
      setLoding(false);
    } catch (error) {
      console.log(error);
      setLoding(true);
    }
  };

  //console.log(getResource, 'sbcasjcbnasjcnasdjln');
  const renderFooter = () => {
    return (
      <View>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getResource}
          style={{alignSelf: 'center', bottom: 15}}>
          <Text style={{color: 'black'}}>Load More</Text>
          {loding ? <ActivityIndicator color="black" /> : null}
        </TouchableOpacity>
      </View>
    );
  };
  console.log(renderFooter);
  const setSearchValue = value => {
    setSearch(value);
  };
  const getAccountFilterData = () => {
    if (!loding) {
      const filterValue = newData?.filter(data => {
        if (search.length === 0) {
          return data;
        } else if (
          data.ExpenseDate.includes(search.toLowerCase()) ||
          data.Description.toLowerCase().includes(search.toLowerCase()) ||
          data.ReportStatus.toLowerCase().includes(search.toLowerCase())
        ) {
          // console.log(data);
          return data;
        }
      });
      setFilterData(filterValue);
    }
  };
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.OS == 'ios' ? 10 : 0}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
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
            onPress={() => {
              navigation.navigate('HomeScreen');
              //navigation.goBack();
              //navigation.dispatch(DrawerActions.openDrawer());
            }}
          />

          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              alignSelf: 'center',
              color: 'white',
              bottom: 5,
            }}>
            Expense
          </Text>
          <FontAwesome
            name="filter"
            size={25}
            color="white"
            style={{
              alignSelf: 'flex-end',
              bottom: 30,
              right: 10,
              fontWeight: 'bold',
            }}
            onPress={() => navigation.navigate('FilterExpense')}
          />
        </View>
        <SearchBox setSearchValue={setSearchValue} />
        <View
          style={{
            alignSelf: 'flex-end',
            flexDirection: 'row',
            padding: 10,
            right: 10,
            justifyContent: 'space-evenly',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              right: 3,
            }}>
            Total Expense ₹
          </Text>

          <Text style={{color: 'black'}}>
            {amount.RequestedAmount === null ? '-' : amount.RequestedAmount}
          </Text>
        </View>
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
            enableEmptySections={true}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={({item}) => (
              <View style={styles.appContainer}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    start: 10,
                    color: 'black',
                    fontSize: 15,
                  }}>
                  Travel
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.lebalView}>
                    <Text style={styles.lebal}>Applied On</Text>

                    <Text style={styles.content}>
                      {item.ExpenseDate === null ? '-' : item.ExpenseDate}
                    </Text>
                  </View>

                  <View style={styles.lebalView}>
                    <Text style={styles.lebal}>Expense Date</Text>

                    <Text style={styles.content}>
                      {item.ExpenseDate === null ? '-' : item.ExpenseDate}
                    </Text>
                  </View>
                  <View style={styles.lebalView}>
                    <Text style={styles.lebal}>Amount</Text>

                    <Text style={styles.content}>
                      {item.RequestedAmount === null
                        ? '-'
                        : item.RequestedAmount}
                    </Text>
                  </View>
                </View>
                <View style={styles.lebalView}>
                  <Text style={styles.lebal}>Description</Text>

                  <Text style={styles.content}>
                    {item.Description === null ? '-' : item.Description}
                  </Text>
                </View>
                <View style={styles.lebalView}>
                  <Text style={styles.lebal}>Status</Text>

                  <Text style={styles.content}>
                    {item.ReportStatus === null ? '-' : item.ReportStatus}
                  </Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.mainContainer}>
            <Text style={{alignSelf: 'center', margin: '20%', color: 'black'}}>
              No Data Found
            </Text>
          </View>
        )}
        <View style={{padding: 20}}></View>
        <TouchableOpacity
          style={{
            width: width,
            height: dpforHeight(7),
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            alignSelf: 'center',
            bottom: 0,

            alignSelf: 'flex-end',
            backgroundColor: '#4E5AC7',
            position: 'absolute',
          }}
          onPress={() => {
            navigation.navigate('Add Expenses');
          }}>
          <View style={{flexDirection: 'row', alignSelf: 'center', top: 15}}>
            <FontAwesome
              name="plus"
              size={20}
              color="white"
              style={{right: 10}}
            />
            <Text
              style={{
                fontSize: 15,

                color: 'white',
                fontWeight: 'bold',
              }}>
              Add Expense
            </Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  lebal: {
    fontSize: 15,
    color: 'grey',
    padding: 2,
  },
  content: {
    fontSize: 15,
    color: 'black',
    padding: 3,
  },
  lebalView: {
    flexDirection: 'column',
    margin: 10,
  },
  appContainer: {
    flex: 1,

    marginVertical: 10,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
export default ExpensesScreen;
