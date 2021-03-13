import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SpotTubeHome from "../Routes/SpotTube/SpotTubeHome";
import SpotTubeMusic from "../Routes/SpotTube/SpotTubeMusic";
import SpotTubeVideo from "../Routes/SpotTube/SpotTubeVideo";

const Stack = createStackNavigator();

function Vehical() {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: false,
        headerShown: false,
        cardOverlayEnabled: false,
        cardStyle: { backgroundColor: "transparent" },
        animationEnabled: true,
        gestureDirection: "horizontal",
      }}
      mode="card"
    >
      <Stack.Screen name="Home" component={SpotTubeHome} />
      <Stack.Screen name="Music" component={SpotTubeMusic} />
      <Stack.Screen name="Video" component={SpotTubeVideo} />
    </Stack.Navigator>
  );
}

export default Vehical;
