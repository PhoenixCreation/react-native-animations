import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Temp from './Screens/Temp'
import SvgWithScrollView from './Screens/SvgWithScrollView'
import SvgAnimations from './Screens/SvgAnimations' // Svg animation with wave and timing......
import Cards from './Screens/Cards' // Card based animations....
import StrokeAnimation from './Extra/StrokeAnimation' // Text to svg animations.....

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <SvgWithScrollView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
