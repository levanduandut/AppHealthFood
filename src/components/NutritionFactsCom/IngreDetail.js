import React, { useState, useEffect } from 'react';
import {
    Alert,
    Dimensions,
    SafeAreaView,
    StatusBar,
    StyleSheet,
} from 'react-native';
import images from '../../constants/images';
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
import Icon from 'react-native-vector-icons/Ionicons';
import IIcon from 'react-native-vector-icons/Feather';
import HeaderBar from '../HeaderBar';
import CartInfo from '../CartInfo';
const { height, width } = Dimensions.get('window');

const IngreDetail = props => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const x = route.params;

    return (
        <SafeAreaView
            style={{ flex: 1, flexDirection: 'row', backgroundColor: COLORS.white }}>
            <View style={styles.detailContainer}>
                <HeaderBar navigation={navigation} />
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Text style={{ marginTop: 20, fontWeight: 'bold', fontSize: 20 }}>
                        {x.name}
                    </Text>
                </View>

                <ScrollView
                    style={{ width: width - 2 }}
                    automaticallyAdjustKeyboardInsets={true}>
                    <CartInfo title={'Phân loại'} data={x.category} colorBack={'#9fbaf0'} />
                    <CartInfo title={'Đơn vị'} data={x.unit} colorBack={'#f09f9f'} />
                    <CartInfo title={'Calo'} data={x.calo} colorBack={'#f0d09f'} />
                    <CartInfo title={'Protein'} data={x.protein} colorBack={'#a9f09f'} />
                    <CartInfo title={'Chất béo'} data={x.fat} colorBack={'#9fe4f0'} />
                    <CartInfo title={'Tinh bột'} data={x.carb} colorBack={'#f09fe5'} />
                    <CartInfo title={'Chất xơ'} data={x.fiber} colorBack={'#f0bf9f'} />
                    <CartInfo title={'Cholesterol'} data={x.cholesterol} colorBack={'#9febf0'} />
                    <CartInfo title={'Canxi'} data={x.canxi} colorBack={'#adf09f'} />
                    <CartInfo title={'Photpho'} data={x.photpho} colorBack={'#d8f09f'} />
                    <CartInfo title={'Fe'} data={x.fe} colorBack={'#f0eb9f'} />
                    <CartInfo title={'Natri'} data={x.natri} colorBack={'#9ff0a6'} />
                    <CartInfo title={'Kali'} data={x.kali} colorBack={'#9fd2f0'} />
                    <CartInfo title={'BetaCaroten'} data={x.betacaroten} colorBack={'#ab9ff0'} />
                    <CartInfo title={'Vitamin A'} data={x.vita} colorBack={'#d29ff0'} />
                    <CartInfo title={'Vitamin B1'} data={x.vitb1} colorBack={'#9ff0a3'} />
                    <CartInfo title={'Vitamin C'} data={x.vitc} colorBack={'#def09f'} />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    detailContainer: {
        top: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        backgroundColor: COLORS.white,
        flex:1,
    },
});

export default IngreDetail;
