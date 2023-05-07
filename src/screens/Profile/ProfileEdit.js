import React, {useState, useEffect} from 'react';
import {Alert, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../constants/theme';
import {Text, View} from 'react-native';
import fonts from '../../constants/fonts';
import HeaderBar from '../../components/HeaderBar';
const {height} = Dimensions.get('window');

const ProfileEdit = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const name = route.params.name;
  const address = route.params.address;
  const age = route.params.age;
  const email = route.params.email;
  return (
    <SafeAreaView>
      <HeaderBar navigation={navigation} />
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Tên người dùng : {name}</Text>
        <Text style={styles.title}>Email : {email}</Text>
        <Text style={styles.title}>Tuổi : {age}</Text>
        <Text style={styles.title}>Địa chỉ :{address}</Text>
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
});

export default ProfileEdit;
