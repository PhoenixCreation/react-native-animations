import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
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

const Slide = ({slide,index,x}) => {
  const animatedProps = useAnimatedProps(() => {
  const progress = (x.value - width * index) / width;
  const offset = interpolate(progress, [0, 1], [0, -2], Extrapolate.CLAMP);
  const path = createPath({ x: P00.x + offset, y: P00.y });
  if(path){
      addCurve(path, {
        c1: addX(P01, offset),
        c2: P02,
        to: P03,
      });
      addCurve(path, {
        c1: P11,
        c2: addX(P12, offset),
        to: addX(P13, offset),
      });
      addCurve(path, {
        c1: addX(P21, offset),
        c2: {
          x:
            interpolate(
              progress,
              [(-1 * RATIO) / 2, 0],
              [1, 0],
              Extrapolate.CLAMP
            ) + offset,
          y: P22.y,
        },
        to: {
          x:
            interpolate(
              progress,
              [(-1 * RATIO) / 2, 0],
              [1, 0],
              Extrapolate.CLAMP
            ) + offset,
          y: P23.y,
        },
      });
      addCurve(path, {
        c1: {
          x:
            interpolate(
              progress,
              [(-1 * RATIO) / 2, 0],
              [1, 0],
              Extrapolate.CLAMP
            ) + offset,
          y: P31.y,
        },
        c2: addX(P32, offset),
        to: addX(P33, offset),
      });
    }
    var d;
    if (path) {
      d = serialize(path)
    } else {
      d= "M 1 0 Z"
    }
      return {
        d: d,
        fill: slide.color,
      };
    });
  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 2 2">
        <AnimatedPath animatedProps={animatedProps} fill={slide.color} />
      </Svg>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: slide.picture }}
          style={{
            width: width * 0.61,
            height: width * 0.61 * slide.aspectRatio,
          }}
        />
        </View>
    </View>
  );
}

function SvgWithScrollView() {
  const x = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  return (
    <Animated.ScrollView
      horizontal
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      snapToInterval={width}
      decelerationRate="fast"
      showsHorizontalScrollIndicator={true}
    >
    {
      slides.map((slide,index) => <Slide slide={slide} key={index} index={index} x={x}/>)
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
