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

const HeaderBar = props => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    return (
        <View style={{ marginTop: 20, paddingHorizontal: 20, flexDirection: 'row' }}>
            <View style={{ flex: 1, alignItems: 'flex-start' }}>
                <View style={{backgroundColor:COLORS.grey, borderRadius:5,padding:2}}>
                    <Icon
                        name="arrow-back"
                        size={30}
                        color={COLORS.xGreen}
                        onPress={() => goBack()}
                    />
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({});

export default HeaderBar;
