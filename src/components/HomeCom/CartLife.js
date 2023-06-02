import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import images from '../../constants/images';
import { SIZES, COLORS } from '../../constants/theme';
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
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('screen');

const CartLife = props => {
  const { navigation, lifestyle } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailFood', lifestyle)}>
      <ImageBackground style={styles.imgBack} source={{ uri: `https://storage.googleapis.com/healthfood-do/${lifestyle.image}` }}>
        <Text
          style={{
            color: COLORS.yellow,
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 10,
            textShadowColor: COLORS.black,
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 10,
          }}>
          {lifestyle.title}
        </Text>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Icon name="tag" size={20} color={COLORS.green}></Icon>
            <Text
              style={{
                marginLeft: 5,
                color: COLORS.white,
                fontWeight: 'bold',
                textShadowColor: COLORS.black,
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 5,
              }}>
              {lifestyle.tag}
            </Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                marginRight: 5,
                color: COLORS.white,
                fontWeight: 'bold',
              }}>
              {lifestyle.star}
            </Text>
            <Icon name="star" size={20} color={COLORS.yellow}></Icon>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  imgBack: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
  },
});

export default CartLife;
