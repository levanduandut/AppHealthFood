import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from 'react-native';
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
import Icon from 'react-native-vector-icons/Ionicons';
import IIcon from 'react-native-vector-icons/Feather';
import { URL_IMAGE } from '@env';
const { height } = Dimensions.get('window');

const DetailFood = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const x = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar translucent backgroundColor={COLORS.grey}></StatusBar>
      <ImageBackground style={{ flex: 0.5 }} source={{ uri: `${URL_IMAGE}${x.image}` }}>
        <View style={styles.header}>
          <Icon
            name="arrow-back"
            size={28}
            color={COLORS.xGreen}
            onPress={() => goBack()}
          />
          <IIcon
            name="more-vertical"
            size={28}
            color={COLORS.xGreen}
            onPress={() => goBack()}
          />
        </View>
        <View style={styles.titleBack}>
          <Text
            style={{
              width: '70%',
              fontSize: 30,
              fontWeight: 'bold',
              color: COLORS.white,
              marginBottom: 20,
              textShadowColor: COLORS.black,
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 5,
            }}>
            {x.title}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: 15 }}>
            <Icon name="star" size={22} color={COLORS.yellow} />
            <Text
              style={{
                fontWeight: 'bold',
                flexDirection: 'row',
                marginLeft: 10,
                color: COLORS.white,
              }}>
              {x.star}
            </Text>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.detailContainer}>
        <View style={styles.iconContainer}>
          <Icon name="bookmark" color={COLORS.primary} size={30} />
        </View>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <IIcon name="tag" size={28} color={COLORS.xGreen} />
          <Text
            style={{
              marginLeft: 5,
              fontSize: 20,
              fontWeight: 'bold',
              color: COLORS.primary,
            }}>
            {x.tag}
          </Text>
        </View>
        <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 20 }}>
          {x.categoryId === 3 ? 'Lưu ý' : (x.categoryId === 4 ? 'Mẹo vặt' : (x.categoryId === 1 ? 'Lối sống' : 'Công thức nấu ăn'))}
        </Text>
        <ScrollView
          style={{ flex: 1, marginTop: 20 }}
          contentContainerStyle={{ minHeight: '100%' }}
          automaticallyAdjustKeyboardInsets={true}>
          <Text style={{ marginTop: 20, lineHeight: 22, color: '#000000' }}>{x.detail}</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  iconContainer: {
    height: 60,
    width: 60,
    position: 'absolute',
    top: -30,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    right: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    top: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    flex: 0.5,
  },
  titleBack: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    position: 'absolute',
    bottom: 30,
  },
  header: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 30,
    color: COLORS.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
});

export default DetailFood;
