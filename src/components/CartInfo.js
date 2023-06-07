import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import images from '../constants/images';
import { SIZES, COLORS } from '../constants/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import fonts from '../constants/fonts';
const { height } = Dimensions.get('window');

const CartInfo = props => {
    const { title, data, colorBack } = props;
    return (
        <View
            style={{ paddingHorizontal: 30, paddingVertical: 2, paddingTop: 20 }}>
            <View
                style={{
                    flexDirection: 'column',
                    backgroundColor: colorBack,
                    borderRadius: 15,
                    padding: 10,
                }}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.data}>{data}</Text>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    title: {
        paddingLeft: 20,
        fontSize: 15,
        color: COLORS.black,
    },
    data: {
        fontSize: 15,
        color: COLORS.red,
        fontFamily: fonts.POPPINS_BOLD,
        alignItems: 'center',
        alignSelf: 'center',
    },
});

export default CartInfo;
