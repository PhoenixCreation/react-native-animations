import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Temp from './Screens/Temp'
import HomePage from './Screens/HomePage'
import Info from './Screens/Info' // Info screen for this app users????
import CoffeeShop from './Screens/CoffeeShop' // A cafeteria shop app
import Vehical from './Screens/Vehical' // Vehical(car) showcase app design
import Snapchat from './Screens/Snapchat' // Snapchat stories translation...
import Login from './Screens/Login' // A login animation like door opening....
import SvgWithScrollView from './Screens/SvgWithScrollView' // Animation with scroll and svg....
import SvgAnimations from './Screens/SvgAnimations' // Svg animation with wave and timing......
import Cards from './Screens/Cards' // Card based animations....
import StrokeAnimation from './Extra/StrokeAnimation' // Text to svg animations.....


const Stack = createStackNavigator();

export const SCREENS = [
  { name: "HomePage", component: HomePage},
  { name: "Info", component: Info},
  { name: "CoffeeShop", component: CoffeeShop},
  { name: "Vehical", component: Vehical},
  { name: "Login", component: Login},
  { name: "Snapchat", component: Snapchat},
  { name: "Cards", component: Cards},
  { name: "SvgWithScrollView", component: SvgWithScrollView},
  { name: "SvgAnimations", component: SvgAnimations},
  { name: "StrokeAnimation", component: StrokeAnimation},
  //Add above this line....temp should always be at the end.
  { name: "Temp", component: Temp},
]

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <StatusBar hidden />
        <NavigationScreens />
      </View>
    </NavigationContainer>
  );
}

const NavigationScreens = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {
        SCREENS.map((screenName,i) => (
          <Stack.Screen name={screenName.name} component={screenName.component} key={i} />
        ))
      }
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff5',
  },
});
