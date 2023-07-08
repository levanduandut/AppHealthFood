import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SIZES, COLORS } from '../../../constants/theme';
import { Text, View } from 'react-native';
import fonts from '../../../constants/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { post_absorb, translate_x } from '../../../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderBar from '../../../components/HeaderBar';
import { API_HOST, API_KEY,URL_DET } from '@env';
const { height } = Dimensions.get('window');

const XMap = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const x = route.params;

  const [isLoading, setLoading] = useState(true);
  const [showFlatList, setShowFlatList] = useState(false);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState(null);

  const [text, setText] = useState('');
  const [text1, setText1] = useState('');
  const [token, setToken] = useState();
  useEffect(() => {
    if (data.length > 0) {
      const total = calculateTotal(data);
      setTotalData(total);
    }
  }, [data]);
  useEffect(() => {
    (async () => getInfoStatus())();
  }, []);

  const clickOK = async () => {
    try {
      let res = await translate_x({ text: text, lang: 'en' });
      await setText1(res.data);
    } catch (error) {
      // Handle error
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request({
          method: 'GET',
          url: URL_DET,
          params: {
            query: `${text1}`,
          },
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST,
          },
        });
        if (response.data.length > 0) {
          setData(response.data);
          setShowFlatList(true); // Hiển thị FlatList
        } else {
          alert('Nhấn để thử lại!');
        }
        setLoading(false);
      } catch (error) {
      }
    };
    if (text1) {
      setLoading(true);
      fetchData();
    }
  }, [text1]);

  const getInfoStatus = async () => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
    });
  };
  const saveAbsorb = async () => {
    await post_absorb({
      data: totalData,
      token: token,
      eat: text,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          Alert.alert(
            'Lưu thành công',
          );
          setData([]);
          setTotalData(null);
          setText('');
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const calculateTotal = data => {
    let totalCalo = 0;
    let totalTinhBot = 0;
    let totalCho = 0;
    let totalFatSat = 0;
    let totalFatTotal = 0;
    let totalChatXo = 0;
    let totalKali = 0;
    let totalPro = 0;
    let totalSize = 0;
    let totalNatri = 0;
    let totalSugar = 0;

    data.forEach(item => {
      totalCalo += item.calories;
      totalTinhBot += item.carbohydrates_total_g;
      totalCho += item.cholesterol_mg;
      totalFatSat += item.fat_saturated_g;
      totalFatTotal += item.fat_total_g;
      totalChatXo += item.fiber_g;
      totalKali += item.potassium_mg;
      totalPro += item.protein_g;
      totalSize += item.serving_size_g;
      totalNatri += item.sodium_mg;
      totalSugar += item.sugar_g;
    });

    return {
      totalCalo: totalCalo.toFixed(1),
      totalTinhBot: totalTinhBot.toFixed(1),
      totalCho: totalCho.toFixed(1),
      totalFatSat: totalFatSat.toFixed(1),
      totalFatTotal: totalFatTotal.toFixed(1),
      totalChatXo: totalChatXo.toFixed(1),
      totalKali: totalKali.toFixed(1),
      totalPro: totalPro.toFixed(1),
      totalSize: totalSize.toFixed(1),
      totalNatri: totalNatri.toFixed(1),
      totalSugar: totalSugar.toFixed(1),
    };
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title1}>Tên Tiếng Anh : {title.name}</Text>
      <Text style={styles.title}>Calo : {title.calories}</Text>
      <Text style={styles.title}>
        Tinh bột : {title.carbohydrates_total_g} g
      </Text>
      <Text style={styles.title}>Cholesterol : {title.cholesterol_mg} mg</Text>
      <Text style={styles.title}>
        Fat Saturated : {title.fat_saturated_g} g
      </Text>
      <Text style={styles.title}>Fat Total : {title.fat_total_g} g</Text>
      <Text style={styles.title}>Chất xơ : {title.fiber_g} g</Text>
      <Text style={styles.title}>Kali : {title.potassium_mg} mg</Text>
      <Text style={styles.title}>Protein : {title.protein_g}</Text>
      <Text style={styles.title}>Serving Size: {title.serving_size_g} g</Text>
      <Text style={styles.title}>Natri : {title.sodium_mg} mg</Text>
      <Text style={styles.title}>Đường : {title.sugar_g} g</Text>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <HeaderBar navigation={navigation} />
      <Text style={styles.header}>Nhập thực phẩm bạn ăn hôm nay</Text>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color={COLORS.black} />
        <TextInput
          placeholder="Nhập thực phẩm tra cứu"
          style={{ color: COLORS.black }}
          value={text}
          onChangeText={text => setText(text)}
        />
      </View>
      <TouchableOpacity
        // disabled={totalData ? true : false}
        onPress={() => clickOK()}
        style={{
          alignSelf: 'center',
          width: 300,
          marginTop: 20,
          padding: 15,
          backgroundColor: COLORS.primary,
          marginVertical: 30,
          borderRadius: 10,
          elevation: 12,
        }}>
        <Text style={styles.btnLoginText}>Tra cứu</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, padding: 24, paddingTop: 10 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : showFlatList ? (
          <FlatList
            data={data}
            renderItem={({ item }) => <Item title={item} />}
          />
        ) : null}
        {totalData && (
          <ScrollView>
            <Text
              style={{
                color: COLORS.xGreen,
                alignSelf: 'center',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Tổng
            </Text>
            {x > totalData.totalCalo && (
              <Text style={{ fontSize: 12, color: COLORS.red, justifyContent: 'center', alignSelf: 'center' }}>
                Cần ăn thêm {x - totalData.totalCalo} calo để đạt múc calo tối thiểu trong ngày !
              </Text>
            )}
            <View style={styles.totalContainer}>
              <View style={{ flex: 1 }}>
                <Text style={styles.totalText}>
                  Calo: {totalData.totalCalo}
                </Text>
                <Text style={styles.totalText}>
                  Tinh bột: {totalData.totalTinhBot} g
                </Text>
                <Text style={styles.totalText}>
                  Chất xơ: {totalData.totalChatXo} g
                </Text>
                <Text style={styles.totalText}>
                  Cholesterol: {totalData.totalCho} mg
                </Text>
                <Text style={styles.totalText}>
                  Chất béo bão hòa : {totalData.totalFatSat} g
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.totalText}>
                  Chất béo : {totalData.totalFatTotal} g
                </Text>
                <Text style={styles.totalText}>
                  Kali: {totalData.totalKali} mg
                </Text>
                <Text style={styles.totalText}>
                  Đường: {totalData.totalSugar} g
                </Text>
                <Text style={styles.totalText}>
                  Protein: {totalData.totalPro} g
                </Text>
                <Text style={styles.totalText}>
                  Natri: {totalData.totalNatri} mg
                </Text>
              </View>
            </View>
          </ScrollView>
        )}
      </View>
      <TouchableOpacity
        disabled={data.length > 0 ? false : true}
        onPress={() => saveAbsorb(text)}
        style={{
          alignSelf: 'center',
          width: 100,
          padding: 10,
          backgroundColor: data.length > 0 ? COLORS.xGreen : COLORS.grey,
          marginBottom: 30,
          borderRadius: 10,
          elevation: 12,
        }}>
        <Text style={styles.btnLoginText}>Lưu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  totalContainer: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: '#f7edd1',
    paddingHorizontal: 20,
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  totalText: {
    fontSize: 15,
    color: COLORS.black,
    fontFamily: fonts.POPPINS_BOLD,
  },
  btnLoginText: {
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 20,
  },
  title: {
    fontSize: 15,
    color: COLORS.black,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
  title1: {
    fontSize: 17,
    color: COLORS.red,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
  header: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 20,
    color: COLORS.title,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
  inputContainer: {
    height: 60,
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    top: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
});

export default XMap;
