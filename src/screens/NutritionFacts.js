import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Alert, Dimensions, FlatList, SafeAreaView, StyleSheet, TextInput } from 'react-native';
import images from '../constants/images';
import { SIZES, COLORS } from '../constants/theme';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../constants/fonts';
import { nutrition_info } from '../api/user_api';
import Icon from 'react-native-vector-icons/FontAwesome';
import IngreInfo from '../components/NutritionFactsCom/IngreInfo';
const { height } = Dimensions.get('window');

const NutritionFacts = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [filterdata, setFilterData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getNutri();
  }, [])

  const getNutri = async () => {
    try {
      const response = await nutrition_info("");
      setData(response.data.ingre);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const searchFilter = async (text) => {
    if (text!=='') {
      const newData = data.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilterData(newData);
      setSearch(text);
    }
    else {
      setFilterData(data);
      setSearch(text);
    }
  };
  return (

    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color={COLORS.black} />
        <TextInput
          value={search}
          placeholder="Nhập thực phẩm tra cứu"
          style={{ color: COLORS.black }}
          onChangeText={(text) => searchFilter(text)}
        />
      </View>
      <View style={{ flex: 1, padding: 24, paddingTop: 110 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            data={filterdata}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <IngreInfo ingre={item} navigation={navigation} />
              // <Text>Ok</Text>
            )}
          />
        )}
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
    fontFamily: fonts.POPPINS_BOLD,
  },
  inputContainer: {
    height: 60,
    width: '90%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
});

export default NutritionFacts;
