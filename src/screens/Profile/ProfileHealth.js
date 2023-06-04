import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet,TouchableOpacity } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';
import { Text, View } from 'react-native';
import fonts from '../../constants/fonts';
import HeaderBar from '../../components/HeaderBar';
import { CartInfo } from '../../components';
const { height } = Dimensions.get('window');

const ProfileHealth = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const name = route.params.name;
  const address = route.params.address;
  const age = route.params.age;
  const email = route.params.email;

  function clickEdit(){
    navigate('ProfileEditHealth');
  }

  return (
    <SafeAreaView>
      <HeaderBar navigation={navigation} />
      <Text
        style={{
          marginTop: -35,
          color: COLORS.black,
          fontWeight: 'bold',
          fontSize: 25,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        Thông tin sức khỏe{' '}
      </Text>
      <ScrollView style={{ paddingTop: 20 }}>
        <CartInfo title={'Cân nặng'} data={'14.5'} colorBack={'#9fbaf0'} />
        <CartInfo title={'Chiều cao'} data={'14.5'} colorBack={'#f09f9f'} />
        <CartInfo title={'BMI'} data={'14.5'} colorBack={'#f0d09f'} />
        <CartInfo title={'Huyết áp'} data={'14.5'} colorBack={'#a9f09f'} />
        <CartInfo title={'Đường huyết'} data={'14.5'} colorBack={'#9fe4f0'} />
        <CartInfo title={'Bệnh'} data={'14.5'} colorBack={'#f09fe5'} />
        <TouchableOpacity
          onPress={() => clickEdit()}
          style={{
            marginTop: 20,
            padding: 14,
            marginHorizontal: 90,
            backgroundColor: COLORS.primary,
            marginVertical: 30,
            borderRadius: 10,
            elevation: 12,
          }}>
          <Text style={styles.btnLoginText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btnLoginText: {
    fontWeight: '900',
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.POPPINS_BOLD,
  },
  title: {
    fontSize: 10,
    color: COLORS.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
});

export default ProfileHealth;
