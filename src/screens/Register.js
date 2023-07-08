import React, { useState, useEffect } from 'react';
import {
    Alert,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    TextInput,
} from 'react-native';
import { SIZES, COLORS } from '../constants/theme';
import {
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SelectList } from 'react-native-dropdown-select-list';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import fonts from '../constants/fonts';
import { isValidateEmail, isValidatePassword } from '../untilies';
import { user_register } from '../api/user_api';
const { height } = Dimensions.get('window');

const Register = props => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorRePassword, setErrorRePassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const isValidIsOk = () =>
        name.length > 0 &&
        gender.length > 0 &&
        age.length > 0 &&
        email.length > 0 &&
        password.length > 0 &&
        isValidateEmail(email) == true &&
        isValidatePassword(password) == true;

    function clickLogin() {
        setAge('');
        setEmail('');
        setGender('');
        setName('');
        setPassword('');
        navigate('Login');
    }
    function getIndexSick(select) {

    }
    function checkRePassword(text) {
        if (text !== password) {
            setErrorRePassword('Mật khẩu không trùng khớp !');
        }
        else {
            setRePassword(text);
            setErrorRePassword('');
        }
    }
    function clickRes() {
        user_register({
            email: email,
            password: password,
            fullName: name,
            age: age,
            gender: gender,
        })
            .then(async res => {
                if (res.data.errCode !== 0) {
                    Alert.alert(
                        'Đăng kí không thành công !',
                        res.data.message,
                    );
                } else {
                    Alert.alert(
                        'Đăng kí thành công',
                        'Chúc mừng bạn đà đăng kí thành công',
                    );
                    setAge('');
                    setEmail('');
                    setGender('');
                    setName('');
                    setPassword('');
                    navigate('Login');
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    const data = [
        { key: '1', value: 'Nữ' },
        { key: '2', value: 'Nam' },
        { key: '3', value: 'Khác' },
    ];
    return (
        <SafeAreaView>
            <View style={styles.textView}>
                <View style={styles.textViewTitle}>
                    <Text style={styles.textLogin}>Đăng ký</Text>
                    <Text style={styles.textWelcome}>
                        Hãy tạo tài khoản để trải nghiệm dịch vụ nào!
                    </Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                        onChangeText={text => {
                            if (isValidateEmail(text) == false) {
                                setErrorEmail('Sai định dạng email !');
                            } else {
                                setErrorEmail(null);
                            }
                            setEmail(text);
                        }}
                        placeholder="Email"
                        style={styles.inputEmail}
                    />
                    <Text style={styles.valid}>{errorEmail}</Text>
                    <TextInput
                        onChangeText={text => {
                            setName(text);
                        }}
                        autoCapitalize='words'
                        placeholder="Nhập tên đầy đủ"
                        style={styles.inputEmail}
                    />
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            onChangeText={text => {
                                setAge(text);
                            }}
                            keyboardType="numeric"
                            placeholder="Nhập tuổi"
                            style={{
                                flex: 1,
                                fontSize: 15,
                                padding: 15,
                                backgroundColor: '#f1f4ff',
                                borderRadius: 10,
                                marginVertical: 10,
                            }}
                        />
                        <View style={{ flex: 1 }}>
                            <SelectList
                                onSelect={() => getIndexSick(gender)}
                                setSelected={setGender}
                                fontFamily="lato"
                                data={data}
                                arrowicon={
                                    <FontAwesome name="chevron-down" size={12} color={'black'} />
                                }
                                searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                                search={false}
                                boxStyles={{
                                    backgroundColor: COLORS.white,
                                    borderRadius: 10,
                                    height: 55,
                                    alignItems: 'center',
                                }} //override default styles
                                defaultOption={{ key: '0', value: 'Chọn giới tính' }} //default gender option
                            />
                        </View>
                    </View>
                    <TextInput
                        onChangeText={text => {
                            if (isValidatePassword(text) == false) {
                                setErrorPassword('Mật khẩu tối thiểu 4 kí tự !');
                            } else {
                                setErrorPassword(null);
                            }
                            setPassword(text);
                        }}
                        placeholder="Mật khẩu"
                        style={styles.inputEmail}
                        secureTextEntry
                    />
                    <Text style={styles.valid}>{errorPassword}</Text>
                    <TextInput
                        onChangeText={text => {
                            checkRePassword(text);
                        }}
                        placeholder="Nhập lại mật khẩu"
                        style={styles.inputEmail}
                        secureTextEntry
                    />
                    <Text style={styles.valid}>{errorRePassword}</Text>
                </View>

                <TouchableOpacity
                    disabled={isValidIsOk() == false}
                    onPress={() => clickRes()}
                    style={{
                        padding: 15,
                        backgroundColor: isValidIsOk() == true ? COLORS.primary : '#9da19e',
                        marginVertical: 10,
                        borderRadius: 10,
                        elevation: 12,
                    }}>
                    <Text style={styles.btnLoginText}>Đăng ký</Text>
                </TouchableOpacity>
                <Text onPress={() => clickLogin()} style={styles.btnResText}>
                    Đã có tài khoản?
                </Text>

                <View
                    style={{
                        marginVertical: 20,
                    }}>
                    <Text style={styles.LoginWithText}> Hoặc đăng nhập bằng </Text>
                </View>
                <View
                    style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            backgroundColor: '#babfbb',
                            borderRadius: 5,
                            marginHorizontal: 10,
                        }}>
                        <Ionicons name="logo-google" color={COLORS.red} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            backgroundColor: '#babfbb',
                            borderRadius: 5,
                            marginHorizontal: 10,
                        }}>
                        <Ionicons name="logo-facebook" color={COLORS.blue} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            padding: 10,
                            backgroundColor: '#babfbb',
                            borderRadius: 5,
                            marginHorizontal: 10,
                        }}>
                        <Ionicons name="logo-apple" color={COLORS.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    valid: {
        color: COLORS.red,
        textAlign: 'right',
        marginHorizontal: 2,
        fontSize: 12,
    },
    LoginWithText: {
        color: COLORS.primary,
        fontWeight: '900',
        textAlign: 'center',
    },
    btnResText: {
        padding: 5,
        fontWeight: '900',
        color: COLORS.black,
        textAlign: 'center',
        fontSize: 15,
    },
    btnRes: {
        padding: 20,
        backgroundColor: COLORS.white,
        borderRadius: 10,
    },
    btnLoginText: {
        fontFamily: fonts.POPPINS_BOLD,
        color: COLORS.white,
        textAlign: 'center',
        fontSize: 20,
    },
    btnLogin: {
        padding: 20,
        backgroundColor: COLORS.primary,
        marginVertical: 30,
        borderRadius: 10,
        shadowColor: COLORS.black,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    forgotPassText: {
        color: COLORS.primary,
        fontWeight: '900',
        alignSelf: 'flex-end',
    },
    textView: {
        paddingHorizontal: 20,
    },
    textViewTitle: {
        alignItems: 'center',
    },
    textLogin: {
        fontSize: 30,
        color: COLORS.primary,
        fontFamily: fonts.POPPINS_BOLD,
        marginVertical: 10,
    },
    textWelcome: {
        fontWeight: '900',
        fontSize: 15,
        maxWidth: '60%',
        textAlign: 'center',
    },
    inputEmail: {
        fontSize: 15,
        padding: 15,
        backgroundColor: '#f1f4ff',
        borderRadius: 10,
        marginVertical: 10,
    },
    inputView: {
        marginVertical: 20,
    },
});

export default Register;
