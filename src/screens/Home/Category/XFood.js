import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import images from '../../../constants/images';
import {SIZES, COLORS} from '../../../constants/theme';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../../../constants/fonts';
import {users} from '../../../data/users';
import Icon from 'react-native-vector-icons/FontAwesome';
import IIcon from 'react-native-vector-icons/Feather';
const {height} = Dimensions.get('window');

const XFood = props => {
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 30,
                  marginRight: 10,
                }}
                source={users.avatar}
              />
              <Text style={styles.name}>{users.name}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity style={{margin: 10}}>
                <Icon
                  onPress={() => {
                    Alert.alert('Thông báo', 'Không có thông báo!');
                  }}
                  name="bell-o"
                  size={30}
                  color={COLORS.black}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <IIcon name="menu" size={30} color={COLORS.black} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: '60%', marginTop: 20}}>
            <Text style={{fontSize: 30, fontWeight: '700'}}>
              Bạn muốn nấu món gì ?
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <Icon name="search" size={20} color={COLORS.black} />
            <TextInput
              placeholder="Nhập để tìm kiếm"
              style={{color: COLORS.black}}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  name: {
    fontSize: 17,
    color: COLORS.dark,
    fontWeight: '800',
  },
  inputContainer: {
    padding: 10,
    height: 60,
    marginVertical: 30,
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 12,
  },
});

export default XFood;
