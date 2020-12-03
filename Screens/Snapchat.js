import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import SnapchatStory from "../Extra/Snapchat/SnapchatStory"
import SnapchatFullStory from "../Extra/Snapchat/SnapchatFullStory"


const Stack = createSharedElementStackNavigator();

function Snapchat() {
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
      <Stack.Screen name="Story" component={SnapchatStory} />
      <Stack.Screen
        name="FullStory"
        component={SnapchatFullStory}
        sharedElements={(route) => {
          const { id } = route.params.story;
          return [id];
        }}
      />
    </Stack.Navigator>
  )
}

export default Snapchat
