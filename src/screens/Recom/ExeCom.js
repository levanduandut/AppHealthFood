import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { URL_IMAGE } from '@env';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('screen');

const ExeCom = props => {
  const { navigation, exe } = props;
  const MAX_CHARACTERS_PER_LINE = 20; // Số ký tự tối đa trên mỗi dòng

  const breakTextIntoLines = (text) => {
    const words = text.split(' ');
    let currentLine = '';
    let lines = [];

    words.forEach((word) => {
      if (currentLine.length + word.length + 1 <= MAX_CHARACTERS_PER_LINE) {
        // Thêm từ vào dòng hiện tại
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        // Dòng hiện tại đã đạt tối đa số ký tự, chuyển sang dòng mới
        lines.push(currentLine);
        currentLine = word;
      }
    });

    // Thêm dòng cuối cùng (nếu có)
    if (currentLine) {
      lines.push(currentLine);
    }

    return lines;
  };
  const lines = breakTextIntoLines(exe.name);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate('DetailExe', exe)}>
      <ImageBackground style={styles.imgBack} source={{ uri: `${URL_IMAGE}${exe.image}` }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                marginRight: 5,
                color: COLORS.white,
                fontWeight: 'bold',
              }}>
              {exe.star}
            </Text>
            <Icon name="star" size={20} color={COLORS.yellow}></Icon>
          </View>
        </View>
      </ImageBackground>
      {lines.map((line, index) => (
        <Text
          key={index}
          style={{
            color: COLORS.xGreen,
            fontSize: 12,
            fontWeight: 'bold',
            alignSelf: 'center',
            marginTop: index === 0 ? 10 : 0, // Đặt margin-top chỉ cho dòng đầu tiên
          }}
        >
          {line}
        </Text>
      ))}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  imgBack: {
    height: 150,
    width: width / 3,
    maxWidth: width / 3,
    marginRight: 10,
    padding: 5,
    overflow: 'hidden',
    borderRadius: 15,
    elevation: 5,
  },
});

export default ExeCom;
