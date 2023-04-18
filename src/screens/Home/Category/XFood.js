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
import XIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import categories from '../../../data/categories';
import {foods} from '../../../data/foods';
const {height, width} = Dimensions.get('window');

const XFood = props => {
  const [activeCategory, setActiveCategory] = useState(0);
  const {navigation, food} = props;
  const {navigate, goBack} = navigation;
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{padding: 20}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => goBack()}
                style={{
                  margin: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <XIcon name="arrow-back" size={28} color={COLORS.xGreen} />
                <Text style={{fontSize: 20, color: COLORS.xGreen}}>Back</Text>
              </TouchableOpacity>
            </View>
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
          </View>
          <View style={{width: '60%', marginTop: 20}}>
            <Text
              style={{fontSize: 30, fontWeight: '700', color: COLORS.black}}>
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
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {categories.map((category, index) => (
              <TouchableOpacity
                style={{marginRight: 30}}
                onPress={() => setActiveCategory(index)}
                key={index}>
                <Text
                  style={[
                    {
                      fontSize: 17,
                      fontWeight: '600',
                      color: COLORS.gray,
                    },
                    activeCategory === index && {
                      color: COLORS.black,
                      fontWeight: '800',
                      fontSize: 17.5,
                    },
                  ]}>
                  {category.title}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {foods.map((food, index) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('DetailFood', food)}
                style={{width: width / 2 - 30, marginBottom: 15}}
                key={food.id}>
                <View>
                  <ImageBackground
                    style={{
                      width: '100%',
                      borderRadius: 20,
                      overflow: 'hidden',
                      height: width / 2,
                    }}
                    source={food.image}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        alignItems: 'flex-end',
                        flex: 1,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          flexDirection: 'row',
                          marginTop: 10,
                        }}>
                        <View style={{flexDirection: 'row'}}>
                          <Icon
                            style={{marginLeft: 15}}
                            name="tag"
                            size={22}
                            color={COLORS.title}
                          />
                          <Text
                            style={{
                              fontWeight: 'bold',
                              flexDirection: 'row',
                              marginLeft: 10,
                              color: COLORS.white,
                            }}>
                            {food.tag}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginLeft: 10}}>
                          <Icon name="star" size={22} color={COLORS.yellow} />
                          <Text
                            style={{
                              fontWeight: 'bold',
                              flexDirection: 'row',
                              marginLeft: 10,
                              color: COLORS.white,
                            }}>
                            {food.star}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '700',
                    color: COLORS.black,
                  }}>
                  {food.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '700',
                    color: COLORS.black,
                  }}>
                  Calo : {food.calo}
                </Text>
              </TouchableOpacity>
            ))}
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
