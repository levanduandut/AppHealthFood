import React, { useState, useEffect } from 'react';
import {
    Alert,
    Dimensions,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';
import moment from 'moment';
import { Text, View } from 'react-native';
import fonts from '../../constants/fonts';
import HeaderBar from '../../components/HeaderBar';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    get_sick_list,
    user_absorb_info,
    user_health_info,
} from '../../api/user_api';
const { height } = Dimensions.get('window');

const ProFileEat = props => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const isFocused = useIsFocused();
    const [token, setToken] = useState();
    const [data, setData] = useState([]);
    useEffect(() => {
        (async () => getInfoToken())();
        if (token) {
            (async () => getInfoAbsorb(token))();
        }
    }, [isFocused, token]);
    const getInfoToken = async () => {
        AsyncStorage.getItem('AccessToken').then(async value => {
            await setToken(value);
        });
    };
    const getInfoAbsorb = async token => {
        await user_absorb_info({
            token: token,
            limit: 8,
        })
            .then(async res => {
                if (res.data.errCode === 0) {
                    setData(res.data.info.reverse());
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    const ComHistory = props => {
        const { data } = props;
        return (
            <View style={{ backgroundColor: COLORS.yellow, borderRadius: 10, marginBottom: 10 }}>
                <View
                    style={{
                        flexDirection: 'column',
                        backgroundColor: '#81b8ff',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        margin: 5,
                        borderRadius: 10,
                    }}>
                    <Text
                        style={{
                            paddingBottom: 5,
                            color: COLORS.black,
                            fontSize: 16,
                            alignSelf: 'center',
                            fontWeight: 'bold',
                        }}>
                        Thời gian nhập :{' '}
                        {moment(data.createdAt)
                            .utcOffset('+07:00')
                            .format(' hh:mm:ss a  DD-MM-YYYY')}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            Calo :<Text style={{ color: COLORS.white }}>{data.totalCalo}</Text>
                            {'   '}
                        </Text>
                        <Text>
                            Tinh bột :{' '}
                            <Text style={{ color: COLORS.white }}>{data.totalTinhBot} g</Text>
                            {'   '}
                        </Text>
                        <Text>
                            Chất xơ :{' '}
                            <Text style={{ color: COLORS.white }}>{data.totalChatXo} g</Text>
                            {'   '}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            Cholesterol :
                            <Text style={{ color: COLORS.white }}>{data.totalCho} mg</Text>
                            {'   '}
                        </Text>
                        <Text>
                            Chất béo :{' '}
                            <Text style={{ color: COLORS.white }}>{data.totalFatTotal} g</Text>
                            {'   '}
                        </Text>
                    </View>
                    <Text>
                        Chất xơ :{' '}
                        <Text style={{ color: COLORS.white }}>{data.totalChatXo} g</Text>
                        {'   '}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            Kali :
                            <Text style={{ color: COLORS.white }}>{data.totalKali} mg</Text>
                            {'   '}
                        </Text>
                        <Text>
                            Protein :{' '}
                            <Text style={{ color: COLORS.white }}>{data.totalPro} g</Text>
                            {'   '}
                        </Text>
                        <Text>
                            Size :{' '}
                            <Text style={{ color: COLORS.white }}>{data.totalSize} g</Text>
                            {'   '}
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            Natri :
                            <Text style={{ color: COLORS.white }}>{data.totalNatri} mg</Text>
                            {'   '}
                        </Text>
                        <Text>
                            Đường :{' '}
                            <Text style={{ color: COLORS.white }}>{data.totalSugar} g</Text>
                            {'   '}
                        </Text>
                    </View>
                    <Text>
                        Tên món ăn : <Text style={{ color: COLORS.white }}> {data.eat} </Text>
                    </Text>
                </View>
            </View>
        );
    };
    if (data.length === 0) {
        return (
            <SafeAreaView>
                <HeaderBar navigation={navigation} />
                <View style={{ justifyContent: 'center', alignItems: 'center', height: height, alignSelf: 'center' }}>
                    <Text style={{ color: COLORS.red, fontWeight: 'bold', fontSize: 15 }}>Chưa có thông tin ăn uống</Text>
                    <Text style={{ color: COLORS.red, fontWeight: 'bold', fontSize: 15 }}>Nên chúng tôi chưa có lịch sử ăn uống</Text>
                    <TouchableOpacity
                        onPress={() => navigate('XMap')}
                        style={{
                            marginTop: 20,
                            padding: 14,
                            marginHorizontal: 70,
                            backgroundColor: COLORS.primary,
                            marginVertical: 20,
                            borderRadius: 10,
                            elevation: 12,
                        }}>
                        <Text style={styles.btnLoginText}>Nhấn vào đây để thêm thông tin</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
    return (
        <SafeAreaView style={{ height: '110%' }}>
            <HeaderBar navigation={navigation} />
            <View>
                <Text style={styles.title}>Lịch sử ăn uống</Text>
                <View style={{ paddingVertical: 5, paddingHorizontal: 20 }}>
                    <ScrollView style={{ paddingBottom: 10, height: '85%' }}>
                        {data &&
                            data.map((item, index) => {
                                return <ComHistory data={item} key={index} />;
                            })}
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: COLORS.primary,
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
});

export default ProFileEat;
