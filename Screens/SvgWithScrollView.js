import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedProps,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import {
  interpolateColor,
  cartesian2Canvas,
  Vector,
  serialize,
  createPath,
  addCurve,
} from "react-native-redash";

const { width } = Dimensions.get("window");
const RATIO = 0.9;
const SIZE = width * RATIO;
const CENTER = { x: 1, y: 1 };
const C = 0.551915024494;
const addX = (v, x) => {
  "worklet";
  return { x: v.x + x, y: v.y };
};


const slides = [
  {
    color: "#3984FF",
    picture: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/1.png",
    aspectRatio: 439.75 / 470.5,
  },
  {
    color: "#39ffb4",
    picture: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/2.png",
    aspectRatio: 400.5 / 429.5,
  },
  {
    color: "#ffb439",
    picture: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/3.png",
    aspectRatio: 391.25 / 520,
  },
];

const vec = (x, y) => cartesian2Canvas({ x, y }, CENTER);


const P00 = vec(0, 1);
const P01 = vec(C, 1);
const P02 = vec(1, C);
const P03 = vec(1, 0);

//const P10 = vec(1, 0);
const P11 = vec(1, -C);
const P12 = vec(C, -1);
const P13 = vec(0, -1);

// const P20 = vec(0, -1);
const P21 = vec(-C, -1);
const P22 = vec(-1, -C);
const P23 = vec(-1, 0);

// const P30 = vec(-1, 0);
const P31 = vec(-1, C);
const P32 = vec(-C, 1);
const P33 = vec(0, 1);

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Slide = ({slide,index}) => {

    const path = createPath({ x: P00.x + 0, y: P00.y });
      addCurve(path, {
        c1: addX(P01, 0),
        c2: P02,
        to: P03,
      });
      addCurve(path, {
        c1: addX(P11, 0),
        c2: P12,
        to: P13,
      });
      addCurve(path, {
        c1: addX(P21, 0),
        c2: P22,
        to: P23,
      });
      addCurve(path, {
        c1: addX(P31, 0),
        c2: P32,
        to: P33,
      });
    const d = serialize(path)

  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 2 2">
        <AnimatedPath d={d} fill={slide.color} />
      </Svg>
    </View>
  );
}

function SvgWithScrollView() {
  return (
    <Animated.ScrollView
      horizontal
      scrollEventThrottle={16}
      snapToInterval={width}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
    >
    {
      slides.map((slide,index) => <Slide slide={slide} key={index} index={index} />)
    }
    </Animated.ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
export default SvgWithScrollView
