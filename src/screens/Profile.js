import React, {useState, useEffect} from 'react';
import {Alert, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import images from '../constants/images';
import {SIZES, COLORS} from '../constants/theme';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../constants/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height} = Dimensions.get('window');

const Profile = props => {
  const {navigation, route} = props;
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then(value => {
      setToken(value);
    });
  });

  const clickLogUot = () => {
    AsyncStorage.clear();
    navigation.replace('Login');
  };
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Token : {token}</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    color: COLORS.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
});

export default Profile;
