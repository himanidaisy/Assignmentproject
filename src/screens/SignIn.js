import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {IMAGES} from '../constants/Images';
import {Formik} from 'formik';
import * as yup from 'yup';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {URL} from '../constants/configure';

const {height, width} = Dimensions.get('window');

const Login = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const loginValidationSchema = yup.object().shape({
    mobile: yup
      .string()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        'Phone number is not valid',
      )
      .required('Please fill out this filed'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Please fill out this filed'),
  });
  const postUser = async values => {
    console.log(values);
    let body = {
      username: values.mobile,
      password: values.password,
    };
    const requestOptions = {
      method: 'POST',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      headers: {Authorization: 'Basic ' + 'mobile:password'},
    };

    try {
      const {data} = await axios.post(
        URL.BASE_URL + '/Account/authenticate',
        body,
      );

      console.log(data.success);

      if (data.message) {
        ToastAndroid.showWithGravity(
          'Signed In successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
      if (data.success) {
        navigation.navigate('HomeScreen');
        ToastAndroid.showWithGravity(
          'Signed In successfully',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else {
        ToastAndroid.showWithGravity(
          'Invalid mobile number and password',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      }
    } catch (err) {
      ToastAndroid.showWithGravity(
        'Please check user mobile number and password',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  const handleSubmit = values => {
    postUser(values);
  };
  const loadButton = () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.ImageView}>
          <Image source={IMAGES.nimaplogo} style={styles.ImageStyle} />
        </View>
        <View style={styles.loginContainer}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{mobile: '', password: ''}}
            onSubmit={handleSubmit}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              isValid,
              touched,
            }) => (
              <>
                <View style={styles.textInputStyle}>
                  <TextInput
                    placeholder="Mobile Number"
                    style={styles.textInput}
                    onChangeText={handleChange('mobile')}
                    onBlur={handleBlur('mobile')}
                    keyboardType="numeric"
                    maxLength={10}
                  />
                </View>
                {errors.mobile && touched.mobile && (
                  <Text style={styles.errorText}>{errors.mobile}</Text>
                )}

                <View style={styles.textInputStyle}>
                  <TextInput
                    placeholder="Password"
                    style={styles.textInput}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry={visible}
                    maxLength={15}
                  />
                  <TouchableOpacity
                    style={styles.btnStyle}
                    onPress={() => {
                      setShow(!show);
                      setVisible(!visible);
                    }}>
                    <Entypo
                      name={show === true ? 'eye' : 'eye-with-line'}
                      size={26}
                      color={'grey'}
                    />
                  </TouchableOpacity>
                </View>

                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    handleSubmit();
                    loadButton();
                  }}
                  disabled={!isValid}>
                  {loading ? (
                    <ActivityIndicator animating={loading} color="white" />
                  ) : (
                    <Text style={styles.textStyle}>Sign In</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  ImageView: {
    width: width / 2,
    alignSelf: 'center',
    height: height / 3,
    justifyContent: 'center',
    marginVertical: 20,
  },
  ImageStyle: {
    alignSelf: 'center',
  },
  loginContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    backgroundColor: 'white',
  },
  textInputStyle: {
    padding: 6,
    width: width / 1.1,
    borderWidth: 1,
    borderColor: 'grey',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 15,
  },
  textInput: {
    fontSize: 15,
  },
  buttonStyle: {
    backgroundColor: '#4E5AC7',
    padding: 20,
    width: width / 1.1,
    borderRadius: 10,
    top: width / 3,
  },
  textStyle: {
    alignSelf: 'center',
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },

  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  btnStyle: {
    position: 'absolute',
    marginTop: '5%',
    right: '5%',
  },
});

export default Login;
