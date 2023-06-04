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

const {height} = Dimensions.get('window');

const ProfileEditHealth = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [selected, setSelected] = useState('');
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [bmi, setBMI] = useState('');
  const data = [
    {key: '1', value: 'Jammu & Kashmir'},
    {key: '2', value: 'Gujrat'},
    {key: '3', value: 'Maharashtra'},
    {key: '4', value: 'Goa'},
  ];
  const InputEdit = props => {
    const {title, data, colorBack} = props;
    return (
      <View style={{flexDirection: 'column'}}>
        <Text style={{color: COLORS.black}}>{title}</Text>
        <View style={styles.viewText}>
          <TextInput keyboardType="numeric" style={styles.inputText} />
        </View>
      </View>
    );
  };
  function getIndexSick(select) {
    console.log(select);
  }
  async function checkMessage(value) {
    console.log(weight);
    if (weight !== 0) {
      setHeight(value);
      await setBMI(((weight * 10000) / (value * value)).toFixed(2));
      setMes(((weight * 10000) / (value * value)).toFixed(2));
    } else {
      setErrorMessage('Bạn phỉa nhập cân nặng trước');
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
            data={data}
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
            defaultOption={{key: '0', value: 'Khỏe mạnh'}} //default selected option
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
            <TextInput keyboardType="numeric" style={styles.inputText} />
            <Text style={styles.daugach}>/</Text>
            <TextInput keyboardType="numeric" style={styles.inputText} />
            <Text style={styles.inputText}>mmHg</Text>
          </View>
        </View>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: COLORS.black}}>Đường huyết</Text>
          <View style={styles.viewText}>
            <TextInput keyboardType="numeric" style={styles.inputText} />
            <Text style={styles.inputText}>mg/dl</Text>
          </View>
        </View>
        <TouchableOpacity
          // onPress={() => clickEdit()}
          style={{
            marginTop: 20,
            padding: 14,
            marginHorizontal: 90,
            backgroundColor: COLORS.primary,
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
