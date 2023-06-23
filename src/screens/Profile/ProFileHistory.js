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
import { get_sick_list, user_health_info } from '../../api/user_api';
const { height } = Dimensions.get('window');

const ProfileHistory = props => {
    const { navigation, route } = props;
    const { navigate, goBack } = navigation;
    const isFocused = useIsFocused();
    const [token, setToken] = useState();
    const [data, setData] = useState([]);
    const [sick, setSick] = useState([]);
    useEffect(() => {
        (async () => getInfoToken())();
        if (token) {
            (async () => getInfoHealth(token))();
        }
        (async () => getInfoSick())();
    }, [isFocused, token]);
    const getInfoToken = async () => {
        AsyncStorage.getItem('AccessToken').then(async value => {
            await setToken(value);
        });
    };
    const getInfoSick = async () => {
        await get_sick_list({
            info: 0,
        })
            .then(async res => {
                if (res.data.errCode === 0) {
                    setSick(res.data.sick);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    const getInfoHealth = async token => {
        await user_health_info({
            token: token,
            limit: 30,
        })
            .then(async res => {
                if (res.data.errCode === 0) {
                    setData(res.data.info);
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    const ComHistory = props => {
        const { data, sickId } = props;
        return (
            <View
                style={{
                    flexDirection: 'column',
                    backgroundColor: '#59ffba',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    marginVertical: 10,
                    borderRadius: 10,
                }}>
                <Text style={{ color: COLORS.black, fontSize: 15 }}>
                    Thời gian nhập :{' '}
                    {moment(data.createdAt)
                        .utcOffset('+07:00')
                        .format(' hh:mm:ss a  DD-MM-YYYY')}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text>
                        BMI :<Text style={{ color: COLORS.red }}>{data.bmi}</Text>
                        {'   '}
                    </Text>
                    <Text>
                        Cân nặng : <Text style={{ color: COLORS.red }}>{data.weight}</Text> kg{' '}
                        {'   '}
                    </Text>
                    <Text>
                        Chiều cao : <Text style={{ color: COLORS.red }}>{data.height}</Text>{' '}
                        cm {'   '}
                    </Text>
                </View>
                <Text>
                    Huyết áp :{' '}
                    <Text style={{ color: COLORS.red }}>
                        {data.haTruong}/{data.haThu}
                    </Text>{' '}
                    mmHg
                </Text>
                <Text>
                    Đường huyết : <Text style={{ color: COLORS.red }}> {data.duongH} </Text>
                    mg/dl
                </Text>
                <Text>
                    Bệnh :{' '}
                    <Text style={{ color: COLORS.red }}>
                        {' '}
                        {sick[sickId] ? sick[sickId].value : ''}
                    </Text>{' '}
                </Text>
            </View>
        );
    };
    if (data.length === 0) {
        <SafeAreaView>
            <HeaderBar navigation={navigation} />
            <View style={{ justifyContent: 'center', alignItems: 'center', height: height, alignSelf: 'center' }}>
                <Text style={{ color: COLORS.red, fontWeight: 'bold', fontSize: 15 }}>Chưa có thông tin sức khỏe</Text>
                <Text style={{ color: COLORS.red, fontWeight: 'bold', fontSize: 15 }}>Nên chúng tôi chưa có lịch sử sức khỏe </Text>
                <TouchableOpacity
                    onPress={() => navigate('ProfileEditHealth')}
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
    }
    return (
        <SafeAreaView style={{height:'110%'}}>
            <HeaderBar navigation={navigation} />
                <View>
                    <Text style={styles.title}>Lịch sử sức khỏe</Text>
                    <View style={{ paddingVertical: 5, paddingHorizontal: 20 }}>
                        <ScrollView style={{ paddingBottom: 10, height: '85%' }}>
                            {data &&
                                data.map((item, index) => {
                                    return (
                                        <ComHistory data={item} key={index} sickId={item.sickId - 1} />
                                    );
                                })}
                        </ScrollView>
                    </View>
                </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    btnLoginText: {
        fontWeight: '900',
        color: COLORS.black,
        textAlign: 'center',
        fontSize: 12,
        fontFamily: fonts.POPPINS_BOLD,
    },
    title: {
        fontSize: 30,
        color: COLORS.primary,
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: fonts.POPPINS_BOLD,
    },
});

export default ProfileHistory;
