import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SIZES, COLORS } from '../../../constants/theme';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import XIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Feather';
import IIcon from 'react-native-vector-icons/FontAwesome5';
import UserAvatar from 'react-native-user-avatar';
import { foods } from '../../../data/foods';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get_category_exe_list, get_category_food_list, get_exe_list_by_category, get_food_list_by_category, user_info } from '../../../api/user_api';
const { height, width } = Dimensions.get('window');

const XExercise = props => {
  const [activeCategory, setActiveCategory] = useState(0);
  const { navigation, food } = props;
  const { navigate, goBack } = navigation;
  const [name, setName] = useState('name');
  const [categoryFoods, setCategoryFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const [token, setToken] = useState('token');
  const [searchQuery, setSearchQuery] = useState('');
  const [avatar, setAvatar] = useState(
    '',
  );
  useEffect(() => {
    (async () => getInfoCategory())();
    getExesByCategory('ALL');
  }, []);
  useEffect(() => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
      getInfoUser(value);
    });
  });
  const getInfoUser = async token => {
    const tk = await AsyncStorage.getItem('AccessToken');
    setToken(tk);
    user_info({
      jwtToken: token,
    })
      .then(async res => {
        if (!res.data.message) {
          setAvatar(res.data.user.avatar);
          setName(res.data.user.fullName);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoCategory = async () => {
    await get_category_exe_list()
      .then(async res => {
        if (res.data.errCode === 0) {
          const allCategory = [{ id: 'ALL', name: 'Tất cả' }];
          const updatedCategories = allCategory.concat(res.data.exerciseCa);
          setCategories(updatedCategories);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getExesByCategory = async (categoryId) => {
    await get_exe_list_by_category({
      categoryId: categoryId,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setCategoryFoods(res.data.exercise);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <SafeAreaView>
      <View style={{ padding: 20 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => goBack()}
              style={{
                margin: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <XIcon name="arrow-back" size={28} color={COLORS.xGreen} />
              <Text style={{ fontSize: 20, color: COLORS.xGreen }}>Back</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {!avatar ? (
              <View
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 30,
                  marginRight: 10,
                }}>
                <UserAvatar size={40} name={name} />
              </View>
            ) : (
              <Image
                source={{ uri: avatar }}
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 30,
                  marginRight: 10,
                }}
              />
            )}
            <Text style={styles.name}>{name}</Text>
          </View>
        </View>
        <View style={{ width: '60%', marginTop: 20 }}>
          <Text
            style={{ fontSize: 30, fontWeight: '700', color: COLORS.black }}>
            Thể dục để khỏe mạnh !
          </Text>
        </View>
        <View style={styles.inputContainer}>
          <Icon name="search" size={20} color={COLORS.black} />
          <TextInput
            placeholder="Nhập để tìm kiếm"
            style={{ color: COLORS.black }}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          {categories.map((category, index) => (
            <TouchableOpacity
              style={{ marginRight: 30 }}
              onPress={() => {
                setActiveCategory(index);
                getExesByCategory(category.id); // Gọi hàm để lấy danh sách món ăn của category
              }}
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
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView>
          <View
            style={{
              marginTop: 30,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}>
            {categoryFoods.filter((exe) => exe.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((exe, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('DetailExe', exe)}
                  style={{ width: width / 2 - 30, marginBottom: 15 }}
                  key={exe.id}>
                  <View>
                    <ImageBackground
                      style={{
                        width: '100%',
                        borderRadius: 20,
                        overflow: 'hidden',
                        height: width / 2,
                      }}
                      source={{ uri: `https://storage.googleapis.com/healthfood-do/${exe.image}` }}>
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
                          <View style={{ flexDirection: 'row' }}>
                            <Icon
                              style={{ marginLeft: 15 }}
                              name="tag"
                              size={22}
                              color={COLORS.title}
                            />
                            <Text
                              style={{
                                fontWeight: 'bold',
                                flexDirection: 'row',
                                marginLeft: 10,
                                color: COLORS.red,
                                textShadowColor: COLORS.white,
                                textShadowOffset: { width: 1, height: 1 },
                                textShadowRadius: 4,
                              }}>
                              {exe.tag}
                            </Text>
                          </View>
                          <View style={{ flexDirection: 'row', marginLeft: 10 }}>
                            <Icon name="star" size={22} color={COLORS.yellow} />
                            <Text
                              style={{
                                fontWeight: 'bold',
                                flexDirection: 'row',
                                marginLeft: 10,
                                color: COLORS.yellow,
                                textShadowColor: COLORS.black,
                                textShadowOffset: { width: 1, height: 1 },
                                textShadowRadius: 5,
                              }}>
                              {exe.star}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: '700',
                      color: COLORS.black,
                    }}>
                    {exe.name}
                  </Text>
                  <View style={{ flexDirection: 'row' }}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flex: 1,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          alignItems:'flex-end',
                          marginTop: 5,
                        }}>
                        <View style={{ flexDirection: 'row' }}>
                          <IIcon
                            style={{ marginLeft: 15 }}
                            name="clock"
                            size={18}
                            color={COLORS.red}
                          />
                          <Text
                            style={{
                              fontWeight: 'bold',
                              flexDirection: 'row',
                              marginLeft: 10,
                              color: COLORS.xGreen,
                              textShadowColor: COLORS.white,
                              textShadowOffset: { width: 1, height: 1 },
                              textShadowRadius: 4,
                            }}>
                            {exe.time} phút
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>

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

export default XExercise;
