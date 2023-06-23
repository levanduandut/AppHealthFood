import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SIZES, COLORS } from '../../constants/theme';
import { Text, View } from 'react-native';
import fonts from '../../constants/fonts';
import HeaderBar from '../../components/HeaderBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import { user_edit_info } from '../../api/user_api';

const { height } = Dimensions.get('window');

const ProfileEditAccount = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const [token, setToken] = useState('token');
  const [name, setName] = useState(route.params.fullName);
  const [email, setEmail] = useState(route.params.email);
  const [age, setAge] = useState(route.params.age);
  const [gender, setGender] = useState(route.params.gender);
  const isValidIsOk = () =>
    name.length > 0 &&
    gender.length > 0 &&
    age.length > 0 &&
    email.length > 0;
  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
    });
  }, []);
  const handleSave = async () => {
    await user_edit_info({
      name: name,
      age: age,
      gender: gender,
      token: token,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          Alert.alert('Thành công', 'Bạn đã chỉnh sửa thông tin thành công !');
          goBack();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const data = [
    { key: '1', value: 'Nữ' },
    { key: '2', value: 'Nam' },
    { key: '3', value: 'Khác' },
  ];
  return (
    <SafeAreaView>
      <HeaderBar navigation={navigation}></HeaderBar>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tên</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          editable={false}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tuổi</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={age.toString()}
          onChangeText={text => setAge(text)}
        />
      </View>
      <View style={{ marginHorizontal: 20 }}>
        <SelectList
          setSelected={setGender}
          fontFamily="lato"
          data={data}
          arrowicon={
            <FontAwesome name="chevron-down" size={12} color={'black'} />
          }
          searchicon={<FontAwesome name="search" size={12} color={'black'} />}
          search={false}
          boxStyles={{
            marginTop: 20,
            backgroundColor: COLORS.white,
            borderRadius: 10,
            height: 55,
            alignItems: 'center',
          }} //override default styles
          defaultOption={{ key: '0', value: 'Chọn giới tính' }} //default gender option
        />
      </View>
      <TouchableOpacity
        disabled={isValidIsOk() === false}
        onPress={handleSave}
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  btnLoginText: {
    fontWeight: '900',
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.POPPINS_BOLD,
  },
  inputContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    padding: 14,
    marginHorizontal: 90,
    backgroundColor: COLORS.primary,
    marginVertical: 30,
    borderRadius: 10,
    elevation: 12,
  },
  saveButtonText: {
    fontWeight: '900',
    color: COLORS.black,
    textAlign: 'center',
    fontSize: 18,
    fontFamily: fonts.POPPINS_BOLD,
  },
});

export default ProfileEditAccount;
