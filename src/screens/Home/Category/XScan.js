import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Linking,
  TextInput,
} from 'react-native';
import images from '../../../constants/images';
import { SIZES, COLORS } from '../../../constants/theme';
import HeaderBar from '../../../components/HeaderBar';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../../../constants/fonts';
const { height } = Dimensions.get('window');

const XScan = props => {
  const { navigation, route } = props;
  const x = route.params;
  const [inputValue, setInputValue] = useState('');
  const [y, setY] = useState();
  const [errMes, setErrMes] = useState();

  const validateInput = text => {
    let parsedValue = parseFloat(text);

    if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 2) {
      setInputValue(text); // Cập nhật giá trị mới nếu hợp lệ
      setY((x - (7700 / 7) * parsedValue).toFixed(2));
      if ((x - (7700 / 7) * parsedValue).toFixed(2) < 1000) {
        setErrMes('Không nên để lượng calo giảm xuống dưới mức 1000 calo mà không có sự theo dõi của bác sĩ')
      }
      else {
        setErrMes();
      }
    } else {
      // Hiển thị thông báo lỗi nếu giá trị không hợp lệ
      Alert.alert('Lỗi', 'Vui lòng nhập giá trị số từ 0 đến 2.');
    }
  };


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderBar navigation={navigation} />
      <Text style={styles.header}>Calo khuyến nghị</Text>
      <View style={{ paddingHorizontal: 30, paddingVertical: 5, paddingTop: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#abedba',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>Lượng calo cần tối thiểu (BMR)</Text>
          <Text style={styles.data}>{x}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 5, paddingTop: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#abedba',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>
            Lượng calo cần khi không vận động / Ít vận động
          </Text>
          <Text style={styles.data}>{(x * 1.2).toFixed(2)}</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 5, paddingTop: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#abedba',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>
            Vận động nhẹ (tập luyện nhẹ nhàng 1-3 ngày/ tuần)
          </Text>
          <Text style={styles.data}>
            {(x * 1.3).toFixed(2)} - {(x * 1.4).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 5, paddingTop: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#abedba',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>
            Vận động vừa (tập luyện cường độ trung bình 3-5 ngày/ tuần)
          </Text>
          <Text style={styles.data}>
            {(x * 1.5).toFixed(2)} - {(x * 1.6).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 5, paddingTop: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#abedba',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>
            Vận động cường độ cao (tập khá nặng 6-7 ngày/ tuần)
          </Text>
          <Text style={styles.data}>
            {(x * 1.7).toFixed(2)} - {(x * 1.8).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 5, paddingTop: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            backgroundColor: '#abedba',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text style={styles.title}>
            Vận động vô cùng cao (tập luyện rất nặng 6-7 ngày/ tuần)
          </Text>
          <Text style={styles.data}>
            {(x * 1.9).toFixed(2)} - {(x * 2).toFixed(2)}
          </Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingVertical: 5, paddingTop: 10 }}>
        <View
          style={{
            flexDirection: 'column',
            borderRadius: 10,
            padding: 10,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: COLORS.green,
              fontWeight: 'bold',
            }}>
            Tính lượng calo cần ăn nếu giảm cân
          </Text>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Text style={styles.title2}>
              Bạn muốn giảm:
            </Text>
            <TextInput
              keyboardType="numeric"
              style={styles.inputEmail}
              value={inputValue}
              onChangeText={text => validateInput(text)}
            />
            <Text style={{
              color: '#0e7af5',
              width: '70%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
              Kg/Tuần
            </Text>
          </View>
          <View style={{ flexDirection: 'row', width: '100%' }}>
            <Text style={{ color: COLORS.green }}>
              Bạn nên ăn {y} Calo / Ngày
            </Text>
          </View>
          <Text style={{ color: COLORS.red }}>
            {errMes}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  title2: {
    color: '#0e7af5',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  inputEmail: {
    width: '30%',
    fontSize: 15,
    paddingLeft: 20,
    color: COLORS.black,
    backgroundColor: '#9aabeb',
    borderRadius: 10,
    marginVertical: 2,
    marginRight: 10,
  },
  title: {
    paddingLeft: 20,
    fontSize: 12,
    color: COLORS.black,
  },
  data: {
    fontSize: 15,
    color: COLORS.red,
    fontFamily: fonts.POPPINS_BOLD,
    alignItems: 'center',
    alignSelf: 'center',
  },
  header: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
    color: COLORS.title,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});

export default XScan;
