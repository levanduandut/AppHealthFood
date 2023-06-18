import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';

import { Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { COLORS } from '../constants/theme';

const ChartCom = ({ dataLabel, dataSet, nameChart, targetMin, targetMax, Unit }) => {
  const name = nameChart + ' (' + Unit + ') ';
  const targetDataSetMin = targetMin ? Array(dataLabel.length).fill(targetMin) : [];
  const targetDataSetMax = targetMax ? Array(dataLabel.length).fill(targetMax) : [];
  return (
    <View
      style={{ paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: COLORS.black,
        }}
      >
        {Unit ? name : nameChart}
      </Text>
      {targetMin && targetMax && (
        <LineChart
          data={{
            labels: dataLabel,
            datasets: [
              {
                data: dataSet,
              },
              {
                data: targetDataSetMin,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Màu đỏ cho targetDataSetMin
              },
              {
                data: targetDataSetMax,
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Màu đỏ cho targetDataSetMax
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#cbe4ac',
            backgroundGradientFrom: '#aaf04f',
            backgroundGradientTo: '#4fe8f0',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
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
      )}
      {!targetMin && !targetMax && (
        <LineChart
          data={{
            labels: dataLabel,
            datasets: [
              {
                data: dataSet,
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#cbe4ac',
            backgroundGradientFrom: '#aaf04f',
            backgroundGradientTo: '#4fe8f0',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '0',
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
      )}
      <Text style={{ fontSize: 10, color: COLORS.black }}>
        Biểu đồ {nameChart} theo thời gian
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChartCom;
