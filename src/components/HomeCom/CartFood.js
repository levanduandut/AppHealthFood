import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import images from '../../constants/images';
import { SIZES, COLORS } from '../../constants/theme';
import { Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import fonts from '../../constants/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('screen');


const CartFood = ({ lifestyle }) => {

    return <ImageBackground style={styles.imgBack} source={lifestyle.image}>

    </ImageBackground>
};
const styles = StyleSheet.create({
    imgBack: {
        height: 200,
        width: width - 40,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
        elevation:5,
    }
});

export default CartFood;
