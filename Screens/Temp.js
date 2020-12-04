import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate
} from "react-native-reanimated";
import { interpolateColor, ColorSpace } from "react-native-redash";

var { width, height } = Dimensions.get("window");

const products = [
  {
    title: "How about an Iced Coffee Rosé?",
    subtitle: "Medium, Creamy Cream, Sweet Sugar, Iced",
    color1: "#F9AC8A",
    color2: "#FBC6AE",
    aspectRatio: 1,
  },

  {
    title: "Craving a Philharmonic?",
    subtitle: "Large, Medium Cream, Medium Sugar",
    color1: "#4DD2A5",
    color2: "#63D8B0",
    aspectRatio: 1,
  },
  {
    title: "Craving a new Cold Brew?",
    subtitle: "Try Philtered Soul",
    color1: "#FEB829",
    color2: "#FDD446",
    aspectRatio: 1,
  },
  {
    title: "Excited for an Ecstatic?",
    subtitle: "Large, No cream, No sugar, Iced",
    color1: "#FE8E01",
    color2: "#FF9A16",
    aspectRatio: 1,
  },
  {
    title: "Craving a Croissant?",
    subtitle: "Flaky perfection, baked fresh daily",
    color1: "#E2DDD1",
    color2: "#F3F1ED",
    aspectRatio: 757 / 735,
  },
];


function Temp() {
  return (
    <View>
      <Text>Hi from temp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
})

export default Temp
