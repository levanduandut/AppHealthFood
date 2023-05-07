import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
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
      <ScrollView style={{paddingTop:20}}>
      <CartInfo title={'Cân nặng'} data={'14.5'} colorBack={'#9fbaf0'} />
      <CartInfo title={'Chiều cao'} data={'14.5'} colorBack={'#f09f9f'} />
      <CartInfo title={'BMI'} data={'14.5'} colorBack={'#f0d09f'} />
      <CartInfo title={'Huyết áp'} data={'14.5'} colorBack={'#a9f09f'} />
      <CartInfo title={'Đường huyết'} data={'14.5'} colorBack={'#9fe4f0'} />
      <CartInfo title={'Bệnh'} data={'14.5'} colorBack={'#f09fe5'} />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
});

export default ProfileHealth;
