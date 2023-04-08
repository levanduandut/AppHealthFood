import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import images from '../constants/images';
import { SIZES, COLORS } from '../constants/theme';
import { Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../constants/fonts';
import { isValidateEmail, isValidatePassword } from '../untilies';
const { height } = Dimensions.get('window');


const Register = (props) => {

    const { navigation, route } = props;
    const {navigate, goBack} = navigation;

    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorRePassword, setErrorRePassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const isValidIsOk = () => email.length > 0 && password.length > 0 && isValidateEmail(email) == true && isValidatePassword(password) == true;

    function clickLogin() {
        navigate('Login');
    }
    return <SafeAreaView>
        <View style={styles.textView}>
            <View style={styles.textViewTitle}>
                <Text style={styles.textLogin}>Đăng ký</Text>
                <Text style={styles.textWelcome}>Hãy tạo tài khoản để trải nghiệm dịch vụ nào!</Text>
            </View>
            <View style={styles.inputView}>
                <TextInput
                    onChangeText={(text) => {
                        if (isValidateEmail(text) == false) {
                            setErrorEmail('Sai định dạng email !');
                        }
                        else {
                            setErrorEmail(null);
                        }
                        setEmail(text)
                    }}
                    placeholder='Email'
                    style={styles.inputEmail}
                />
                <Text style={styles.valid}>{errorEmail}</Text>
                <TextInput
                    onChangeText={(text) => {
                        if (isValidatePassword(text) == false) {
                            setErrorPassword('Mật khẩu tối thiểu 4 kí tự !');
                        }
                        else {
                            setErrorPassword(null);
                        }
                        setPassword(text)
                    }}
                    placeholder='Mật khẩu'
                    style={styles.inputEmail}
                    secureTextEntry
                />
                <Text style={styles.valid}>{errorPassword}</Text>
                <TextInput
                    onChangeText={(text) => {
                        setRePassword(text);
                    }}
                    placeholder='Nhập lại mật khẩu'
                    style={styles.inputEmail}
                    secureTextEntry
                />
                <Text style={styles.valid}>{errorRePassword}</Text>
            </View>

            <TouchableOpacity
                disabled={isValidIsOk() == false}
                onPress={() => clickLogin()}
                style={{
                    padding: 20,
                    backgroundColor: isValidIsOk() == true ? COLORS.primary : '#9da19e',
                    marginVertical: 30,
                    borderRadius: 10,
                    shadowColor: COLORS.black,
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                }}
            >
                <Text style={styles.btnLoginText}>Đăng ký</Text>
            </TouchableOpacity>
            <Text onPress={() => clickLogin()} style={styles.btnResText}>Đã có tài khoản?</Text>

            <View style={{
                marginVertical: 20,
            }}>
                <Text style={styles.LoginWithText} > Hoặc đăng nhập bằng </Text>
            </View>
            <View style={{
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'center'
            }}>
                <TouchableOpacity style={{
                    padding: 10,
                    backgroundColor: '#babfbb',
                    borderRadius: 5,
                    marginHorizontal: 10,
                }}>
                    <Ionicons name="logo-google" color={COLORS.red} />
                </TouchableOpacity>
                <TouchableOpacity style={{
                    padding: 10,
                    backgroundColor: '#babfbb',
                    borderRadius: 5,
                    marginHorizontal: 10,
                }}>
                    <Ionicons name="logo-facebook" color={COLORS.blue} />
                </TouchableOpacity>
                <TouchableOpacity style={{
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
};
const styles = StyleSheet.create({
    valid: {
        color: COLORS.red,
        textAlign: 'right',
        marginHorizontal: 10,
        fontSize: 12,
    },
    LoginWithText: {
        color: COLORS.primary,
        fontWeight: '900',
        textAlign: 'center',
    },
    btnResText: {
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
        padding: 20,
    },
    textViewTitle: {
        alignItems: 'center',
    },
    textLogin: {
        fontSize: 30,
        color: COLORS.primary,
        fontFamily: fonts.POPPINS_BOLD,
        marginVertical: 30,
    },
    textWelcome: {
        fontWeight: '900',
        fontSize: 15,
        maxWidth: '60%',
        textAlign: 'center',
    },
    inputEmail: {
        fontSize: 15,
        padding: 20,
        backgroundColor: '#f1f4ff',
        borderRadius: 10,
        marginVertical: 10,
    },
    inputView: {
        marginVertical: 30,
    }
});

export default Register;
