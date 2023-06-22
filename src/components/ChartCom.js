import React, {useState, useEffect, useMemo} from 'react';
import {Alert, Dimensions, SafeAreaView, StyleSheet} from 'react-native';

import {Text, View} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {COLORS} from '../constants/theme';

const ChartCom = ({
  dataLabel,
  dataSet,
  nameChart,
  targetMin,
  targetMax,
  Unit,
}) => {
  const name = nameChart + ' (' + Unit + ') ';
  const targetDataSetMin = targetMin
    ? Array(dataLabel.length).fill(targetMin)
    : [];
  const targetDataSetMax = targetMax
    ? Array(dataLabel.length).fill(targetMax)
    : [];
  const chartConfig = useMemo(
    () => ({
      backgroundColor: '#a1ff2d',
      backgroundGradientFrom: '#ffffff',
      backgroundGradientTo: '#ffffff',
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(102, 255, 102, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
      style: {
        borderRadius: 16,
      },
      propsForDots: {
        r: '0',
        strokeWidth: '2',
        stroke: '#ffa726',
      },
    }),
    [],
  );
  return (
    <View
      style={{paddingTop: 20, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: COLORS.black,
        }}>
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
                color: (opacity = 1) => `rgba(255, 255, 0, ${opacity})`, // Màu đỏ cho targetDataSetMin
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
          segments={5}
          fromZero={true}
          yAxisInterval={1}
          chartConfig={chartConfig}
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
          segments={5}
          yAxisSuffix=""
          yAxisInterval={1}
          chartConfig={{
            backgroundColor: '#a1ff2d',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(102, 255, 102, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '1',
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
          renderDotContent={({x, y, index}) => (
            <Text
              key={index}
              style={{
                position: 'absolute',
                left: x + 5,
                top: y - 20,
                textAlign: 'center',
                color: 'blue',
                fontSize: 12,
              }}>
              {dataSet[index]}
            </Text>
          )}
        />
      )}
      <Text style={{fontSize: 10, color: COLORS.black}}>
        Biểu đồ {nameChart} theo thời gian
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ChartCom;
