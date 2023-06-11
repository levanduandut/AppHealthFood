import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import images from '../constants/images';
import { SIZES, COLORS } from '../constants/theme';
import { ScrollView } from 'react-native';
import fonts from '../constants/fonts';
import { ChartCom, HeaderBar } from '../components';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user_health_info } from '../api/user_api';
import moment from 'moment';
const { height } = Dimensions.get('window');

const Chart = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const [token, setToken] = useState();
  const [data, setData] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => getInfoToken())();
    if (token) {
      (async () => getInfoHealth(token))();
    }
  }, [isFocused, token]);
  const getInfoToken = async () => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
    });
  };
  const getInfoHealth = async token => {
    await user_health_info({
      token: token,
      limit: 7,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setData(res.data.info);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const labels = data.map(({ updatedAt }) => moment(updatedAt)
    .utcOffset('+07:00')
    .format('DD/MM'));
  const dataSet1 = data.map(({ bmi }) => bmi);
  const dataSet2 = data.map(({ duongH }) => duongH);
  const dataSet3 = data.map(({ haTruong }) => haTruong);
  const dataSet4 = data.map(({ weight }) => weight);
  return (
    <SafeAreaView
      style={{ paddingBottom: 85, flex: 1, backgroundColor: COLORS.white }}>
      {/* <HeaderBar navigation={navigation}/> */}
      <ScrollView style={{}}>
        <ChartCom dataLabel={labels} dataSet={dataSet1} nameChart={'BMI'} />
        <ChartCom
          dataLabel={labels}
          dataSet={dataSet2}
          nameChart={'Đường Huyết'}
          Unit={'mg/dl '}
        />
        <ChartCom
          dataLabel={labels}
          dataSet={dataSet3}
          nameChart={'Huyết Áp'}
          Unit={'mmHg'}
        />
        <ChartCom
          dataLabel={labels}
          dataSet={dataSet4}
          nameChart={'Cân Nặng'}
          Unit={'Kg'}
        />
        <ChartCom
          dataLabel={labels}
          dataSet={dataSet4}
          nameChart={'Calo ăn vào'}
          Unit={'Kalo'}
        />
      </ScrollView>
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

export default Chart;
