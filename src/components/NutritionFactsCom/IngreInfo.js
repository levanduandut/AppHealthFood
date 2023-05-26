import React, { useState, useEffect } from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';
import { Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import fonts from '../../constants/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('screen');

const IngreInfo = props => {
    const { navigation, ingre } = props;
    return (
        <TouchableOpacity
            activeOpacity={0.8}
        // onPress={() => navigation.navigate('DetailFood', ingre)}
        >
            <View style={{ paddingVertical: 3 }}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: '#fdff6deb',
                        borderRadius: 5,
                        padding: 10,
                    }}>
                    <Text style={styles.title}>{ingre.name}</Text>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                    }}>
                        <Text style={styles.calo}>Calo : {ingre.calo}</Text>
                        <Text style={styles.calo}>Protein : {ingre.protein}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    title: {
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 15,
        color: COLORS.black,
        fontWeight: 'bold',
    },
    calo: {
        justifyContent: 'center',
        paddingLeft: 20,
        fontSize: 15,
        color: COLORS.black,
    },
});

export default IngreInfo;
