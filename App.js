import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './Screens/HomePage'


import { SCREENS } from "./Constants"

const Stack = createStackNavigator();
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
      <Stack.Screen name="HomePage" component={HomePage} />
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
