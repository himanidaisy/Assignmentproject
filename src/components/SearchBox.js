import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SearchBox = props => {
  const handleChangeValue = value => {
    props.setSearchValue(value);
  };
  return (
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
        style={styles.textInput}
        onChangeText={handleChangeValue}
        value={props.search}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 20,
    fontSize: 15,
    flex: 1,
    marginTop: 1,
  },
});
export default SearchBox;
