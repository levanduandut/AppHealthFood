import React, {useState, useEffect} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Linking,
} from 'react-native';
import images from '../../../constants/images';
import {SIZES, COLORS} from '../../../constants/theme';
import {RNCamera, FaceDetector} from 'react-native-camera';
import HeaderBar from '../../../components/HeaderBar';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../../../constants/fonts';
const {height} = Dimensions.get('window');

const XScan = props => {
  const {navigation, route} = props;
  const [link, setLink] = useState('');
  const OpenLink = link => {
    
    Linking.openURL(link).catch(err => console.error('An error occured', err));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <HeaderBar navigation={navigation} />
      <Text style={{alignSelf:'center', marginHorizontal:20, marginVertical:10}}>
        Vui lòng {'  '}
        <Text
          style={{
            fontSize: 15,
            color: COLORS.black,
            fontWeight: 'bold',
          }}>Đưa mã QR vào giữa camera {' '}</Text>
        Để quét mã
      </Text>
      <QRCodeScanner
        style={{paddingHorizontal: 20}}
        onRead={e => {
          setLink(e.data);
        }}
        flashMode={RNCamera.Constants.FlashMode.torch}
      />

      <View style={{paddingHorizontal: 10, paddingBottom: 40}}>
        <TouchableOpacity
          onPress={() => OpenLink(link)}
          style={styles.buttonRes}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 18,
              color: COLORS.black,
              textAlign: 'center',
            }}>
            Vào link
          </Text>
        </TouchableOpacity>
        <Text style={{color: COLORS.blue, alignSelf: 'center', marginTop:10}}>{link}</Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  buttonRes: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '45%',
    borderRadius: 10,
    elevation: 10,
  },
});

export default XScan;
