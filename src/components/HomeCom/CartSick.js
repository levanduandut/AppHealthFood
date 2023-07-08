import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';

import {
    Text,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import fonts from '../../constants/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Ionicons';
import { URL_IMAGE } from '@env';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('screen');

const CartSick = props => {
    const { navigation, sick } = props;
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('DetailSick', sick)}
        >
            <ScrollView>
                {/* <ImageBackground style={styles.imgBack} source={{ uri: `${URL_IMAGE}${sick.image}` }}> */}
                <ImageBackground style={styles.imgBack} source={{ uri: `${sick.image}` }}>
                    <Text
                        style={{
                            color: COLORS.white,
                            fontSize: 22,
                            marginTop: 10,
                            fontWeight: 'bold',
                            textShadowColor: COLORS.black,
                            textShadowOffset: { width: 1, height: 1 },
                            textShadowRadius: 10,
                        }}>
                        {sick.name}
                    </Text>
                    <View
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            flex: 1,
                        }}>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon name="tag" size={22} color={COLORS.xGreen} />
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        flexDirection: 'row',
                                        marginLeft: 10,
                                        color: COLORS.white,
                                        textShadowColor: COLORS.black,
                                        textShadowOffset: { width: 1, height: 1 },
                                        textShadowRadius: 10,
                                    }}>
                                    {sick.tag}
                                </Text>
                            </View>
                        </View>
                        <Text style={{ color: COLORS.white }}>{sick.detail}</Text>
                    </View>
                </ImageBackground>
            </ScrollView>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    imgBack: {
        height: 200,
        width: width - 40,
        marginRight: 20,
        padding: 10,
        overflow: 'hidden',
        borderRadius: 10,
        elevation: 5,
    },
});

export default CartSick;
