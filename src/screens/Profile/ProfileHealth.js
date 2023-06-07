import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Alert, Dimensions, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';
import { Text, View } from 'react-native';
import fonts from '../../constants/fonts';
import HeaderBar from '../../components/HeaderBar';
import { CartInfo } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { get_sick_list, user_health_info } from '../../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { height } = Dimensions.get('window');

const ProfileHealth = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const isFocused = useIsFocused();
  const [sick, setSick] = useState();
  const [sickId, setSickId] = useState();
  const [token, setToken] = useState();
  const [data, setData] = useState({});

  function clickEdit() {
    navigate('ProfileEditHealth');
  }
  useEffect(() => {
    (async () => getInfoToken())();
    if (token) {
      (async () => getInfoHealth(token))();
    }
    if (setSickId) {
      (async () => getInfoSick(sickId))();
    }
  }, [isFocused, token, sickId]);
  const getInfoToken = async () => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
    });
  };
  const getInfoSick = async sickId => {
    await get_sick_list({
      info: 0,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          if (sickId) {
            setSick(res.data.sick[sickId - 1].value);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoHealth = async token => {
    await user_health_info({
      token: token,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setData(res.data.info[0]);
          setSickId(res.data.info[0].sickId);
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
        Thông tin sức khỏe{' '}
      </Text>
      <Text style={{ paddingTop:5,justifyContent: 'center', alignSelf: 'center' }}>Cập nhật lúc : {moment(data.createdAt)
        .utcOffset('+07:00')
        .format('YYYY-MM-DD hh:mm:ss a')}</Text>
      <ScrollView style={{ paddingTop: 10 }}>
        <CartInfo title={'Cân nặng'} data={data.weight} colorBack={'#9fbaf0'} />
        <CartInfo title={'Chiều cao'} data={data.height} colorBack={'#f09f9f'} />
        <CartInfo title={'BMI'} data={data.bmi} colorBack={'#f0d09f'} />
        <CartInfo title={'Huyết áp Tâm trương'} data={data.haTruong} colorBack={'#a9f09f'} />
        <CartInfo title={'Huyết áp Tâm thu'} data={data.haThu} colorBack={'#a9f09f'} />
        <CartInfo title={'Đường huyết'} data={data.duongH} colorBack={'#9fe4f0'} />
        <CartInfo title={'Bệnh'} data={sick} colorBack={'#f09fe5'} />
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
