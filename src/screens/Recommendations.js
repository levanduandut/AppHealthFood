import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../constants/theme';
import {
  Text,
  View,
} from 'react-native';
import fonts from '../constants/fonts';
const { height } = Dimensions.get('window');

const Recommendations = props => {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Recommendations</Text>
      </View>
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

export default Recommendations;
