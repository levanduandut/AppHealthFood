import React, { useState, useEffect } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
} from 'react-native';
import { SIZES, COLORS } from '../../constants/theme';
import { lifestyles } from '../../data/lifestyle';
import IIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  View,
  ScrollView,
} from 'react-native';
import CartLife from '../../components/HomeCom/CartLife';
import CartFood from '../../components/HomeCom/CartFood';
import { getBlog } from '../../api/user_api';
const { height } = Dimensions.get('window');
const { width } = Dimensions.get('screen');

const Home = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;
  const [foods, setFoods] = useState([]);
  const [notes, setNotes] = useState([]);
  const [tips, setTips] = useState([]);
  const [lifestyles, setLifestyles] = useState([]);
  useEffect(() => {
    (async () => getInfoBlogFood())();
    (async () => getInfoBlogNote())();
    (async () => getInfoBlogLife())();
    (async () => getInfoBlogTip())();
  }, []);
  const getInfoBlogLife = async () => {
    getBlog({
      categoryId:1,
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
      categoryId:4,
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
      categoryId:2,
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
      categoryId:3,
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

  return (
    <SafeAreaView
      style={{ flex: 1, paddingBottom: 85, backgroundColor: COLORS.white }}>
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 10 }}>
        <View
          style={{
            backgroundColor: COLORS.xGreen,
            height: 120,
            paddingHorizontal: 20,
          }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Vì một cuộc sống</Text>
            <Text style={styles.title}>tốt đẹp hơn</Text>
            <View style={styles.inputContainer}>
              <Icon name="search" size={20} color={COLORS.black} />
              <TextInput
                placeholder="Nhập để tìm kiếm"
                style={{ color: COLORS.black }}
              />
            </View>
          </View>
        </View>
        <ListCategories />
        <Text style={styles.secondTitle}>Lifestyle</Text>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={lifestyles}
            renderItem={({ item }) => (
              <CartLife lifestyle={item} navigation={navigation} />
            )}
          />
        </View>
        <Text style={styles.secondTitle1}>Công thức nấu ăn</Text>
        <View>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={foods}
            renderItem={({ item }) => (
              <CartFood food={item} navigation={navigation} />
            )}
          />
        </View>
        <Text style={styles.secondTitle}>Lưu ý</Text>
        <View>
          <FlatList
            contentContainerStyle={{ paddingLeft: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={notes}
            renderItem={({ item }) => (
              <CartLife lifestyle={item} navigation={navigation} />
            )}
          />
        </View>
        <Text style={styles.secondTitle1}>Mẹo vặt</Text>
        <View>
          <FlatList
            snapToInterval={width - 20}
            contentContainerStyle={{ paddingLeft: 20, paddingBottom: 20 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={tips}
            renderItem={({ item }) => (
              <CartFood food={item} navigation={navigation} />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
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
    color: COLORS.yellow,
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
    elevation: 12,
  },
});

export default Home;
