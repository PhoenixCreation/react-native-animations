import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Button  } from 'react-native';
import Svg, { Path, Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  repeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { mix } from "react-native-redash";

const SIZE = Dimensions.get("window").width - 64;
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

function SvgAnimations() {

  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = repeat(withTiming(1, {
      duration: 1000,
      easing: Easing.linear,
    }),-1,true);
  }, [progress]);

  const runAnimation = (end) => {
    progress.value = withTiming(end, {
      duration: 1000,
      easing: Easing.linear,
    });

  }




  const data = useDerivedValue(() => {
    return {
      from: { x: 0,y: progress.value },
      c1: { x: 0.25 + progress.value * 0.5, y: 0.75 },
      c2: { x: 0.75 - progress.value * 0.5, y: 0.25 + progress.value * 0.4 },
      to: { x: 1, y: 1 - progress.value}
    };
  })

  const path = useAnimatedProps(() => {
    const { from, c1, c2, to } = data.value
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y} L 1 1 L 0 1 Z`
    };
  })
  const path2 = useAnimatedProps(() => {
    const { from, c1, c2, to } = data.value
    return {
      d: `M ${1 - from.x} ${from.y} C ${1 - c1.x} ${c1.y} ${1 - c2.x} ${c2.y} ${1 - to.x} ${to.y} L 0 1 L 1 1 Z`
    };
  })

  return (
    <View
      style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",

      }}
    >
      <View style={{flexDirection: "row", width: SIZE, justifyContent: "space-between",
      position: "absolute", top: 0 }}>
        <Button
          title="Go to End"
          onPress={() => runAnimation(1)}
        />
        <Button
          title="Go to Start"
          onPress={() => runAnimation(0)}
        />
      </View>
      <View style={{
        backgroundColor: "#0006",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 500,
        overflow: "hidden",
        position: 'absolute',
        zIndex: 10,
        opacity: 0.5,
      }}>
        <Svg
          width={SIZE}
          height={SIZE}
          style={{ backgroundColor: "#242424" }}
          viewBox="0 0 1 1"
        >
          <AnimatedPath fill="#04f9" animatedProps={path2} />
        </Svg>
      </View>
      <View style={{
        backgroundColor: "#0006",
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 500,
        overflow: "hidden",
        opacity: 0.7,
      }}>
        <Svg
          width={SIZE}
          height={SIZE}
          style={{ backgroundColor: "#242424" }}
          viewBox="0 0 1 1"
        >
          <AnimatedPath fill="blue" animatedProps={path} />
        </Svg>
      </View>
    </View>
  )
}

export default SvgAnimations
