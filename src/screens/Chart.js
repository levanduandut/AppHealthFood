import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
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
      (async () => getInfoAbsorb(token))();
      (async () => getInfoHealth(token))();

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
      limit: 8,
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
      <View style={{ paddingTop: 70 }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <View style={{ justifyContent: 'center', alignItems: 'center', height: height, alignSelf: 'center' }}>
        <Text>Chưa có thông tin sức khỏe</Text>
        <Text>Nên chúng tôi chưa thể load biểu đồ </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ marginBottom: 85, marginTop: 10 }}>
      {Array.isArray(datax1) && datax1.length > 0 && Array.isArray(labelsx) && labelsx.length > 0 && (
        <ChartCom
          dataLabel={labelsx}
          dataSet={datax1}
          nameChart={'Calo ăn vào'}
          Unit={'Kalo'}
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
      <View style={styles.note}>
        <Text style={{ color: COLORS.black }}>Chú thích</Text>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: 'rgba(102, 255, 102, 1)' }]} />
          <Text style={styles.legendText}>Data</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: 'rgba(255, 255, 0, 1)' }]} />
          <Text style={styles.legendText}>Giới hạn an toàn dưới</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: 'rgba(255, 0, 0, 1)' }]} />
          <Text style={styles.legendText}>Giới hạn an toàn trên</Text>
        </View>
      </View>
      {data1.length > 0 && (
        <ChartCom dataLabel={labels} dataSet={data1} nameChart={'BMI'} targetMin={18.5} targetMax={25} />
      )}
      {data2.length > 0 && (
        <ChartCom
          dataLabel={labels}
          dataSet={data2}
          nameChart={'Đường Huyết'} targetMin={70} targetMax={130}
          Unit={'mg/dl '}
        />
      )}
      {data3.length > 0 && (
        <ChartCom
          dataLabel={labels}
          dataSet={data3}
          nameChart={'Huyết Áp'} targetMin={90} targetMax={130}
          Unit={'mmHg'}
        />
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  note: {
    justifyContent: 'center',
    alignSelf: 'flex-end',
    paddingRight: 30,
    top: 30,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  legendIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
  },
  title: {
    fontSize: 30,
    color: COLORS.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
});

export default Chart;
