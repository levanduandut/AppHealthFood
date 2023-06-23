import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';
import { Text, View } from 'react-native';
import fonts from '../../constants/fonts';
import UserAvatar from 'react-native-user-avatar';
import HeaderBar from '../../components/HeaderBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { user_info } from '../../api/user_api';
const { height } = Dimensions.get('window');

const ProfileAccount = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const isFocused = useIsFocused();
  const [data, setData] = useState();
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('email');
  const [name, setName] = useState('name');
  const [gender, setGender] = useState('Nam');
  const [avatar, setAvatar] = useState(
    '',
  );
  const [age, setAge] = useState();

  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);

    });
    if (token) {
      getInfoUser(token);
    }
  }, [isFocused, token]);
  const getInfoUser = async token => {
    const tk = await AsyncStorage.getItem('AccessToken');
    setToken(tk);
    user_info({
      jwtToken: token,
    })
      .then(async res => {
        if (!res.data.message) {
          setData(res.data.user);
          setEmail(res.data.user.email);
          setName(res.data.user.fullName);
          setAvatar(res.data.user.avatar);
          setGender(res.data.user.gender);
          setAge(res.data.user.age);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };



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
        Thông tin cá nhân{' '}
      </Text>
      <View style={{ alignItems: 'center' }}>
        {!avatar ? (
          <View
            style={{
              width: 140,
              height: 140,
              borderRadius: 140,
              marginTop: 10,
            }}>
            <UserAvatar size={140} name={name} />
          </View>
        ) : (
          <Image
            source={{ uri: avatar }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 140,
              marginTop: 10,
            }}
          />
        )}
        <Text
          style={{
            fontSize: 25,
            color: COLORS.black,
            fontWeight: 'bold',
            padding: 10,
          }}>
          {name}
        </Text>
        <Text>{email}</Text>
      </View>
      <View
        style={{ paddingHorizontal: 30, paddingVertical: 10, paddingTop: 20 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#abedba',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>Tên người dùng</Text>
          <Text style={styles.data}>{name}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#abebed',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>Tuổi</Text>
          <Text style={styles.data}>{age}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#abebed',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>Giới tính</Text>
          <Text style={styles.data}>{gender === 1 ? "Nữ" : (gender === 2 ? "Nam" : "Khác")}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#edabe2',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>Email</Text>
          <Text style={styles.data}>{email}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => navigate('ProfileEditAccount', data)}
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
    paddingLeft: 20,
    fontSize: 15,
    color: COLORS.black,
  },
  data: {
    fontSize: 20,
    color: COLORS.red,
    fontFamily: fonts.POPPINS_BOLD,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default ProfileAccount;
