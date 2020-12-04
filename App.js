import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Temp from './Screens/Temp'
import HomePage from './Screens/HomePage'
import Snapchat from './Screens/Snapchat' // Snapchat stories translation...
import Login from './Screens/Login' // A login animation like door opening....
import SvgWithScrollView from './Screens/SvgWithScrollView' // Not working bcz of redash(usepath returning undefined object)......
import SvgAnimations from './Screens/SvgAnimations' // Svg animation with wave and timing......
import Cards from './Screens/Cards' // Card based animations....
import StrokeAnimation from './Extra/StrokeAnimation' // Text to svg animations.....


const Stack = createStackNavigator();

export const SCREENS = [
  { name: "HomePage", component: HomePage},
  { name: "Snapchat", component: Snapchat},
  { name: "Login", component: Login},
  { name: "SvgWithScrollView", component: SvgWithScrollView},
  { name: "SvgAnimations", component: SvgAnimations},
  { name: "Cards", component: Cards},
  { name: "StrokeAnimation", component: StrokeAnimation},
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
    backgroundColor: '#fff',
  },
});
