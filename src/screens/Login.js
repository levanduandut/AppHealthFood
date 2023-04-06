import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import images from '../constants/images';
import { Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';

const { height } = Dimensions.get('window');
const Login = (props) => {
    return <SafeAreaView>
        <View>
            <ImageBackground style={styles.imgBack} source={images.On2} />
        </View>
    </SafeAreaView>
};
const styles = StyleSheet.create({
    imgBack: {
        height: height/2.5,
    }
});

export default Login;
