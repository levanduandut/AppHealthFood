import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import fonts from '../constants/fonts';
import { COLORS, SIZES } from '../constants/theme';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile';
import Chart from '../screens/Chart';
import NutritionFacts from '../screens/NutritionFacts';
import Recommendations from '../screens/Recommendations';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();
const screenOptions = ({ route }) => ({
    headerShown: false,
    tabBarActiveTintColor: COLORS.white,
    tabBarInActiveTintColor: COLORS.green,
    tabBarActiveBackgroundColor: COLORS.primary,
    tabBarInactiveBackgroundColor: COLORS.primary,
    // tabBarShowLabel: false,
    tabBarLabelStyle: {
        fontSize: 13,
    },
    tabBarStyle: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        elevation: 0,
        borderRadius: 15,
        overflow: 'hidden',
        height: 70,
        zIndex: 999,
    },

    tabBarIcon: ({ focused, color, size }) => {
        let screenName = route.name;
        let iconName = 'home';
        if (screenName == 'Khuyến nghị') {
            iconName = 'heart';
        } else if (screenName == 'Tra cứu') {
            iconName = 'list-alt';
        } else if (screenName == 'Biểu đồ') {
            iconName = 'bar-chart';
        } else if (screenName == 'Tôi') {
            iconName = 'user';
        }
        return <Icon
            name={iconName}
            size={24}
            color={focused ? COLORS.white : COLORS.black}
        />

    }
})

const UITab = (props) => {
    return <Tab.Navigator screenOptions={screenOptions} >
        <Tab.Screen name='Trang chủ' component={Home} />
        <Tab.Screen name='Khuyến nghị' component={Recommendations} />
        <Tab.Screen name='Tra cứu' component={NutritionFacts} />
        <Tab.Screen name='Biểu đồ' component={Chart} />
        <Tab.Screen name='Tôi' component={Profile} />
    </Tab.Navigator>
}
export default UITab;