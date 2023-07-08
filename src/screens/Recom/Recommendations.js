import React, {useState, useEffect} from 'react';
import {
  Alert,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {SIZES, COLORS} from '../../constants/theme';
import {Text, View} from 'react-native';
import fonts from '../../constants/fonts';
import {
  get_exe_list_by_category,
  get_food_list_by_sick,
  get_ingre_list_by_sick,
  get_sick_list,
  user_health_info,
  user_status_info,
} from '../../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/native';
import FoodCom from './FoodCom';
import CartSick from '../../components/HomeCom/CartSick';
import ExeCom from './ExeCom';
const {height, width} = Dimensions.get('window');

const Recommendations = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [status, setStatus] = useState();
  const [token, setToken] = useState();
  const [searchText, setSearchText] = useState('');
  const [sick, setSick] = useState();
  const [foods, setFoods] = useState([]);
  const [foodsAnti, setFoodsAnti] = useState([]);
  const [sickId, setSickId] = useState();
  const [sick1, setSick1] = useState();
  const [sick2, setSick2] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categoryExes, setCategoryExes] = useState([]);
  const [showSickList, setShowSickList] = useState(false);
  const [showExeList, setShowExeList] = useState(false);
  const [showIngList, setShowIngList] = useState(false);
  const [showIngList1, setShowIngList1] = useState(false);
  const [showFoodList, setShowFoodList] = useState(false);
  const [showFoodListAnti, setShowFoodListAnti] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => getInfoToken())();
    if (token) {
      (async () => getInfoStatus(token))();
    }
    if (token && status === 1) {
      (async () => getInfoHealth(token))();
    }
    (async () => getInfoSick(sickId))();
  }, [isFocused, sickId, token, status]);
  useEffect(() => {
    if (sickId > 1) {
      (async () => getListFood(sickId))();
      (async () => getListFoodAnti(Number(0 - sickId)))();
      (async () => getInfoSick1(sickId))();
      (async () => getExesByCategory(sickId))();
      (async () => getIngre(sickId))();
    }
    (async () => getInfoSick2())();
  }, [sickId,isFocused]);

  const getInfoToken = async () => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
    });
  };
  const getInfoStatus = async token => {
    await user_status_info({
      token: token,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setStatus(res.data.status.status);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoHealth = async token => {
    await user_health_info({
      limit: 1,
      token: token,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setSickId(res.data.info[0].sickId);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoSick = async sickId => {
    await get_sick_list({
      info: 0,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          if (sickId) {
            setSick(res.data.sick[sickId - 1].value);
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getListFood = async sickId => {
    await get_food_list_by_sick({
      sickId: sickId,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setFoods(res.data.food);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getListFoodAnti = async sickId => {
    await get_food_list_by_sick({
      sickId: sickId,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setFoodsAnti(res.data.food);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoSick1 = async sickId => {
    await get_sick_list({
      info: 1,
      id: sickId,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setSick1(res.data.sick);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoSick2 = async () => {
    await get_sick_list({
      info: 1,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setSick2(res.data.sick);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const handleSearchTextChange = text => {
    setSearchText(text);
    setShowExeList(true);
    setShowFoodList(true);
    setShowFoodListAnti(true);
    setShowSickList(true);
  };
  const handleIngPress = () => {
    setShowIngList(!showIngList);
  };
  const handleIngPress1 = () => {
    setShowIngList1(!showIngList1);
  };
  const handleXemPress = () => {
    setShowExeList(!showExeList);
  };
  const handleFoodPress = () => {
    setShowFoodList(!showFoodList);
  };
  const handleFoodAntiPress = () => {
    setShowFoodListAnti(!showFoodListAnti);
  };
  const handleSickPress = () => {
    setShowSickList(!showSickList);
  };
  const getExesByCategory = async sickId => {
    await get_exe_list_by_category({
      sickId: sickId,
    })
      .then(async res => {
        if (res.data.errCode === 0) {
          setCategoryExes(res.data.exercise);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getIngre = async sickId => {
    try {
      const response = await get_ingre_list_by_sick({id: sickId});
      setData1(response.data.ingre.should);
      setData2(response.data.ingre.shouldnot);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const IngreInfo = props => {
    const {navigation, ingre} = props;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('IngreDetail', ingre)}>
        <View style={{paddingVertical: 3}}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#4ceb59eb',
              borderRadius: 10,
              padding: 5,
              paddingLeft: 20,
            }}>
            <Text style={{fontSize: 15, color: COLORS.white}}>
              {ingre.name}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <Text style={{fontSize: 12, paddingRight: 10}}>
                Calo : {ingre.calo}
              </Text>
              <Text style={styles.calo}>Protein : {ingre.protein}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  if (status === 1 && sickId === 1) {
    return (
      <View style={{backgroundColor: COLORS.white, flex: 1, paddingBottom: 82}}>
        <View
          style={{
            backgroundColor: '#00a46c',
            height: '28%',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingHorizontal: 20,
          }}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUArwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABkQAQEBAQEBAAAAAAAAAAAAAAABEUExAv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgcF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD3yorkz2BUVFAAABBUUwAEABRKlW+pVEqKgIAozWetVnqxY7QSKyigqCCgIoAKgCiAAJQNQFEBAChVGaz1qs9WK6gMoqsqDQggommgomroAamgCFUEEAAUEqoCVm+tVmrFdAEVRFRlRAFEUBUAAAEABFRQAAtQqClZrTNag2vGVRVDREoqCIogCiAKIAogAAoF8C0VEVFXBmrWfpYjYioqxWWp4iAAgAAAAAAAACX0VbUQABFUZrTFUbEURVZVBqCGoKJqiAAAAAFoFZAURUUARVKytZqwaXQRBQBdAQFADTQAAASgAgAlpoKCUFWIxaosR//Z',
            }}
            style={{
              height: 10,
              width: 20,
              marginTop: 50,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 25,
              width: '100%',
            }}>
            <View style={{width: '50%'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#FFF',
                  fontWeight: 'bold',
                }}>
                Bạn đang
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#d9ff2f',
                  fontWeight: 'bold',
                }}>
                Khoẻ mạnh
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#FFF',
                  fontWeight: 'bold',
                }}>
                Vui lòng giữ chế độ ăn uống tập luyện lành mạnh
              </Text>
            </View>
            <View style={{width: '50%', alignItems: 'flex-end'}}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUArwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABkQAQEBAQEBAAAAAAAAAAAAAAABEUExAv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgcF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD3yorkz2BUVFAAABBUUwAEABRKlW+pVEqKgIAozWetVnqxY7QSKyigqCCgIoAKgCiAAJQNQFEBAChVGaz1qs9WK6gMoqsqDQggommgomroAamgCFUEEAAUEqoCVm+tVmrFdAEVRFRlRAFEUBUAAAEABFRQAAtQqClZrTNag2vGVRVDREoqCIogCiAKIAogAAoF8C0VEVFXBmrWfpYjYioqxWWp4iAAgAAAAAAAACX0VbUQABFUZrTFUbEURVZVBqCGoKJqiAAAAAFoFZAURUUARVKytZqwaXQRBQBdAQFADTQAAASgAgAlpoKCUFWIxaosR//Z',
                }}
                style={{height: 60, width: 60}}
              />
            </View>
          </View>
        </View>
        <View
          colors={['rgba(0,164,109,0.4)', 'transparent']}
          style={{
            left: 0,
            right: 0,
            height: 90,
            marginTop: -45,
          }}>
          <View
            style={{
              backgroundColor: '#FFF',
              paddingVertical: 8,
              paddingHorizontal: 20,
              marginHorizontal: 20,
              borderRadius: 15,
              marginTop: 25,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Tìm kiếm"
              placeholderTextColor="#b1e5d3"
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                width: 260,
              }}
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Xem lịch sử ăn uống
              </Text>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProFileEat')}
                style={{
                  backgroundColor: '#36fff5',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#020202',
                  }}>
                  Xem
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingHorizontal: 20,
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#585a61',
                  }}>
                  Món ăn
                </Text>
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('XFood')}
                  style={{
                    backgroundColor: '#00a46c',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: '#FFF',
                    }}>
                    Xem
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingHorizontal: 20,
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#585a61',
                  }}>
                  Bài tập thể dục
                </Text>
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('XExercise')}
                  style={{
                    backgroundColor: '#00a46c',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: '#FFF',
                    }}>
                    Xem
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 20,
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#585a61',
                  }}>
                  Thông tin một số bệnh
                </Text>
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={handleSickPress}
                  style={{
                    backgroundColor: '#00a46c',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: '#FFF',
                    }}>
                    {showSickList ? 'Ẩn' : 'Xem'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {showSickList && Array.isArray(sick2) && sick2.length > 0 && (
            <View>
              <FlatList
                snapToInterval={width - 20}
                contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={sick2.filter(item =>
                  item.name.toLowerCase().includes(searchText.toLowerCase()),
                )}
                renderItem={({item}) => (
                  <CartSick sick={item} navigation={navigation} />
                )}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
  if (status !== 1) {
    return (
      <View style={{backgroundColor: COLORS.white, flex: 1, paddingBottom: 82}}>
        <View
          style={{
            backgroundColor: '#00a46c',
            height: '28%',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingHorizontal: 20,
          }}>
          <Image
            source={{
              uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUArwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABkQAQEBAQEBAAAAAAAAAAAAAAABEUExAv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgcF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD3yorkz2BUVFAAABBUUwAEABRKlW+pVEqKgIAozWetVnqxY7QSKyigqCCgIoAKgCiAAJQNQFEBAChVGaz1qs9WK6gMoqsqDQggommgomroAamgCFUEEAAUEqoCVm+tVmrFdAEVRFRlRAFEUBUAAAEABFRQAAtQqClZrTNag2vGVRVDREoqCIogCiAKIAogAAoF8C0VEVFXBmrWfpYjYioqxWWp4iAAgAAAAAAAACX0VbUQABFUZrTFUbEURVZVBqCGoKJqiAAAAAFoFZAURUUARVKytZqwaXQRBQBdAQFADTQAAASgAgAlpoKCUFWIxaosR//Z',
            }}
            style={{
              height: 10,
              width: 20,
              marginTop: 50,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 25,
              width: '100%',
            }}>
            <View style={{width: '50%'}}>
              <Text
                style={{
                  fontSize: 15,
                  color: '#FFF',
                  fontWeight: 'bold',
                }}>
                Bạn chưa nhập
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  color: '#d9ff2f',
                  fontWeight: 'bold',
                }}>
                Thông tin sức khỏe
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#FFF',
                  fontWeight: 'bold',
                }}>
                Vui lòng nhập thông tin để chung tôi đề xuất thực phầm và bài
                tập phù hợp cho bạn
              </Text>
            </View>
            <View style={{width: '50%', alignItems: 'flex-end'}}>
              <Image
                source={{
                  uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUArwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABkQAQEBAQEBAAAAAAAAAAAAAAABEUExAv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgcF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD3yorkz2BUVFAAABBUUwAEABRKlW+pVEqKgIAozWetVnqxY7QSKyigqCCgIoAKgCiAAJQNQFEBAChVGaz1qs9WK6gMoqsqDQggommgomroAamgCFUEEAAUEqoCVm+tVmrFdAEVRFRlRAFEUBUAAAEABFRQAAtQqClZrTNag2vGVRVDREoqCIogCiAKIAogAAoF8C0VEVFXBmrWfpYjYioqxWWp4iAAgAAAAAAAACX0VbUQABFUZrTFUbEURVZVBqCGoKJqiAAAAAFoFZAURUUARVKytZqwaXQRBQBdAQFADTQAAASgAgAlpoKCUFWIxaosR//Z',
                }}
                style={{height: 60, width: 60}}
              />
            </View>
          </View>
        </View>
        <View
          colors={['rgba(0,164,109,0.4)', 'transparent']}
          style={{
            left: 0,
            right: 0,
            height: 90,
            marginTop: -45,
          }}>
          <View
            style={{
              backgroundColor: '#FFF',
              paddingVertical: 8,
              paddingHorizontal: 20,
              marginHorizontal: 20,
              borderRadius: 15,
              marginTop: 25,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TextInput
              placeholder="Tìm kiếm"
              placeholderTextColor="#b1e5d3"
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                width: 260,
              }}
              value={searchText}
              onChangeText={handleSearchTextChange}
            />
          </View>
        </View>
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingHorizontal: 20,
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{width: '60%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#585a61',
                  }}>
                  Nhập thông tin sức khỏe
                </Text>
              </View>
              <View style={{width: '40%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ProfileEditHealth')}
                  style={{
                    backgroundColor: '#0083a4',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: '#FFF',
                    }}>
                    Nhập
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Nhập thực phẩm ăn vào hôm nay
              </Text>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('XMap')}
                style={{
                  backgroundColor: '#fffc36',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#020202',
                  }}>
                  Nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Xem lịch sử ăn uống
              </Text>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProFileEat')}
                style={{
                  backgroundColor: '#36fff5',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#020202',
                  }}>
                  Xem
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingHorizontal: 20,
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#585a61',
                  }}>
                  Bài tập thể dục
                </Text>
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('XExercise')}
                  style={{
                    backgroundColor: '#00a46c',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: '#FFF',
                    }}>
                    Xem
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingHorizontal: 20,
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#585a61',
                  }}>
                  Công thức nấu ăn
                </Text>
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('XFood')}
                  style={{
                    backgroundColor: '#00a46c',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: '#FFF',
                    }}>
                    Xem
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 10,
                paddingBottom: 10,
                paddingHorizontal: 20,
                width: '100%',
                alignItems: 'center',
              }}>
              <View style={{width: '50%'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 17,
                    color: '#585a61',
                  }}>
                  Thông tin một số bệnh
                </Text>
              </View>
              <View style={{width: '50%', alignItems: 'flex-end'}}>
                <TouchableOpacity
                  onPress={handleSickPress}
                  style={{
                    backgroundColor: '#a43400',
                    paddingHorizontal: 20,
                    paddingVertical: 5,
                    borderRadius: 15,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 13,
                      color: '#FFF',
                    }}>
                    {showSickList ? 'Ẩn' : 'Xem'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {showSickList && Array.isArray(sick2) && sick2.length > 0 && (
            <View>
              <FlatList
                snapToInterval={width - 20}
                contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={sick2.filter(item =>
                  item.name.toLowerCase().includes(searchText.toLowerCase()),
                )}
                renderItem={({item}) => (
                  <CartSick sick={item} navigation={navigation} />
                )}
              />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{backgroundColor: COLORS.white, flex: 1, paddingBottom: 82}}>
      <View
        style={{
          backgroundColor: '#00a46c',
          height: '28%',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20,
        }}>
        <Image
          source={{
            uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUArwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABkQAQEBAQEBAAAAAAAAAAAAAAABEUExAv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgcF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD3yorkz2BUVFAAABBUUwAEABRKlW+pVEqKgIAozWetVnqxY7QSKyigqCCgIoAKgCiAAJQNQFEBAChVGaz1qs9WK6gMoqsqDQggommgomroAamgCFUEEAAUEqoCVm+tVmrFdAEVRFRlRAFEUBUAAAEABFRQAAtQqClZrTNag2vGVRVDREoqCIogCiAKIAogAAoF8C0VEVFXBmrWfpYjYioqxWWp4iAAgAAAAAAAACX0VbUQABFUZrTFUbEURVZVBqCGoKJqiAAAAAFoFZAURUUARVKytZqwaXQRBQBdAQFADTQAAASgAgAlpoKCUFWIxaosR//Z',
          }}
          style={{
            height: 10,
            width: 20,
            marginTop: 50,
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 25,
            width: '100%',
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontSize: 15,
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              Bạn đang bị
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: '#d9ff2f',
                fontWeight: 'bold',
              }}>
              {sick}
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: '#FFF',
                fontWeight: 'bold',
              }}>
              Vui lòng chú ý chế độ ăn uống tập luyện
            </Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <Image
              source={{
                uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHUArwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBv/EABkQAQEBAQEBAAAAAAAAAAAAAAABEUExAv/EABgBAQEBAQEAAAAAAAAAAAAAAAABAgcF/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD3yorkz2BUVFAAABBUUwAEABRKlW+pVEqKgIAozWetVnqxY7QSKyigqCCgIoAKgCiAAJQNQFEBAChVGaz1qs9WK6gMoqsqDQggommgomroAamgCFUEEAAUEqoCVm+tVmrFdAEVRFRlRAFEUBUAAAEABFRQAAtQqClZrTNag2vGVRVDREoqCIogCiAKIAogAAoF8C0VEVFXBmrWfpYjYioqxWWp4iAAgAAAAAAAACX0VbUQABFUZrTFUbEURVZVBqCGoKJqiAAAAAFoFZAURUUARVKytZqwaXQRBQBdAQFADTQAAASgAgAlpoKCUFWIxaosR//Z',
              }}
              style={{height: 60, width: 60}}
            />
          </View>
        </View>
      </View>
      <View
        colors={['rgba(0,164,109,0.4)', 'transparent']}
        style={{
          left: 0,
          right: 0,
          height: 90,
          marginTop: -45,
        }}>
        <View
          style={{
            backgroundColor: '#FFF',
            paddingVertical: 8,
            paddingHorizontal: 20,
            marginHorizontal: 20,
            borderRadius: 15,
            marginTop: 25,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            placeholder="Tìm kiếm"
            placeholderTextColor="#b1e5d3"
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              width: 260,
            }}
            value={searchText}
            onChangeText={handleSearchTextChange}
          />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            width: '100%',
            alignItems: 'center',
          }}>
          <View style={{width: '50%'}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 17,
                color: '#585a61',
              }}>
              Thông tin về bệnh
            </Text>
          </View>
          <View style={{width: '50%', alignItems: 'flex-end'}}>
            <TouchableOpacity
              onPress={() => navigation.navigate('DetailSick', sick1[0])}
              style={{
                backgroundColor: '#00a46c',
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 15,
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  color: '#FFF',
                }}>
                Tìm hiểu
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Nhập thực phẩm ăn vào hôm nay
              </Text>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('XMap')}
                style={{
                  backgroundColor: '#fffc36',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#020202',
                  }}>
                  Nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '80%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Xem lịch sử ăn uống
              </Text>
            </View>
            <View style={{width: '20%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ProFileEat')}
                style={{
                  backgroundColor: '#36fff5',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#020202',
                  }}>
                  Xem
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '50%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Các bài tập thể dục
              </Text>
            </View>
            <View style={{width: '50%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={handleXemPress}
                style={{
                  backgroundColor: '#00a46c',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#FFF',
                  }}>
                  {showExeList ? 'Ẩn' : 'Xem'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {showExeList && (
            <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={categoryExes.filter(item =>
                  item.name.toLowerCase().includes(searchText.toLowerCase()),
                )}
                renderItem={({item}) => (
                  <ExeCom exe={item} navigation={navigation} />
                )}
              />
            </View>
          )}
          {categoryExes.length === 0 && showExeList && (
            <View style={{paddingHorizontal: 40, paddingVertical: 20}}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 13,
                  color: '#000000',
                  paddingBottom: 10,
                }}>
                Không có bài tập cụ thể cho {sick}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('XExercise')}
                style={{
                  backgroundColor: '#00a46c',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#FFF',
                  }}>
                  Xem tất cả bài tập
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '50%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Gợi ý các món nên ăn
              </Text>
            </View>
            <View style={{width: '50%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={handleFoodPress}
                style={{
                  backgroundColor: '#009ea4',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#FFF',
                  }}>
                  {showFoodList ? 'Ẩn' : 'Xem'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {showFoodList && (
            <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={foods.filter(item =>
                  item.name.toLowerCase().includes(searchText.toLowerCase()),
                )}
                renderItem={({item}) => (
                  <FoodCom food={item} navigation={navigation} />
                )}
              />
            </View>
          )}
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '50%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Các món không nên ăn
              </Text>
            </View>
            <View style={{width: '50%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={handleFoodAntiPress}
                style={{
                  backgroundColor: '#ff1616',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#FFF',
                  }}>
                  {showFoodListAnti ? 'Ẩn' : 'Xem'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {showFoodListAnti && (
            <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={foodsAnti.filter(item =>
                  item.name.toLowerCase().includes(searchText.toLowerCase()),
                )}
                renderItem={({item}) => (
                  <FoodCom food={item} navigation={navigation} />
                )}
              />
            </View>
          )}
          {foodsAnti.length === 0 && showFoodListAnti && (
            <View style={{paddingHorizontal: 40, paddingVertical: 10}}>
              <Text
                style={{
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  fontSize: 13,
                  color: '#000000',
                  paddingBottom: 10,
                }}>
                Không có món không nên ăn
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('XFood')}
                style={{
                  backgroundColor: '#a40000',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#FFF',
                  }}>
                  Xem tất cả món ăn
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '70%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Thực phẩm khuyên dùng
              </Text>
            </View>
            <View style={{width: '30%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={handleIngPress}
                style={{
                  backgroundColor: '#009ea4',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#FFF',
                  }}>
                  {showIngList ? 'Ẩn' : 'Xem'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {showIngList && data1 && (
            <View style={{flex: 1, padding: 24, paddingTop: 10}}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                data1.map(item => (
                  <IngreInfo
                    key={item.id}
                    ingre={item}
                    navigation={navigation}
                  />
                ))
              )}
            </View>
          )}
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
              paddingHorizontal: 20,
              width: '100%',
              alignItems: 'center',
            }}>
            <View style={{width: '70%'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: '#585a61',
                }}>
                Thực phẩm hạn chế dùng
              </Text>
            </View>
            <View style={{width: '30%', alignItems: 'flex-end'}}>
              <TouchableOpacity
                onPress={handleIngPress1}
                style={{
                  backgroundColor: '#ff1616',
                  paddingHorizontal: 20,
                  paddingVertical: 5,
                  borderRadius: 15,
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 13,
                    color: '#FFF',
                  }}>
                  {showIngList1 ? 'Ẩn' : 'Xem'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {showIngList1 && data2 && (
            <View style={{flex: 1, padding: 24, paddingTop: 10}}>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                data2.map(item => (
                  <IngreInfo
                    key={item.id}
                    ingre={item}
                    navigation={navigation}
                  />
                ))
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#eed2d2',
    paddingVertical: 10,
    margin: 5,
  },
  text: {
    color: COLORS.black,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  viewNotice: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    width: width,
    flexDirection: 'row',
    backgroundColor: '#ffa5a5',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  title: {
    fontSize: 20,
    color: COLORS.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
  title1: {
    fontSize: 15,
    color: COLORS.red,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
});

export default Recommendations;
