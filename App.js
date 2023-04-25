import React, { useState } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { View, Text } from 'react-native';
import { slides } from './src/data/welcome';
import { Image, StyleSheet } from 'react-native';
import { COLORS, SIZES } from './src/constants/theme';
import { Login, LoginRes, Register } from './src/screens';
import UITab from './src/navigation/UITab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home/Home';
import DetailFood from './src/screens/Home/DetailFood';
import XFood from './src/screens/Home/Category/XFood';
import XMap from './src/screens/Home/Category/XMap';
import XExercise from './src/screens/Home/Category/XExercise';
import XScan from './src/screens/Home/Category/XScan';
import Profile from './src/screens/Profile/Profile';
import ProfileAccount from './src/screens/Profile/ProfileAccount';
import ProfileEdit from './src/screens/Profile/ProfileEdit';
import ProfileHealth from './src/screens/Profile/ProfileHealth';
import Chart from './src/screens/Chart';
const Stack = createNativeStackNavigator();

export default function App() {
  const [showHomepage, setShowHomePage] = useState(false);
  // const buttonLabel = label => {
  //   return (
  //     <View style={styles.buttonLabelView}>
  //       <Text style={styles.buttonLabelText}>{label}</Text>
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
      <Stack.Navigator
        initialRouteName="LoginRes"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginRes" component={LoginRes} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="UITab" component={UITab} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DetailFood" component={DetailFood} />
        <Stack.Screen name="XFood" component={XFood} />
        <Stack.Screen name="XMap" component={XMap} />
        <Stack.Screen name="XExercise" component={XExercise} />
        <Stack.Screen name="XScan" component={XScan} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Chart" component={Chart} />
        <Stack.Screen name="ProfileAccount" component={ProfileAccount} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="ProfileHealth" component={ProfileHealth} />
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
