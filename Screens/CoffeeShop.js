import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import CoffeeShopHome from "../Extra/CoffeeShop/CoffeeShopHome"
import CoffeeInfo from "../Extra/CoffeeShop/CoffeeInfo"


const Stack = createSharedElementStackNavigator();

function CoffeeShop() {
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
        name="CoffeeShopHome"
        component={CoffeeShopHome}
      />
      <Stack.Screen
        name="CoffeeInfo"
        component={CoffeeInfo}
      />
    </Stack.Navigator>
  )
}

export default CoffeeShop
