import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SIZES, COLORS} from '../../constants/theme';
import {Text, View} from 'react-native';
import fonts from '../../constants/fonts';
import HeaderBar from '../../components/HeaderBar';
const {height} = Dimensions.get('window');

const ProfileEdit = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const name = route.params.name;
  const address = route.params.address;
  const age = route.params.age;
  const email = route.params.email;
  const InputEdit = props => {
    const {title, data, colorBack} = props;
    return (
      <View style={{flexDirection: 'column'}}>
        <Text>{title}</Text>
        <TextInput style={styles.inputText} />
      </View>
    );
  };
  return (
    <SafeAreaView>
      <HeaderBar navigation={navigation} />
      <View style={{padding: 20}}>
        <InputEdit/>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    color: COLORS.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
  inputText: {
    fontSize: 15,
    padding: 10,
    backgroundColor: '#fcdd9b',
    borderRadius: 10,
    marginVertical: 5,
  },
});

export default ProfileEdit;
