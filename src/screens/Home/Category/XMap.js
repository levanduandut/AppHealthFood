import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { SIZES, COLORS } from '../../../constants/theme';
import {
  Text,
  View,
} from 'react-native';
import fonts from '../../../constants/fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { translate_x } from '../../../api/user_api';
const { height } = Dimensions.get('window');

const XMap = props => {
  const { navigation, route } = props;
  const { navigate, goBack } = navigation;

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [text, setText] = useState('');

  const clickOK = async (data) => {
    try {
      getDataText(data);
      const response = await axios.request({
        method: 'GET',
        url: 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition',
        params: {
          query: `${text}`
        },
        headers: {
          'X-RapidAPI-Key': '10a70d537bmsh80e40618efcf552p179c73jsn70e5aa136bdc',
          'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
        }
      });
      console.log(response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const getDataText = async (text) => {
    try {
      const response = await translate_x({ text: text });
      console.log(response.data);
      setText(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title.name}</Text>
      <Text style={styles.title}>{title.calories}</Text>
      <Text style={styles.title}>{title.carbohydrates_total_g}</Text>
      <Text style={styles.title}>{title.cholesterol_mg}</Text>
      <Text style={styles.title}>{title.fat_saturated_g}</Text>
      <Text style={styles.title}>{title.fat_total_g}</Text>
      <Text style={styles.title}>{title.fiber_g}</Text>
      <Text style={styles.title}>{title.potassium_mg}</Text>
      <Text style={styles.title}>{title.protein_g}</Text>
      <Text style={styles.title}>{title.serving_size_g}</Text>
      <Text style={styles.title}>{title.sodium_mg}</Text>
      <Text style={styles.title}>{title.sugar_g}</Text>
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
      <Text style={styles.header}>Tra cứu thành phần</Text>
      <View style={styles.inputContainer}>
        <Icon name="search" size={20} color={COLORS.black} />
        <TextInput
          placeholder="Nhập thực phẩm tra cứu"
          style={{ color: COLORS.black }}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <TouchableOpacity
        // disabled={isValidIsOk() == false}
        onPress={() => clickOK(text)}
        style={{
          alignSelf: 'center',
          width: 300,
          marginTop: 90,
          padding: 15,
          backgroundColor: COLORS.primary,
          marginVertical: 30,
          borderRadius: 10,
          elevation: 12,
        }}>
        <Text style={styles.btnLoginText}>Tra cứu</Text>
      </TouchableOpacity>
      <View style={{ flex: 1, padding: 24, paddingTop: 90 }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => <Item title={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnLoginText: {
    fontWeight: '900',
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 20,
  },
  title: {
    fontSize: 20,
    color: COLORS.primary,
    textAlign: 'center',
    justifyContent: 'center',
    fontFamily: fonts.POPPINS_BOLD,
  },
  header: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 20,
    color: COLORS.title,
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
    marginTop: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 12,
  },
});

export default XMap;
