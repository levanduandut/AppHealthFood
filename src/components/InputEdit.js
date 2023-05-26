import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet, TextInput } from 'react-native';
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

const InputEdit = props => {
    const { title, data, colorBack } = props;
    return (
        <View style={{ flexDirection: 'column' }}>
            <Text>Email</Text>
            <TextInput style={styles.inputText} />
        </View>
    );
};
const styles = StyleSheet.create({
    inputText: {
        fontSize: 15,
        padding: 20,
        backgroundColor: '#9bfcab',
        borderRadius: 10,
        marginVertical: 10,
    },
});

export default InputEdit;
