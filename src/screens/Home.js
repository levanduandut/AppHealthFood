import React, { useState, useEffect } from 'react';
import { Alert, Dimensions, SafeAreaView, StatusBar, StyleSheet, TextInput } from 'react-native';
import images from '../constants/images';
import { SIZES, COLORS } from '../constants/theme';
import IIcon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, View, Image, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import fonts from '../constants/fonts';
const { height } = Dimensions.get('window');


const Home = (props) => {
    const categoryIcons = [
        <Icon name="edit" size={25} color={COLORS.xGreen} />,
        <IIcon name="body" size={25} color={COLORS.xGreen} />,
        <IIcon name="ios-location-outline" size={25} color={COLORS.xGreen} />,
        // <Icon name="place" size={25} color={COLORS.xGreen} />,
    ];
    const ListCategories = () => {
        return (
            <View style={styles.categoryContainer}>
                {categoryIcons.map((icon, index) => (
                    <View key={index} style={styles.iconContainer}>
                        {icon}
                    </View>
                ))}
            </View>
        );
    };

    return <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
        <StatusBar translucent={false} backgroundColor={COLORS.xGreen} />
        <View style={styles.header}>
            <Icon
                name='question-circle-o'
                size={24}
                color={COLORS.black}
            />
            <Icon
                onPress={() => {
                    Alert.alert("Thông báo", "Không có thông báo!")
                }}
                name='bell-o'
                size={24}
                color={COLORS.black}
            />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: COLORS.xGreen, height: 120, paddingHorizontal: 20 }}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>Vì một cuộc sống</Text>
                    <Text style={styles.title}>tốt đẹp hơn</Text>
                    <View style={styles.inputContainer}>
                        <Icon
                            name='search'
                            size={20}
                            color={COLORS.black}
                        />
                        <TextInput placeholder='Nhập để tìm kiếm' style={{ color: COLORS.grey }} />
                    </View>
                </View>
            </View>
            <ListCategories />
        </ScrollView>
    </SafeAreaView>
};
const styles = StyleSheet.create({
    iconContainer: {
        height: 60,
        width: 60,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    categoryContainer: {
        marginTop: 60,
        marginHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 23,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLORS.xGreen,
    },
    inputContainer: {
        height: 60,
        width: '100%',
        backgroundColor: COLORS.white,
        borderRadius: 10,
        position: 'absolute',
        top: 90,
        flexDirection: 'row',
        paddingHorizontal: 20,
        alignItems: 'center',

    }
});

export default Home;
