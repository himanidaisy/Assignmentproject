import React, {useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {IMAGES} from '../../constants/Images';
import Entypo from 'react-native-vector-icons/Entypo';
const {height, width} = Dimensions.get('window');
import {dpforHeight, dpforWidth} from '../../constants/SizeScreen';
const Home = ({navigation}) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View
        style={{
          backgroundColor: '#4E5AC7',
          height: dpforHeight(7),
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            alignSelf: 'center',
            color: 'white',
            top: 15,
          }}>
          Home Screen
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}>
          <Entypo
            name="menu"
            size={30}
            style={{alignSelf: 'flex-end', bottom: 10, right: 10}}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <View
          style={{
            top: 30,
            start: 10,
            flexDirection: 'row',
          }}>
          <ScrollView horizontal={true} persistentScrollbar={true}>
            <Image
              source={IMAGES.expense}
              style={{
                width: width / 1.2,
                height: height / 3,
                alignSelf: 'center',
                margin: 20,
                resizeMode: 'contain',
              }}
            />

            <Image
              source={IMAGES.expenses}
              style={{
                width: width / 1.2,
                height: height / 3,
                alignSelf: 'center',
                margin: 20,
                right: 30,
                resizeMode: 'contain',
              }}
            />

            <Image
              source={IMAGES.expensess}
              style={{
                width: width / 1.2,
                height: height / 3,
                end: 40,
                resizeMode: 'contain',
              }}
            />
          </ScrollView>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            top: 70,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Expenses');
            }}>
            <Image
              source={IMAGES.myexpenses}
              style={{
                width: width / 3,
                height: height / 6,
                borderWidth: 1,
                borderColor: 'black',
                resizeMode: 'contain',
                alignSelf: 'center',
                top: 30,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Add Expenses');
            }}>
            <Image
              source={IMAGES.addexpenses}
              style={{
                width: width / 3,
                height: height / 6,
                borderWidth: 1,
                borderColor: 'black',
                resizeMode: 'contain',
                alignSelf: 'center',
                top: 30,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {flex: 1},
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
export default Home;
