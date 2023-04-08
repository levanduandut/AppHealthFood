import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text } from 'react-native';
import { slides } from './src/data/welcome';
import { Image, StyleSheet } from 'react-native';
import { COLORS, SIZES } from './src/constants/theme';
import { Login, LoginRes,Register } from './src/screens';
import UITab from './src/navigation/UITab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function App() {
  // const [showHomepage, setShowHomePage] = useState(false);
  // const buttonLabel = (label) => {
  //   return (
  //     <View style={styles.buttonLabelView}>
  //       <Text style={styles.buttonLabelText}>
  //         {label}
  //       </Text>
  //     </View>
  //   );
  // };
  // if (!showHomepage) {
  //   return (
  //     <AppIntroSlider
  //       data={slides}
  //       renderItem={({ item }) => {
  //         return (
  //           <View style={styles.view}>
  //             <Image
  //               source={item.image}
  //               style={styles.image}
  //               resizeMode="contain"
  //             />
  //             <Text style={styles.title}>{item.title}</Text>
  //             <Text style={styles.description}>{item.description}</Text>
  //           </View>
  //         );
  //       }}
  //       activeDotStyle={styles.activeDot}
  //       showSkipButton
  //       renderNextButton={() => buttonLabel('Next')}
  //       renderSkipButton={() => buttonLabel('Skip')}
  //       renderDoneButton={() => buttonLabel('Done')}
  //       onDone={() => {
  //         setShowHomePage(true);
  //       }}
  //     />
  //   );
  // }



  return (
    // <LoginRes />
    <NavigationContainer>
      <Stack.Navigator initialRouteName='UITab' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginRes" component={LoginRes} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UITab" component={UITab} />
      </Stack.Navigator>
    </NavigationContainer>
  );


}
const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    paddingTop: 100,
  },
  image: {
    width: SIZES.width - 80,
    height: 400,
  },
  title: {
    fontWeight: '900',
    color: COLORS.title,
    fontSize: SIZES.h1,
  },
  description: {
    textAlign: 'center',
    paddingTop: 5,
    color: COLORS.title,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 30,
  },
  buttonLabelView: {
    padding: 12,
  },
  buttonLabelText: {
    color: COLORS.title,
    fontWeight: '700',
    fontSize: SIZES.h4,
  },
});
