import React, {useState, useEffect} from 'react';
import {Alert, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import images from '../constants/images';
import {SIZES, COLORS} from '../constants/theme';
import {
  ScrollView,
} from 'react-native';
import fonts from '../constants/fonts';
import {ChartCom, HeaderBar} from '../components';
const {height} = Dimensions.get('window');

const Chart = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const labels = [
    'Thứ 2',
    'Thứ 3',
    'Thứ 4',
    'Thứ 5',
    'Thứ 6',
    'Thứ 7',
    'Chủ Nhật',
  ];
  const dataSet1 = [
    Math.random() * 30,
    Math.random() * 30,
    Math.random() * 30,
    Math.random() * 30,
    Math.random() * 30,
    Math.random() * 30,
    Math.random() * 30,
  ];
  const dataSet2 = [
    Math.random() * 130,
    Math.random() * 130,
    Math.random() * 130,
    Math.random() * 130,
    Math.random() * 130,
    Math.random() * 130,
    Math.random() * 130,
  ];
  const dataSet3 = [
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
    Math.random() * 100,
  ];
  const dataSet4 = [
    Math.random() * 70,
    Math.random() * 70,
    Math.random() * 70,
    Math.random() * 70,
    Math.random() * 70,
    Math.random() * 70,
    Math.random() * 70,
  ];

  return (
    <SafeAreaView
      style={{paddingBottom: 85, flex: 1, backgroundColor: COLORS.white}}>
      {/* <HeaderBar navigation={navigation}/> */}
      <ScrollView style={{}}>
        <ChartCom
          dataLabel={labels}
          dataSet={dataSet1}
          nameChart={'BMI'}
        />
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
