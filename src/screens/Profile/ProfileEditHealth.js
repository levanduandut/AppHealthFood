import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SIZES, COLORS} from '../../constants/theme';
import {Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import fonts from '../../constants/fonts';
import HeaderBar from '../../components/HeaderBar';
import {SelectList} from 'react-native-dropdown-select-list';
import {get_sick_list, user_health_update} from '../../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {height} = Dimensions.get('window');

const ProfileEditHealth = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [selected, setSelected] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessage2, setErrorMessage2] = useState('');
  const [errorMessage3, setErrorMessage3] = useState('');
  const [isWarning, setIsWarning] = useState(true);
  const [isWarning1, setIsWarning1] = useState(true);
  const [arrSick, setArrSick] = useState([]);
  const [sick, setSick] = useState('');
  const [haTruong, setHaTruong] = useState();
  const [duongH, setDuongH] = useState();
  const [haThu, setHaThu] = useState();
  const [bmi, setBMI] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
    });
    (async () => getInfoSick())();
  }, []);
  const isValidIsOk = () =>
    sick > 0 &&
    weight > 0 &&
    height > 0 &&
    bmi > 0 &&
    haThu > 0 &&
    haTruong > 0 &&
    duongH > 0;
  const getInfoSick = async () => {
    await get_sick_list({
      info: 0,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setArrSick(res.data.sick);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  function getIndexSick(select) {
    setSick(select);
    console.log(select);
  }
  function handleSaveHealth() {
    user_health_update({
      sickId: sick,
      weight: weight,
      height: height,
      bmi: bmi,
      haThu: haThu,
      haTruong: haTruong,
      duongH: duongH,
      token: token,
    })
      .then(async res => {
        if (res.data.errCode !== 0) {
          alert(res.data.message);
        } else {
          setHaThu();
          setHaTruong();
          setSick();
          setWeight();
          setHeight();
          setBMI();
          setDuongH();
          AsyncStorage.clear();
          navigation.replace('Login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  function checkMessage(value) {
    if (weight !== 0) {
      setHeight(value);
      setBMI(((weight * 10000) / (value * value)).toFixed(2));
      setMes(((weight * 10000) / (value * value)).toFixed(2));
    } else {
      setErrorMessage('Bạn phỉa nhập cân nặng trước');
    }
  }
  function checkHaTruong(value) {
    setErrorMessage2('');
    setIsWarning(false);
    setHaTruong(value);
    if (value >= 140) {
      setErrorMessage2('Huyết áp cao -> Lưu ý chọn bệnh : Cao huyết áp ');
      setIsWarning(true);
    }
    if (value < 140 && value >= 100) {
      setErrorMessage2('Huyết áp bình thường');
      setIsWarning(false);
    }
    if (value < 100 && value > 0) {
      setErrorMessage2('Huyết áp thấp');
      setIsWarning(true);
    }
    if (value < 0) {
      setErrorMessage2('Nhập sai !');
      setIsWarning(true);
    }
  }
  function checkHaThu(value) {
    setHaThu(value);
    setErrorMessage2('');
    if (value >= 90) {
      setErrorMessage2('Huyết áp cao -> Lưu ý chọn bệnh : Cao huyết áp ');
      setIsWarning(true);
    }
    if (value < 90 && value > 50) {
      setErrorMessage2('Huyết áp bình thường');
      setIsWarning(false);
    }
    if (value > 200 && haTruong < 90) {
      setErrorMessage2('Nhập sai !');
      setIsWarning(true);
    }
    if (value < 0) {
      setErrorMessage2('Nhập sai !');
      setIsWarning(true);
    }
  }
  function checkDuongHuyet(value) {
    setDuongH(value);
    setIsWarning1(false);
    if (value >= 70 && value <= 130) {
      setErrorMessage3('Đường huyết bình thường');
      setIsWarning1(false);
    } else if (value > 130) {
      setErrorMessage3('Đường huyết cao ! Vui lòng chọn bệnh tiểu đường');
      setIsWarning1(true);
    } else if (value < 70 && value > 0) {
      setErrorMessage3('Đường huyết thấp');
      setIsWarning1(true);
    } else {
      setErrorMessage3('Nhập sai , vui lòng nhập lại !');
      setIsWarning1(true);
    }
  }
  function setMes(value) {
    if (value < 18.1) {
      setErrorMessage('Gầy');
    } else if (value >= 18.5 && value < 25) {
      setErrorMessage('Bình thường');
    } else if (value >= 25 && value < 30) {
      setErrorMessage('Thừa cân');
    } else if (value >= 30 && value < 35) {
      setErrorMessage('Béo phì độ 1');
    } else if (value >= 35 && value < 40) {
      setErrorMessage('Béo phì độ 2');
    } else if (value > 40 && value < 1000) {
      setErrorMessage('Béo phì độ 3');
    } else {
      setErrorMessage('Bạn nhập sai !');
    }
  }
  return (
    <SafeAreaView>
      <HeaderBar navigation={navigation} />
      <Text style={styles.title}>Nhập thông tin sức khỏe</Text>
      <View style={{padding: 20}}>
        <Text style={{color: COLORS.black}}>Chọn bệnh</Text>
        <View style={{padding: 5}}>
          <SelectList
            onSelect={() => getIndexSick(selected)}
            setSelected={setSelected}
            fontFamily="lato"
            data={arrSick}
            arrowicon={
              <FontAwesome name="chevron-down" size={12} color={'black'} />
            }
            searchicon={<FontAwesome name="search" size={12} color={'black'} />}
            search={false}
            boxStyles={{
              backgroundColor: '#befadc',
              borderRadius: 10,
              height: 55,
              borderColor: COLORS.black,
              alignItems: 'center',
            }} //override default styles
            defaultOption={{key: '1', value: 'Không'}} //default selected option
          />
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: COLORS.black}}>Cân nặng</Text>
          <View style={styles.viewText}>
            <TextInput
              keyboardType="numeric"
              style={styles.inputText}
              onChangeText={value => setWeight(value)}
            />
            <Text style={styles.inputText}>Kg</Text>
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: COLORS.black}}>Chiều cao</Text>
          <View style={styles.viewText}>
            <TextInput
              keyboardType="numeric"
              style={styles.inputText}
              onChangeText={value => checkMessage(value)}
            />
            <Text style={styles.inputText}>Cm</Text>
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: COLORS.black}}>BMI</Text>
          <View style={styles.viewText}>
            <Text
              style={{
                paddingHorizontal: 20,
                paddingVertical: 12,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              {((weight * 10000) / (height * height)).toFixed(2)}
            </Text>
          </View>
          <Text style={{alignSelf: 'flex-end', color: COLORS.red}}>
            {errorMessage}
          </Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: COLORS.black}}>Huyết áp</Text>
          <View style={styles.viewText1}>
            <TextInput
              keyboardType="numeric"
              onChangeText={text => checkHaTruong(text)}
              style={styles.inputText}
            />
            <Text style={styles.daugach}>/</Text>
            <TextInput
              keyboardType="numeric"
              onChangeText={text => checkHaThu(text)}
              style={styles.inputText}
            />
            <Text style={styles.inputText}>mmHg</Text>
          </View>
          <Text
            style={{
              alignSelf: 'flex-end',
              color: isWarning ? COLORS.red : COLORS.green,
            }}>
            {errorMessage2}
          </Text>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: COLORS.black}}>Đường huyết</Text>
          <View style={styles.viewText}>
            <TextInput
              keyboardType="numeric"
              onChangeText={text => checkDuongHuyet(text)}
              style={styles.inputText}
            />
            <Text style={styles.inputText}>mg/dl</Text>
          </View>
          <Text
            style={{
              alignSelf: 'flex-end',
              color: isWarning1 ? COLORS.red : COLORS.green,
            }}>
            {errorMessage3}
          </Text>
        </View>
        <TouchableOpacity
          disabled={isValidIsOk() == false}
          onPress={() => handleSaveHealth()}
          style={{
            marginTop: 20,
            padding: 14,
            marginHorizontal: 90,
            backgroundColor: isValidIsOk() == true ? COLORS.primary : '#9da19e',
            marginVertical: 30,
            borderRadius: 10,
            elevation: 12,
          }}>
          <Text style={styles.btnLoginText}>Lưu thông tin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  daugach: {
    fontSize: 20,
    color: COLORS.blue,
    fontWeight: 'bold',
  },
  btnLoginText: {
    fontWeight: '900',
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.POPPINS_BOLD,
  },
  title: {
    paddingTop: 5,
    fontSize: 25,
    color: COLORS.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
  viewText: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 10,
    backgroundColor: '#befadc',
    borderRadius: 10,
    marginVertical: 5,
  },
  viewText1: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 10,
    backgroundColor: '#befadc',
    borderRadius: 10,
    marginVertical: 5,
  },
  inputText: {
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileEditHealth;
