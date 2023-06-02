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
import IIcon from 'react-native-vector-icons/Ionicons';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('screen');

const CartFood = props => {
  const {navigation, food} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailFood', food)}>
      <ScrollView>
        <ImageBackground style={styles.imgBack} source={{uri:`https://storage.googleapis.com/healthfood-do/${food.image}`}}>
          <Text
            style={{
              color: COLORS.white,
              fontSize: 22,
              marginTop: 10,
              fontWeight: 'bold',
            }}>
            {food.name}
          </Text>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Icon name="tag" size={22} color={COLORS.xGreen} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    flexDirection: 'row',
                    marginLeft: 10,
                    color: COLORS.white,
                  }}>
                  {food.tag}
                </Text>
              </View>

              <View style={{flexDirection: 'row', marginLeft: 10}}>
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
            <Text style={{color: COLORS.white}}>{food.detail}</Text>
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
