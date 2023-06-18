import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import images from '../../constants/images';
import { SIZES, COLORS } from '../../constants/theme';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import fonts from '../../constants/fonts';
import UserAvatar from 'react-native-user-avatar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user_info } from '../../api/user_api';
import { useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
const { height } = Dimensions.get('window');

const Profile = props => {
  const { navigation, route } = props;
  const [token, setToken] = useState('token');
  const [email, setEmail] = useState('email');
  const [name, setName] = useState('name');
  const [id, setId] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('age');
  const [address, setAddress] = useState('address');
  const [avatar, setAvatar] = useState(
    '',
  );

  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
      getInfoUser(value);
    });
  }, []);
  const getInfoUser = async token => {
    const tk = await AsyncStorage.getItem('AccessToken');
    setToken(tk);
    user_info({
      jwtToken: token,
    })
      .then(async res => {
        if (!res.data.message) {
          setGender(res.data.user.gender);
          setId(res.data.user.id);
          setEmail(res.data.user.email);
          setName(res.data.user.fullName);
          setAge(res.data.user.age);
          setAddress(res.data.user.address);
          setAvatar(res.data.user.avatar);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const info1 = {
    gender: gender,
    age: age,
    address: address,
    email: email,
    name: name,
    avatar: avatar,
  }
  const clickInfo = () => {
    navigation.navigate('ProfileAccount', info1);
  };
  const clickEdit = () => {
    navigation.navigate('ProfileHistory', info1);
  };
  const clickHealth = () => {
    navigation.navigate('ProfileHealth');
  };

  const clickLogOut = async () => {
    try {
      await AsyncStorage.setItem('isLoggedIn', 'false');
      navigation.navigate('LoginRes');
    } catch (error) {
      console.log('Lỗi khi lưu trạng thái đăng xuất:', error);
    }
  };

  return (
    <ScrollView style={{ marginBottom: 70 }}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            padding: 10,
            width: '100%',
            backgroundColor: '#3CB371',
            height: 200,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
          }}></View>
        <View style={{ alignItems: 'center' }}>
          {!avatar ? (
            <View
              style={{
                width: 140,
                height: 140,
                borderRadius: 140,
                marginTop: -70,
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
                marginTop: -70,
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
        <TouchableOpacity
          onPress={() => clickInfo()}
          activeOpacity={0.5}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            height: 65,
            marginTop: 20,
            marginHorizontal: 40,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 20,
          }}>
          <Ionicons
            name="ios-person-circle-outline"
            size={40}
            color={COLORS.yellow}
          />
          <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 17 }}>
            Thông tin tài khoản
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => clickHealth()}
          activeOpacity={0.5}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            height: 65,
            marginTop: 30,
            marginHorizontal: 40,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 20,
          }}>
          <Icon name="notes-medical" size={35} color={COLORS.yellow} />
          <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 17 }}>
            Thông tin sức khỏe
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => clickEdit()}
          activeOpacity={0.5}
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: COLORS.white,
            height: 65,
            marginTop: 30,
            marginHorizontal: 40,
            paddingVertical: 10,
            borderRadius: 10,
            elevation: 20,
          }}>
          <Icon name="edit" size={33} color={COLORS.yellow} />
          <Text style={{ marginLeft: 10, fontWeight: 'bold', fontSize: 17 }}>
            Lịch sử sức khỏe
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => clickLogOut()}
          style={{
            marginTop: 40,
            padding: 14,
            marginHorizontal: 90,
            backgroundColor: COLORS.red,
            marginVertical: 30,
            borderRadius: 10,
            elevation: 12,
          }}>
          <Text style={styles.btnLoginText}>Đăng xuất</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
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

export default Profile;
