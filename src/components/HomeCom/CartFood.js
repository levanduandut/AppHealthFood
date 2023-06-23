import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';

import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL_IMAGE } from '@env';
const { width } = Dimensions.get('screen');

const CartFood = props => {
  const { navigation, food } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailFood', food)}>
      <ScrollView>
        <ImageBackground style={styles.imgBack} source={food.image ? { uri: `${URL_IMAGE}${food.image}` } : { uri: 'https://vapa.vn/wp-content/uploads/2022/12/anh-nen-mau-trang-001.jpg' }}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 22,
              marginTop: 10,
              fontWeight: 'bold',
              textShadowColor: COLORS.black,
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 10,
            }}>
            {food.title}
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Icon name="tag" size={22} color={COLORS.xGreen} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    flexDirection: 'row',
                    marginLeft: 10,
                    color: COLORS.white,
                    textShadowColor: COLORS.black,
                    textShadowOffset: { width: 1, height: 1 },
                    textShadowRadius: 10,
                  }}>
                  {food.tag}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                <Icon name="star" size={22} color={COLORS.yellow} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    flexDirection: 'row',
                    marginLeft: 10,
                    color: COLORS.white,
                  }}>
                  {food.star}
                </Text>
              </View>
            </View>
            <Text style={{ color: COLORS.white }}>{food.detail}</Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  imgBack: {
    height: 200,
    width: width - 40,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 5,
  },
});

export default CartFood;
