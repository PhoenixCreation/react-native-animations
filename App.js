import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';

import Temp from './Screens/Temp'
import Snapchat from './Screens/Snapchat'
import Login from './Screens/Login' // A login animation like door opening....
import SvgWithScrollView from './Screens/SvgWithScrollView' // Not working bcz of redash(usepath returning undefined object)......
import SvgAnimations from './Screens/SvgAnimations' // Svg animation with wave and timing......
import Cards from './Screens/Cards' // Card based animations....
import StrokeAnimation from './Extra/StrokeAnimation' // Text to svg animations.....

export default function App() {
  return (
    <NavigationContainer>
    <View style={styles.container}>
      <StatusBar hidden />
      <Snapchat />
    </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
