import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import images from '../constants/images';
import { SIZES, COLORS } from '../constants/theme';
import { ScrollView } from 'react-native';
import fonts from '../constants/fonts';
import { ChartCom, HeaderBar } from '../components';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user_absorb_info, user_health_info } from '../api/user_api';
import moment from 'moment';
const { height } = Dimensions.get('window');

const Chart = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const isFocused = useIsFocused();
  const [token, setToken] = useState();
  const [data, setData] = useState(null);
  const [datax, setDataX] = useState(null);
  const [datax1, setDataX1] = useState([]);
  const [labelsx, setLabelsX] = useState([]);
  const [labels, setLabels] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  useEffect(() => {
    (async () => getInfoToken())();
    if (token) {
      (async () => getInfoHealth(token))();
      (async () => getInfoAbsorb(token))();
    }
  }, [isFocused, token]);
  useEffect(() => {
    if (data) {
      setLabels(
        data.map(({ updatedAt }) =>
          moment(updatedAt).utcOffset('+07:00').format('DD/MM')
        )
      );
      setData1(data.map(({ bmi }) => bmi));
      setData2(data.map(({ duongH }) => duongH));
      setData3(data.map(({ haTruong }) => haTruong));
      setData4(data.map(({ weight }) => weight));
    }
  }, [data]);
  useEffect(() => {
    if (datax) {
      setLabelsX(
        datax.map(({ updatedAt }) =>
          moment(updatedAt).utcOffset('+07:00').format('DD/MM')
        )
      );
      setDataX1(datax.map(({ totalCalo }) => totalCalo));
    }
  }, [datax]);

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
          setData(res.data.info.reverse());
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoAbsorb = async token => {
    await user_absorb_info({
      token: token,
      limit: 7,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setDataX(res.data.info.reverse());
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (data === null || datax === null) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <View>
        <Text>Error: Failed to retrieve data.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ marginBottom: 70, marginTop: 10 }}>
      {datax.length > 0 && (
        <ChartCom
          dataLabel={labelsx}
          dataSet={datax1}
          nameChart={'Calo ăn vào'}
          Unit={'Kalo'}
        />
      )}
      {data1.length > 0 && (
        <ChartCom dataLabel={labels} dataSet={data1} nameChart={'BMI'} />
      )}
      {data2.length > 0 && (
        <ChartCom
          dataLabel={labels}
          dataSet={data2}
          nameChart={'Đường Huyết'}
          Unit={'mg/dl '}
        />
      )}
      {data3.length > 0 && (
        <ChartCom
          dataLabel={labels}
          dataSet={data3}
          nameChart={'Huyết Áp'}
          Unit={'mmHg'}
        />
      )}
      {data4.length > 0 && (
        <ChartCom
          dataLabel={labels}
          dataSet={data4}
          nameChart={'Cân Nặng'}
          Unit={'Kg'}
        />
      )}
      
    </ScrollView>
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
