import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import VehicalFullView from "../Extra/Vehical/VehicalFullView"
import Main from "../Extra/Vehical/Main"


const Stack = createSharedElementStackNavigator();

function Vehical() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardOverlayEnabled: true,
        cardStyle: { backgroundColor: "transparent" },
      }}
      mode="modal"
    >
      <Stack.Screen
        name="Main"
        component={Main}
      />
      <Stack.Screen
        name="VehicalFullView"
        component={VehicalFullView}
      />
    </Stack.Navigator>
  )
}

export default Vehical
