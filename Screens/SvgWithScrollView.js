import React from 'react'
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
  useAnimatedProps,
  useAnimatedStyle,
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


const slides = [
  {
    color: "#3984FF",
    rgb: { r: 57,g: 132,b: 255},
    picture: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/1.png",
    aspectRatio: 439.75 / 470.5,
  },
  {
    color: "#39ffb4",
    rgb: {r: 57, g: 255, b: 180},
    picture: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/2.png",
    aspectRatio: 400.5 / 429.5,
  },
  {
    color: "#ffb439",
    rgb: { r: 255,g: 180,b: 57},
    picture: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/3.png",
    aspectRatio: 391.25 / 520,
  },
  {
    color: "#3984FF",
    rgb: { r: 57,g: 132,b: 255},
    picture: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/1.png",
    aspectRatio: 439.75 / 470.5,
  },
  {
    color: "#39ffb4",
    rgb: {r: 57, g: 255, b: 180},
    picture: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/reanimated-2/src/Fluid/assets/2.png",
    aspectRatio: 400.5 / 429.5,
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

const Slide = ({slide,index,x, colors, r, g, b}) => {

  const animatedProps = useAnimatedProps(() => {
    const progress = (x.value - width * index) / width;
    const offset = interpolate(progress, [0, 1], [0, -2], Extrapolate.CLAMP);

    const magic = interpolate(progress, [(-1 * RATIO) / 1.5, 0], [1, 0], Extrapolate.CLAMP)

    let d = `M ${P00.x + offset} ${P00.y} `
    // curve 1
    d = d + `C ${P01.x + offset} ${P01.y} ${P02.x} ${P02.y} ${P03.x} ${P03.y} `

    // curve 2
    d = d + `C ${P11.x} ${P11.y} ${P12.x + offset} ${P12.y} ${P13.x + offset} ${P13.y} `

    // curve 3
    d = d + `C ${P21.x + offset} ${P21.y} ${magic} ${P22.y} ${magic} ${P23.y} `

    // curve 4
    d = d + `C ${magic} ${P31.y} ${P32.x + offset} ${P32.y} ${P33.x + offset} ${P33.y} `

    // close path or fill path
    d = d + "Z"

    // let rcolor = interpolate(progress,[-1,0,1],r)
    // let gcolor = interpolate(progress,[-1,0,1],g)
    // let bcolor = interpolate(progress,[-1,0,1],b)
    // let color = `rgba(${rcolor},${gcolor},${bcolor},1)`

    // Enable color to interpolate through color... but will drop fps

    return {
      d: d,
      fill: slide.color,
    };
  })


  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 2 2">
        <AnimatedPath animatedProps={animatedProps} />
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
      slides.map((slide,index) => {
        const isFirst = index === 0;
        const isLast = index === slides.length - 1;
        const r = [
          isFirst ? slide.rgb.r : slides[index - 1].rgb.r,
          slide.rgb.r,
          isLast ? slide.rgb.r : slides[index + 1].rgb.r,
        ]
        const g = [
          isFirst ? slide.rgb.g : slides[index - 1].rgb.g,
          slide.rgb.g,
          isLast ? slide.rgb.g : slides[index + 1].rgb.g,
        ]
        const b = [
          isFirst ? slide.rgb.b : slides[index - 1].rgb.b,
          slide.rgb.b,
          isLast ? slide.rgb.b : slides[index + 1].rgb.b,
        ]

        return (
          <Slide
            slide={slide}
            key={index}
            index={index}
            x={x}
            colors={[
              isFirst ? slide.color : slides[index - 1].color,
              slide.color,
              isLast ? slide.color : slides[index + 1].color,
            ]}
            r={r}
            g={g}
            b={b}
          />
        );
      })
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
