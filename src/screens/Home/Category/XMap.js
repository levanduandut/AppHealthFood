import React, {useState, useEffect} from 'react';
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
import {SIZES, COLORS} from '../../../constants/theme';
import {Text, View} from 'react-native';
import fonts from '../../../constants/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {post_absorb, translate_x} from '../../../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {height} = Dimensions.get('window');

const XMap = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;

  const [isLoading, setLoading] = useState(true);
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
      let res = await translate_x({text: text, lang: 'en'});
      await setText1(res.data);
      const response = await axios.request({
        method: 'GET',
        url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
        params: {
          query: `${text1}`,
        },
        headers: {
          'X-RapidAPI-Key':
            '10a70d537bmsh80e40618efcf552p179c73jsn70e5aa136bdc',
          'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com',
        },
      });
      console.log(response.data);
      if (response.data !== []) {
        setData(response.data);
      } else {
        alert('Nhấn để thử lại !');
      }
      setLoading(false);
    } catch (error) {}
  };
  const getInfoStatus = async () => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
      console.log(value);
    });
  };
  const getDataTextVi = async text => {
    try {
      const response = await translate_x({text: text, lang: 'vi'});
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const saveAbsorb = async () => {
    await post_absorb({
      data: totalData,
      token: token,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          Alert.alert(
            'Lưu thành công',
        );
          setData([]);
          setTotalData(null);
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

  const Item = ({title}) => (
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
    <SafeAreaView style={{flex: 1, flexDirection: 'column'}}>
      <Text style={styles.header}>Nhập thực phẩm bạn ăn hôm nay</Text>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color={COLORS.black} />
        <TextInput
          placeholder="Nhập thực phẩm tra cứu"
          style={{color: COLORS.black}}
          onChangeText={text => setText(text)}
        />
      </View>
      <TouchableOpacity
        // disabled={totalData ? true : false}
        onPress={() => clickOK()}
        style={{
          alignSelf: 'center',
          width: 300,
          marginTop: 90,
          padding: 15,
          backgroundColor: COLORS.primary,
          marginVertical: 30,
          borderRadius: 10,
          elevation: 12,
        }}>
        <Text style={styles.btnLoginText}>Tra cứu</Text>
      </TouchableOpacity>
      <View style={{flex: 1, padding: 24, paddingTop: 10}}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            renderItem={({item}) => <Item title={item} />}
          />
        )}
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
            <View style={styles.totalContainer}>
              <View style={{flex: 1}}>
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
              <View style={{flex: 1}}>
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
    marginTop: 5,
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
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
});

export default XMap;
