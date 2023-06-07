import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import {SIZES, COLORS} from '../../constants/theme';
import {lifestyles} from '../../data/lifestyle';
import IIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text, View, ScrollView} from 'react-native';
import CartLife from '../../components/HomeCom/CartLife';
import CartFood from '../../components/HomeCom/CartFood';
import {getBlog, get_sick_list, user_health_info} from '../../api/user_api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import CartSick from '../../components/HomeCom/CartSick';
const {height} = Dimensions.get('window');
const {width} = Dimensions.get('screen');

const Home = props => {
  const {navigation, route} = props;
  const {navigate, goBack} = navigation;
  const [foods, setFoods] = useState([]);
  const [notes, setNotes] = useState([]);
  const [tips, setTips] = useState([]);
  const [status, setStatus] = useState();
  const [sickId, setSickId] = useState();
  const [search, setSearch] = useState();
  const [lifestyles, setLifestyles] = useState([]);
  const isFocused = useIsFocused();
  const [arrSick, setArrSick] = useState([]);
  const [sick, setSick] = useState();
  const [sick1, setSick1] = useState();
  const [token, setToken] = useState();
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => getInfoStatus())();
    (async () => getInfoHealth(token))();
    (async () => getInfoSick(sickId))();
    (async () => getInfoSick1())();
    (async () => getInfoBlogFood())();
    (async () => getInfoBlogNote())();
    (async () => getInfoBlogLife())();
    (async () => getInfoBlogTip())();
  }, [isFocused, sickId, token]);
  const getInfoStatus = async () => {
    AsyncStorage.getItem('AccessToken').then(async value => {
      await setToken(value);
    });
    AsyncStorage.getItem('Status').then(async value => {
      await setStatus(parseInt(value));
    });
  };
  const getInfoHealth = async token => {
    await user_health_info({
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
  const getInfoBlogLife = async () => {
    getBlog({
      categoryId: 1,
    })
      .then(async res => {
        if (!res.data.message) {
          setLifestyles(res.data.blog);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoBlogTip = async () => {
    getBlog({
      categoryId: 4,
    })
      .then(async res => {
        if (!res.data.message) {
          setTips(res.data.blog);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoBlogFood = async () => {
    getBlog({
      categoryId: 2,
    })
      .then(async res => {
        if (!res.data.message) {
          setFoods(res.data.blog);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoBlogNote = async () => {
    getBlog({
      categoryId: 3,
    })
      .then(async res => {
        if (!res.data.message) {
          setNotes(res.data.blog);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getInfoSick1 = async () => {
    await get_sick_list({
      info: 1,
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

  const clickFood = () => {
    navigate('XFood');
  };
  const clickBody = () => {
    navigate('XExercise');
  };
  const clickScan = () => {
    navigate('XScan');
  };
  const clickMap = () => {
    navigate('XMap');
  };
  const categoryIcons = [
    <IIcon
      onPress={() => clickFood()}
      name="fast-food"
      size={25}
      color={COLORS.xGreen}
    />,
    <IIcon
      onPress={() => clickBody()}
      name="body"
      size={25}
      color={COLORS.xGreen}
    />,
    <Icon
      onPress={() => clickScan()}
      name="qrcode"
      size={25}
      color={COLORS.xGreen}
    />,
    <IIcon
      onPress={() => clickMap()}
      name="add-circle-sharp"
      size={25}
      color={COLORS.xGreen}
    />,
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
  function handleSearch(text) {
    setSearch(text);
    console.log(text);
  }

  return (
    <SafeAreaView
      style={{flex: 1, paddingBottom: 85, backgroundColor: COLORS.white}}>
      <StatusBar translucent={false} backgroundColor={COLORS.xGreen} />
      <View style={styles.header}>
        <Icon name="question-circle-o" size={24} color={COLORS.black} />
        <Icon
          onPress={() => {
            Alert.alert('Thông báo', 'Không có thông báo!');
          }}
          name="bell-o"
          size={24}
          color={COLORS.black}
        />
      </View>
      {status === 0 && (
        <View style={styles.header1}>
          <View style={styles.viewNotice}>
            <Icon name="exclamation-triangle" size={15} color={COLORS.yellow} />
            <Text
              style={styles.text}
              onPress={() => {
                navigate('ProfileEditHealth');
              }}>
              Bạn chưa nhập thông tin sức khỏe
            </Text>
          </View>
        </View>
      )}
      {sickId === 1 && status !== 0 && (
        <View style={styles.header1}>
          <View style={styles.viewNotice}>
            <Icon name="check-circle" size={15} color="#70f722" />
            <Text
              style={styles.text}
              onPress={() => {
                navigate('XFood');
              }}>
              Bạn đang khỏe mạnh
            </Text>
          </View>
        </View>
      )}
      {sickId !== 1 && status !== 0 && (
        <View style={styles.header1}>
          <View style={styles.viewNotice}>
            <Icon
              style={{paddingRight: 10}}
              name="exclamation-circle"
              size={20}
              color="#ff0000"
            />
            <View style={{flexDirection: 'column'}}>
              <Text
                style={styles.text}
                onPress={() => {
                  navigate('Recommendations');
                }}>
                Bạn đang bị {sick}
              </Text>
              <Text
                style={styles.text}
                onPress={() => {
                  navigate('Recommendations');
                }}>
                Vui lòng chú ý chế độ ăn khuyến nghị !
              </Text>
            </View>
          </View>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{marginBottom: 10}}>
        <View
          style={{
            backgroundColor: COLORS.xGreen,
            height: 120,
            paddingHorizontal: 20,
          }}>
          <View style={{flex: 1}}>
            <Text style={styles.title}>Vì một cuộc sống</Text>
            <Text style={styles.title}>tốt đẹp hơn</Text>
            <View style={styles.inputContainer}>
              <Icon name="search" size={20} color={COLORS.black} />
              <TextInput
                onChangeText={text => handleSearch(text)}
                placeholder="Nhập để tìm kiếm"
                style={{color: COLORS.black}}
              />
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={styles.secondTitle}>Lifestyle</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={lifestyles}
            renderItem={({item}) => (
              <CartLife lifestyle={item} navigation={navigation} />
            )}
          />
        </View>
        <Text style={styles.secondTitle1}>Công thức nấu ăn</Text>
        <View>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={foods}
            renderItem={({item}) => (
              <CartFood food={item} navigation={navigation} />
            )}
          />
        </View>
        <Text style={styles.secondTitle}>Lưu ý</Text>
        <View>
          <FlatList
            contentContainerStyle={{paddingLeft: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={notes}
            renderItem={({item}) => (
              <CartLife lifestyle={item} navigation={navigation} />
            )}
          />
        </View>
        <Text style={styles.secondTitle1}>Mẹo vặt</Text>
        <View>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tips}
            renderItem={({item}) => (
              <CartFood food={item} navigation={navigation} />
            )}
          />
        </View>
        <Text style={styles.secondTitle1}>Thông tin bệnh cơ bản</Text>
        <View>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{paddingLeft: 20, paddingBottom: 20}}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={sick1}
            renderItem={({item}) => (
              <CartSick sick={item} navigation={navigation} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  viewNotice: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 7,
  },
  text: {
    color: COLORS.black,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  secondTitle: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  secondTitle1: {
    marginHorizontal: 20,
    marginVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0c9bb4',
  },
  iconContainer: {
    height: 60,
    width: 60,
    backgroundColor: COLORS.grey,
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
    paddingBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.xGreen,
  },
  header1: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: COLORS.xGreen,
    alignItems: 'center',
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
    elevation: 12,
  },
});

export default Home;
