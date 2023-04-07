import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import images from '../constants/images';
import { SIZES, COLORS } from '../constants/theme';
import { Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

const { height } = Dimensions.get('window');


const LoginRes = ({ navigation }) => {
    function clickLogin() {
        navigation.navigate('Login');
    }
    function clickRes() {
        navigation.navigate('Register');
    }

    return <SafeAreaView>
        <View>
            <ImageBackground style={styles.imgBack} resizeMode='contain' source={images.Hehe} />

            <View style={styles.viewText}>
                <Text style={styles.title}>Bắt đầu trải nghiệm tính năng hữu ích </Text>
                <Text style={styles.description}>Bắt đầu trải nghiệm tính năng hữu ích Bắt đầu trải nghiệm tính năng hữu ích </Text>
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={() => clickLogin()} style={styles.buttonLogin}>
                    <Text style={styles.textLogin}>Đăng nhập</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => clickRes()} style={styles.buttonRes}>
                    <Text style={styles.textRes}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
};
const styles = StyleSheet.create({
    imgBack: {
        height: height / 2.5,
    },
    viewText: {
        paddingHorizontal: 40,
        paddingTop: 40,
    },
    title: {
        fontSize: 30,
        color: COLORS.primary,
        fontWeight: '900',
        textAlign: 'center',
    },
    description: {
        paddingTop: 25,
        fontSize: 15,
        color: COLORS.black,
        fontWeight: '900',
        textAlign: 'center',
    },
    buttonView: {
        paddingHorizontal: 20,
        paddingTop: 80,
        flexDirection: 'row',
    },
    buttonLogin: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: "48%",
        borderRadius: 10,
    },
    textLogin: {
        fontWeight: '900',
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
    },
    buttonRes: {
        backgroundColor: COLORS.white,
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: "48%",
        borderRadius: 10,
    },
    textRes: {
        fontWeight: '900',
        fontSize: 18,
        color: COLORS.black,
        textAlign: 'center',
    },
});

export default LoginRes;
