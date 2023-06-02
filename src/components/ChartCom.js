import React, {useState, useEffect} from 'react';
import {Alert, Dimensions, SafeAreaView, StyleSheet} from 'react-native';

import {
  Text,
  View,
} from 'react-native';
import {
  LineChart,
} from 'react-native-chart-kit';
import {COLORS} from '../constants/theme';

const ChartCom = ({dataLabel, dataSet, nameChart, Unit}) => {
  // const { dataLabel, dataSet , nameChart} = props;
  const name = nameChart + ' (' + Unit + ') ';
  return (
    <View
      style={{paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.black}}>
        {Unit ? name : nameChart}
      </Text>
      <LineChart
        data={{
          labels: dataLabel,
          datasets: [
            {
              data: dataSet,
            },
          ],
        }}
        width={Dimensions.get('window').width - 40} // from react-native
        height={220}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#cbe4ac',
          backgroundGradientFrom: '#aaf04f',
          backgroundGradientTo: '#4fe8f0',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '5',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          marginHorizontal: 20,
          borderRadius: 10,
        }}
      />
      <Text style={{fontSize: 10, color: COLORS.black}}>
        Biểu đồ {nameChart} theo thời gian
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({});

export default ChartCom;
