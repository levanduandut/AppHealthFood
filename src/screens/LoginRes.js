import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import images from '../constants/images';
import { SIZES, COLORS } from '../constants/theme';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../constants/fonts';
const { height } = Dimensions.get('window');

const LoginRes = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;

  function clickLogin() {
    navigate('Login');
  }
  function clickRes() {
    navigate('Register');
  }

  return (
    <SafeAreaView>
      <View>
        <ImageBackground
          style={styles.imgBack}
          resizeMode="contain"
          source={images.Hehe}
        />

        <View style={styles.viewText}>
          <Text style={styles.title}>
            Bắt đầu trải nghiệm tính năng hữu ích
          </Text>
          <Text style={styles.description}>
            Ăn uống lành mạnh và đầy đủ dinh dưỡng.
          </Text>
        </View>
        <View style={styles.buttonView}>
          <TouchableOpacity
            onPress={() => clickLogin()}
            style={styles.buttonLogin}>
            <Text style={styles.textLogin}>Đăng nhập</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => clickRes()} style={styles.buttonRes}>
            <Text style={styles.textRes}>Đăng ký</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  imgBack: {
    height: height / 2.5,
  },
  viewText: {
    paddingHorizontal: 40,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    color: COLORS.primary,
    fontWeight: '900',
    textAlign: 'center',
  },
  description: {
    paddingTop: 25,
    fontSize: 15,
    color: COLORS.black,
    fontFamily: fonts.POPPINS_BOLD,
    fontWeight: '900',
    textAlign: 'center',
  },
  buttonView: {
    paddingHorizontal: 20,
    paddingTop: 80,
    flexDirection: 'row',
  },
  buttonLogin: {
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '45%',
    borderRadius: 10,
    elevation: 10,
    marginEnd: 30,
  },
  textLogin: {
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
  },
  buttonRes: {
    backgroundColor: COLORS.white,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '45%',
    borderRadius: 10,
    elevation: 10,
  },
  textRes: {
    fontFamily: fonts.POPPINS_BOLD,
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
  },
});

export default LoginRes;
