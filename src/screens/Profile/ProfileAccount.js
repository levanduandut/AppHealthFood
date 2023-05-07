import React, {useState, useEffect} from 'react';
import {Alert, Dimensions, Image, SafeAreaView, StyleSheet} from 'react-native';
import {SIZES, COLORS} from '../../constants/theme';
import {Text, View} from 'react-native';
import fonts from '../../constants/fonts';
import UserAvatar from 'react-native-user-avatar';
import HeaderBar from '../../components/HeaderBar';
const {height} = Dimensions.get('window');

const ProfileAccount = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const name = route.params.name;
  const address = route.params.address;
  const age = route.params.age;
  const email = route.params.email;
  const avatar = route.params.avatar;

  return (
    <SafeAreaView>
      <HeaderBar navigation={navigation} />
      <Text
        style={{
          marginTop: 20,
          color: COLORS.black,
          fontWeight: 'bold',
          fontSize: 25,
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        Thông tin cá nhân{' '}
      </Text>
      <View style={{alignItems: 'center'}}>
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
            source={{uri: avatar}}
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
        style={{paddingHorizontal: 30, paddingVertical: 10, paddingTop: 20}}>
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
      <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#d4edab',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>Địa chỉ</Text>
          <Text style={styles.data}>{address}</Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
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
      <View style={{paddingHorizontal: 30, paddingVertical: 10}}>
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title: {
    paddingLeft:20,
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
