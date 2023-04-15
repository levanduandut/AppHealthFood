import React, {useState, useEffect} from 'react';
import {Alert, Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import images from '../../constants/images';
import {SIZES, COLORS} from '../../constants/theme';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../../constants/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('screen');

const FoodItem = props => {
  const {navigation, lifestyle} = props;
  return (
    <TouchableOpacity>
      
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
});

export default FoodItem;
