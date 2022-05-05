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
  TouchableWithoutFeedback,
  Modal,
  Image,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import base64 from 'react-native-base64';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextInput} from 'react-native-paper';
import {dpforHeight, dpforWidth} from '../../constants/SizeScreen';
import axios from 'axios';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {launchImageLibrary} from 'react-native-image-picker';
const Tab = createMaterialTopTabNavigator();
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as yup from 'yup';
import {URL} from '../../constants/configure';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';
import {ScrollView} from 'react-native-gesture-handler';
const {height, width} = Dimensions.get('window');
const ExpensesScreen = ({navigation}) => {
  const [newData, setNewData] = useState([]);
  const [loding, setLoding] = useState(true);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [CategoryTouched, setCategoryTouched] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');
  const nameReg = /^[^-\s][a-zA-Z\s-]+$/;
  const [pickerResponse, setPickerResponse] = useState(null);
  const pdf = /(http(s?)):\/\//i;
  const number = /^[0-9]*$/;
  const loginValidationSchema = yup.object().shape({
    CategoryName: yup.string().required('Please fill out this filed'),
    ExpenseDate: yup.string().required('Please fill out this filed'),

    RequestedAmount: yup
      .string()
      .required('Please fill out this filed')
      .matches(number, 'Please enter a valid number'),

    Description: yup.string().required('Please fill out this filed'),

    Event: yup.string().required('Please fill out this filed'),

    Images: yup
      .string()
      .required('Please fill out this filed')
      .matches(pdf, 'Please enter a valid url'),
  });

  useEffect(() => {
    getResource();
    getAccountFilterData();
  }, [search, loding, newData]);

  const getResource = async () => {
    try {
      let token = base64.encode('8113899206' + ':' + '12345678');

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
  const selectFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

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
  const expenseOptions = newData.filter(t => t.CategoryName !== null);
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
          return data;
        }
      });
      setFilterData(filterValue);
    }
  };
  const openGallery = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    launchImageLibrary(options, setPickerResponse);
  };

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  const postUser = async values => {
    console.log(values, 'caluesssssss');
    try {
      const token = await AsyncStorage.getItem('token');

      const requestOptions = {
        method: 'POST',
        Accept: 'application/json',
        'Content-Type': 'application/json',
        headers: {Authorization: 'Bearer ' + token},
      };

      const {data} = await axios.post(
        URL.BASE_URL + '/Expense/Report',
        values,
        requestOptions,
      );

      if (data.message) {
        Toast.showWithGravity(
          'Expense Added Successfully',
          Toast.LONG,
          Toast.BOTTOM,
        );
      }
      navigation.goBack();
    } catch (err) {
      Toast.showWithGravity(
        'Expense Not Added Successfully',
        Toast.LONG,
        Toast.BOTTOM,
      );
    }
  };
  const loadButton = () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const handleSubmit = values => {
    console.log(values, 'new values');
    console.log('Clicked');
    postUser(values);
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
          onPress={() => navigation.goBack()}
        />

        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: 'white',
            bottom: 5,
          }}>
          Add Expense
        </Text>
      </View>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{
          CategoryName: '',
          ExpenseDate: '',
          RequestedAmount: '',
          Description: '',
          Event: '',
          Images: '',
        }}
        enableReinitialize={true}
        onSubmit={values => {
          handleSubmit(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,

          errors,
          isValid,
          touched,
          values,
          setFieldValue,
        }) => (
          <>
            <View style={{height: height / 1.2}}>
              <ScrollView>
                <View style={{height: height / 0.3}}>
                  <View
                    style={{
                      height: dpforHeight(7),

                      width: width,
                      top: 10,
                    }}>
                    <TextInput
                      label="Category*"
                      theme={{
                        colors: {
                          text: 'black',
                          accent: 'black',
                          primary: 'black',
                          placeholder: 'black',
                        },
                      }}
                      name="Category"
                      keyboardType="default"
                      underlineColor="transparent"
                      value={selectedItem}
                      style={{
                        backgroundColor: 'white',
                        marginHorizontal: 20,
                        borderRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        fontSize: 15,
                        top: 3,
                      }}
                      onValueChange={itemValue => {
                        setFieldValue('Category', itemValue);
                        setCategoryTouched(true);
                      }}
                    />
                    <AntDesign
                      name="right"
                      size={20}
                      color="black"
                      style={{bottom: 40, right: 30, alignSelf: 'flex-end'}}
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                  </View>
                  <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                      Alert.alert('modal closed');
                      setModalVisible(!modalVisible);
                    }}>
                    <View
                      style={{
                        backgroundColor: 'black',
                        flex: 1,

                        opacity: 0.7,
                        top: 50,
                      }}></View>

                    <View
                      style={{
                        backgroundColor: 'white',
                        height: height / 1.3,
                        top: 20,
                        elevation: 2,
                        borderWidth: 1,

                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                      }}>
                      <View style={{margin: 20, start: 10}}>
                        <FontAwesome
                          name="close"
                          color="white"
                          size={30}
                          style={{
                            alignSelf: 'flex-end',
                            bottom: 70,
                            right: 10,
                          }}
                          onPress={() => setModalVisible(!modalVisible)}
                        />
                        <Text
                          style={{
                            color: 'black',
                            fontSize: 16,
                            bottom: 20,
                            fontWeight: 'bold',
                          }}>
                          Expense Category
                        </Text>
                        <View
                          style={{
                            width: wp('85%'),
                            height: hp('7%'),
                            bottom: 20,
                            right: 30,
                            borderRadius: 10,
                          }}>
                          <TextInput
                            placeholder="search"
                            underlineColor="transparent"
                            style={{
                              backgroundColor: 'white',
                              marginHorizontal: 20,
                              fontSize: 15,
                              top: 3,
                            }}
                            onChangeText={handleChangeValue}
                            value={search}
                          />
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
                            renderItem={({item}) => (
                              <View style={styles.appContainer}>
                                <View
                                  style={{
                                    flexDirection: 'column',
                                    color: 'black',
                                    bottom: 20,
                                    right: 25,
                                  }}>
                                  <TouchableWithoutFeedback
                                    style={{color: 'black'}}
                                    onPress={event => {
                                      console.log(
                                        typeof item.CategoryName,
                                        'CategoryName',
                                      );
                                      setModalVisible(!modalVisible);
                                      setSelectedItem(item.CategoryName);
                                    }}>
                                    <View style={styles.listContainer}>
                                      <Text style={styles.listText}>
                                        {item.CategoryName}
                                      </Text>
                                    </View>
                                  </TouchableWithoutFeedback>
                                </View>
                              </View>
                            )}
                          />
                        ) : (
                          <View style={styles.mainContainer}></View>
                        )}
                      </View>
                    </View>
                  </Modal>
                  {errors.CategoryName && touched.CategoryName === false && (
                    <Text style={styles.errorStyle}>{errors.CategoryName}</Text>
                  )}
                  <TouchableOpacity
                    style={{
                      width: dpforWidth(90),
                      height: dpforHeight(9),
                      margin: 5,
                      top: 30,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      backgroundColor: 'white',
                      marginStart: 20,
                      borderRadius: 10,
                    }}>
                    <DatePicker
                      style={{width: '100%', top: 12}}
                      date={values.ExpenseDate}
                      minDate={new Date(Date.now() + 10 * 60 * 1000)}
                      mode="date"
                      value={values.ExpenseDate}
                      placeholder="Date*"
                      format="DD MMMM YYYY"
                      confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      showIcon={false}
                      customStyles={{
                        dateInput: {
                          borderWidth: 0,

                          position: 'absolute',
                          left: 15,
                          fontSize: 15,
                        },
                      }}
                      onDateChange={itemValue => {
                        setFieldValue('ExpenseDate', itemValue);
                        console.log(values.ExpenseDate);
                      }}
                    />

                    <FontAwesome
                      name="calendar-plus-o"
                      size={20}
                      style={{alignSelf: 'center', right: 40}}
                    />
                  </TouchableOpacity>
                  {errors.ExpenseDate && touched.ExpenseDate && (
                    <Text style={styles.errorStyle}>{errors.ExpenseDate}</Text>
                  )}
                  <View
                    style={{
                      height: dpforHeight(7),
                      top: 10,
                      width: width,
                      marginTop: 20,
                    }}>
                    <TextInput
                      label="Amount (₹)*"
                      value={values.RequestedAmount}
                      theme={{
                        colors: {
                          text: 'black',
                          accent: 'black',
                          primary: 'black',
                          placeholder: 'black',
                        },
                      }}
                      name="RequestedAmount"
                      maxLength={25}
                      underlineColor="transparent"
                      keyboardType="default"
                      style={{
                        backgroundColor: 'white',
                        marginHorizontal: 20,
                        borderRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        fontSize: 15,
                        top: 3,
                      }}
                      onChangeText={handleChange('RequestedAmount')}
                      onBlur={handleBlur('RequestedAmount')}
                    />
                  </View>
                  {errors.RequestedAmount && touched.RequestedAmount && (
                    <Text style={styles.errorStyle}>
                      {errors.RequestedAmount}
                    </Text>
                  )}
                  <View
                    style={{
                      height: dpforHeight(7),
                      top: 15,
                      width: width,
                      marginTop: 20,
                    }}>
                    <TouchableOpacity onPress={() => openGallery()}>
                      <TextInput
                        label="Attach Reciept*"
                        value={values.Images}
                        theme={{
                          colors: {
                            text: 'black',
                            accent: 'black',
                            primary: 'black',
                            placeholder: 'black',
                          },
                        }}
                        name="Images"
                        keyboardType="default"
                        underlineColor="transparent"
                        style={{
                          backgroundColor: 'white',
                          marginHorizontal: 20,
                          borderRadius: 10,
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          fontSize: 15,
                          top: 3,
                        }}
                        onChangeText={handleChange('Images')}
                        onBlur={handleBlur('Images')}
                      />
                      {uri && (
                        <Image
                          source={{uri}}
                          style={{height: 100, width: 100, margin: 20}}></Image>
                      )}

                      <FontAwesome
                        name="paperclip"
                        size={20}
                        style={{alignSelf: 'flex-end', right: 40, bottom: 40}}
                      />
                    </TouchableOpacity>
                  </View>
                  {errors.Images && touched.Images && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        textAlign: 'center',
                        top: 35,
                      }}>
                      {errors.Images}
                    </Text>
                  )}
                  <View
                    style={{
                      height: dpforHeight(7),
                      top: 20,
                      width: width,
                      marginTop: 20,
                    }}>
                    <TextInput
                      label="Description"
                      value={values.Description}
                      theme={{
                        colors: {
                          text: 'black',
                          accent: 'black',
                          primary: 'black',
                          placeholder: 'black',
                        },
                      }}
                      name="Description"
                      underlineColor="transparent"
                      maxLength={25}
                      keyboardType="default"
                      style={{
                        backgroundColor: 'white',
                        marginHorizontal: 20,
                        borderRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        fontSize: 15,
                        top: 3,
                      }}
                      onChangeText={handleChange('Description')}
                      onBlur={handleBlur('Description')}
                    />
                  </View>
                  {errors.Description && touched.Description && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        textAlign: 'center',
                        top: 40,
                      }}>
                      {errors.Description}
                    </Text>
                  )}
                  <View
                    style={{
                      height: dpforHeight(7),
                      top: 25,
                      width: width,
                      marginTop: 20,
                    }}>
                    <TextInput
                      label="Event*"
                      theme={{
                        colors: {
                          text: 'black',
                          accent: 'black',
                          primary: 'black',
                          placeholder: 'black',
                        },
                      }}
                      name="Event"
                      value={values.Event}
                      maxLength={25}
                      underlineColor="transparent"
                      keyboardType="default"
                      style={{
                        backgroundColor: 'white',
                        marginHorizontal: 20,
                        borderRadius: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        fontSize: 15,
                        top: 3,
                      }}
                      onChangeText={handleChange('Event')}
                      onBlur={handleBlur('Event')}
                    />
                  </View>
                  {errors.Event && touched.Event && (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        textAlign: 'center',
                        top: 45,
                      }}>
                      {errors.Event}
                    </Text>
                  )}
                </View>
              </ScrollView>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <TouchableOpacity
                style={{
                  width: width - 20,
                  height: dpforHeight(7),
                  borderRadius: 10,
                  alignSelf: 'center',
                  bottom: 0,

                  backgroundColor: '#4E5AC7',
                  position: 'absolute',
                }}
                onPress={() => {
                  handleSubmit();
                  loadButton();
                }}>
                {loading ? (
                  <ActivityIndicator
                    style={{top: 15}}
                    animating={loading}
                    color="white"
                  />
                ) : (
                  <Text
                    style={{
                      fontSize: 15,
                      alignSelf: 'center',
                      top: 15,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Send Claim
                  </Text>
                )}
              </TouchableOpacity>
            </View>
            <View style={{padding: 5}}></View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,

    marginVertical: 10,
    padding: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  errorStyle: {fontSize: 15, color: 'red', textAlign: 'center', top: 30},
  mainContainer: {
    flex: 1,
  },
});
export default ExpensesScreen;
