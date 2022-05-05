import React, {useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  createDrawerNavigator,
  DrawerContent,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import Home from '../screens/Home Screen/Home';
import Login from '../screens/SignIn';

import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  Dimensions,
  Text,
  Image,
  Settings,
  TouchableOpacity,
  Icon,
  Button,
} from 'react-native';

import CustomDrawer from './DrawerContent';
import Expenses from '../screens/Expenses/Expenses';
import Aboutus from '../screens/Aboutus';
import AppSettings from '../screens/AppSettings';
import Contactus from '../screens/Contactus';
const {height, width} = Dimensions.get('window');
const Drawer = createDrawerNavigator();

const DrawerNav = ({navigation}) => {
  <StatusBar translucent backgroundColor="white" />;
  //const [position, setPosition] = useState('right');

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: 'lightblue',
        drawerActiveTintColor: 'red',
        drawerInactiveTintColor: 'black',
        drawerPosition: 'right',
        drawerLabelStyle: {
          fontFamily: 'Roboto-Medium',
          fontSize: 15,
        },
      }}
      initialRouteName="LoginScreen">
      <Drawer.Screen
        drawerContent={props => <CustomDrawer {...props} />}
        name="SignInScreen"
        component={Login}
        options={{
          headerShown: false,
          drawerLabel: () => null,

          //headerLeft: false,
          // headerRight: true,
          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="HomeScreen"
        component={Home}
        options={{
          headerShown: false,
          headerLeft: false,
          drawerLabel: () => null,

          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        drawerContent={props => <CustomDrawer {...props} />}
        name="Expenses"
        component={Expenses}
        options={{
          headerShown: false,
        }}
      />
      <Drawer.Screen
        name="About Us"
        component={Aboutus}
        options={{
          headerShown: true,

          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Contact Us"
        component={Contactus}
        options={{
          headerShown: true,

          headerTitleAlign: 'center',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={AppSettings}
        options={{
          headerShown: true,

          headerTitleAlign: 'center',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
