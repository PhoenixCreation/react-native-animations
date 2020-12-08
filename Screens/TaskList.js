import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import TaskListHome from "../Extra/TaskList/TaskListHome"


const Stack = createSharedElementStackNavigator();

function TaskList() {
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
        name="TaskListHome"
        component={TaskListHome}
      />
    </Stack.Navigator>
  )
}

export default TaskList
