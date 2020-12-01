import React, { useRef, useState } from "react";
import Animated, { Easing, useAnimatedProps } from "react-native-reanimated";
import { Path } from "react-native-svg";


const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];

const AnimatedStroke = ({ d, progress }) => {
  const stroke1 = colors[Math.round(Math.random() * (colors.length - 1))];
  const stroke2 = colors[Math.round(Math.random() * (colors.length - 1))];
  const [length, setLength] = useState(0);
  const ref = useRef(null);
  const animatedBGProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.61, 1, 0.88, 1)(progress.value),
    fillOpacity: progress.value,
  }));
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.37, 0, 0.63, 1)(progress.value),
  }));
  return (
    <>
      <AnimatedPath
        animatedProps={animatedBGProps}
        d={d}
        stroke="black"
        strokeWidth={5}
        fill="white"
        strokeDasharray={length}
      />
      <AnimatedPath
        animatedProps={animatedProps}
        onLayout={() => setLength(ref.current.getTotalLength())}
        ref={ref}
        d={d}
        stroke={stroke1}
        strokeWidth={5}
        strokeDasharray={length}
      />
    </>
  );
};

export default AnimatedStroke;
