import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Dimensions, Image, Button, TextInput, TouchableHighlight } from 'react-native';
import Svg, { Path, Circle } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  repeat,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";

const {width, height} = Dimensions.get("window")
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const randomArray = []
for (var i = 0; i < 21; i++) {
  randomArray.push({
    val: Math.floor(Math.random() * 2),
    pos: { x: i%3 , y: Math.floor(i / 3)}
  })
}

function WaterBubble({type, position, progress}) {

  const up = useAnimatedStyle(() => {
    return {
      position: "absolute",
      transform: [
        {translateX: (position.x * width / 8) + progress.value * 20  },
        {translateY: height + (position.y * height / 7) - (progress.value * height)}
      ]
    }
  })

  if (type === 1) {
    return (
      <Animated.View style={up}>
        <Svg width={40} height={40} viewBox="0 0 363.188 363.188">
          <Path fill="white" d="M111.667 132.311C50.093 132.311 0 182.404 0 243.977s50.093 111.667 111.667 111.667 111.667-50.094 111.667-111.667-50.094-111.666-111.667-111.666zm0 208.333C58.364 340.644 15 297.28 15 243.977c0-53.302 43.364-96.666 96.667-96.666s96.667 43.364 96.667 96.666c-.001 53.303-43.365 96.667-96.667 96.667z" />
          <Path fill="white" d="M111.667 173.977c-4.142 0-7.5 3.357-7.5 7.5s3.358 7.5 7.5 7.5c30.327 0 55 24.673 55 55 0 4.143 3.358 7.5 7.5 7.5s7.5-3.357 7.5-7.5c0-38.598-31.402-70-70-70z" />
        </Svg>
      </Animated.View>
    )
  } else {
    return (
      <Animated.View style={up}>
        <Svg width={40} height={40} viewBox="0 0 363.188 363.188">
          <Path fill="white" d="M298.333 69.835c-35.761 0-64.855 29.094-64.855 64.855s29.094 64.854 64.855 64.854 64.855-29.094 64.855-64.854c0-35.761-29.093-64.855-64.855-64.855zm0 114.71c-27.49 0-49.855-22.364-49.855-49.854s22.365-49.855 49.855-49.855 49.855 22.365 49.855 49.855-22.364 49.854-49.855 49.854z" />
          <Path fill="white" d="M302.012 157.925c-14.84 0-26.913-12.073-26.913-26.913 0-4.143-3.358-7.5-7.5-7.5s-7.5 3.357-7.5 7.5c0 23.111 18.802 41.913 41.913 41.913 4.142 0 7.5-3.357 7.5-7.5s-3.358-7.5-7.5-7.5z" />
        </Svg>
      </Animated.View>
    );
  }
}

function Login() {

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = repeat(withTiming(1, {
      duration: 1000,
      easing: Easing.linear,
    }),-1,true);
  }, [progress]);

  const data = useDerivedValue(() => {
    const p03 = interpolate(progress.value, [0,1,2], [0,0.3,0.3],Extrapolate.CLAMP)
    return {
      from: { x: 1.9 + progress.value * 0.2, y: 0 },
      c1: { x: 1.3 + p03, y: 0.8 },
      c2: { x: 2.5 - p03, y: 1.6 - p03 },
      to1: { x: 2, y: 2},
      c3: { x: 1.5, y: 2.4 + p03 },
      c4: { x: 2.5 - p03, y: 3.2 },
      to2: { x: 1.9 + progress.value * 0.2, y: 4},
    };
  })

  const path1 = useAnimatedProps(() => {
    const { from, c1, c2, to1, c3, c4, to2 } = data.value
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to1.x} ${to1.y} C ${c3.x} ${c3.y} ${c4.x} ${c4.y} ${to2.x} ${to2.y} l -3 0 l 0 -4 Z`
    }
  })
  const path2 = useAnimatedProps(() => {
    const { from, c1, c2, to1, c3, c4, to2 } = data.value
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to1.x} ${to1.y} C ${c3.x} ${c3.y} ${c4.x} ${c4.y} ${to2.x} ${to2.y} l -3 0 l 0 -4 Z`
    }
  })
  const path3 = useAnimatedProps(() => {
    const { from, c1, c2, to1, c3, c4, to2 } = data.value
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to1.x} ${to1.y} C ${c3.x} ${c3.y} ${c4.x} ${c4.y} ${to2.x} ${to2.y} l -3 0 l 0 -4 Z`
    }
  })
  const path4 = useAnimatedProps(() => {
    const { from, c1, c2, to1, c3, c4, to2 } = data.value
    return {
      d: `M ${from.x} ${from.y} C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to1.x} ${to1.y} C ${c3.x} ${c3.y} ${c4.x} ${c4.y} ${to2.x} ${to2.y} l -3 0 l 0 -4 Z`
    }
  })

  const circle1 = useAnimatedProps(() => {
    const { c1 } = data.value
    const c = c1
    return{
      cx: c.x,
      cy: c.y
    }
  })
  const circle2 = useAnimatedProps(() => {
    const { c2 } = data.value
    const c = c2
    return{
      cx: c.x,
      cy: c.y
    }
  })
  const circle3 = useAnimatedProps(() => {
    const { c3 } = data.value
    const c = c3
    return{
      cx: c.x,
      cy: c.y
    }
  })
  const circle4 = useAnimatedProps(() => {
    const { c4 } = data.value
    const c = c4
    return{
      cx: c.x,
      cy: c.y
    }
  })

  const imageStyle = useAnimatedStyle(() => {
    const zi = interpolate(progress.value, [0,1,2],[0,0,0])
    return {
      position: "absolute",
      zIndex: zi,
    }
  })
  const leftSlide = useAnimatedStyle(() => {
    const tx = interpolate(progress.value, [0,1,2],[-25,-25,(width / -2) - 25])
    const op = interpolate(progress.value, [0,1,2],[1,1,0])

    return {
      transform: [{ translateX: tx}],
      opacity: op,
    }
  })
  const rightSlide = useAnimatedStyle(() => {
    const tx = interpolate(progress.value, [0,1,2],[25, 25, (width / 2) + 25])
    const op = interpolate(progress.value, [0,1,2],[1,1,0])

    return {
      transform: [{ translateX: tx}, { scaleX: -1}, { translateY: -80}],
      opacity: op,
    }
  })
  const authBox = useAnimatedStyle(() => {
    const op = interpolate(progress.value, [0,1,1.5,2],[0,0,0,height])

    return {
      transform: [
        {translateY: op}
      ]
    };
  })

  const runAnimation = (end) => {
    progress.value = withTiming(end, {
      duration: 1000,
      easing: Easing.linear,
    });

  }
  const login = (cond) => {
    progress.value = withTiming(2,{
      duration: 2000,
      easing: Easing.linear,
    })
  }

  return (
    <View style={{ flex: 1, flexDirection: "row", backgroundColor: "lightblue"}}>
    <Animated.View style={[{ zIndex: 200, position: "absolute", top: 0, bottom: 0, left: 0, right: 0, justifyContent: "center", alignItems: "center"}, authBox]}>
      <TextInput
        style={{ borderRadius: 15,margin: 20, color: "blue", fontSize: 25, width: width / 2, height: 50, borderColor: "white", borderWidth: 3, backgroundColor: "#aaa5"}}
        textAlign="center"
        placeholder="Username"
      />
      <TextInput
        style={{ borderRadius: 15,margin: 20, color: "blue", fontSize: 25, width: width / 2, height: 50, borderColor: "white", borderWidth: 3, backgroundColor: "#aaa5"}}
        textAlign="center"
        placeholder="Password"
      />
      <TouchableHighlight
        onPress={() => login(1)}
        style={{ backgroundColor: "white", borderWidth: 2, borderColor: "blue", padding: 10, paddingLeft: 20, paddingRight: 20, borderRadius: 20}}
      >
        <Text style={{ fontSize: 18, color: "blue" }}>LOG IN</Text>
      </TouchableHighlight>
    </Animated.View>
    {/* Enable below comment if bubble are wanted. but will drop fps to 10*/}
    {/*<View style={{ position: "absolute", zIndex: 10}}>
      {
        randomArray.map((bubble,i) => {
          return (
            <WaterBubble type={bubble.val} key={i} position={bubble.pos} progress={progress}/>
          );
        })
      }
    </View>
    <View style={{ position: "absolute", zIndex: 10, transform: [{translateX: width / 2 + 25}]}}>
      {
        randomArray.map((bubble,i) => {
          return (
            <WaterBubble type={bubble.val} key={i} position={bubble.pos} progress={progress}/>
          );
        })
      }
    </View>*/}
      <Animated.View style={imageStyle}>
        {/*<Image
          source={{
            uri: BACKGROUND_IMAGE
          }}
          style={{width, height}}
        />*/}
        <Svg
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      width={1136}
      height={647.595}
      viewBox="0 0 1136 647.595"
    >
      <Path
        d="M248 214 l -248 -214 l -200 -214"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -160 -214 l -130 -214"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -100 -214 l -70 -214"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -50 -214 l -25 -214"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -10 -214 l 10 -214"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l 30 -214 l 50 -214"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l 70 -214 l 90 -214"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -248 -150 l -240 -120"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -248 -90 l -240 -65"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -248 -40 l -240 -15"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -248 10 l -240 35"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -248 60 l -240 95"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -248 120 l -240 145"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -248 180 l -240 205"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -248 245 l -240 270"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Path
        d="M248 214 l -220 290 l -200 310"
        strokeWidth="2"
        stroke="yellow"
        fill="yellow"
      />
      <Circle cx={248} cy={214.523} r={86} fill="#ffaa33" />
      <Path
        d="M1100.4 611.792a174.165 174.165 0 01-15.93 12.73 201.787 201.787 0 01-42.43 22.81c-62.35-1.5-154.01-9.15-269.71-13.23q-12.945-4.424-26.48-9.58-17.91-6.825-36.85-15c-52.44-22.66-106.28-37.39-159.61-46.19q-17.19-2.835-34.29-4.86c-240.82-28.8-462.9 55.82-488.62 66.05H24l15.82-30.64L309 72.523l62.95 161.62 20.09 51.59 55.37-75.98 28.59-39.23 130.2 149.27 36.8-81.27 254.78 207.92 14.21 11.59 14.38 11.74 4.58 3.74 136.21 111.16z"
        fill="#d23355"
      />
      <Path
        opacity={0.1}
        d="M285 177.523l26-57 36 83-31-60-31 34zM549.39 563.333q-17.19-2.835-34.29-4.86l-123.06-272.74zM447.411 209.752L476 187.523l130 150-132-128-26.589.229zM606.197 319.789L866 568.523l-35.536 8.381-224.267-257.115z"
      />
      <Path
        d="M1136 625.023c0 19.37-32.96 23.78-93.96 22.31-62.35-1.5-154.01-9.15-269.71-13.23-43.76-1.54-90.97-2.58-141.33-2.58-313.7 0-631 40.17-631-6.5 0-11 14.12-21.5 39.82-31.14 76.2-28.58 254.18-49.51 467.4-52.88q14.55-.24 29.31-.35 15.63-.135 31.47-.13c84.77 0 165.21 2.76 237.46 7.71.23.02.45.04.68.05q8.7.6 17.23 1.24 9.315.705 18.43 1.45c1.25.1 2.5.2 3.74.31.9.07 1.8.15 2.69.23 1.64.13 3.28.27 4.9.42a.914.914 0 01.17.01q4.47.39 8.88.78c.31.03.62.06.93.08 85.45 7.75 156.07 18.76 204.05 31.87 43.9 11.99 68.84 25.73 68.84 40.35zM70.887 458.182c0 64.016 40.16 115.817 89.79 115.817"
        fill="#3f3d56"
      />
      <Path
        d="M160.678 574c0-64.736 44.816-117.12 100.2-117.12M103.42 463.985c0 60.809 25.61 110.014 57.258 110.014"
        fill="#6c63ff"
      />
      <Path
        d="M160.678 574c0-82.718 51.8-149.652 115.817-149.652"
        fill="#3f3d56"
      />
      <Path
        d="M141.788 574.816s12.734-.392 16.571-3.125 19.588-5.996 20.54-1.613 19.137 21.797 4.76 21.913-33.404-2.239-37.234-4.572-4.637-12.603-4.637-12.603z"
        fill="#a8a8a8"
      />
      <Path
        d="M183.916 590.466c-14.377.116-33.404-2.24-37.235-4.573-2.917-1.777-4.08-8.152-4.468-11.094-.27.012-.425.017-.425.017s.806 10.27 4.637 12.603 22.858 4.688 37.234 4.572c4.15-.033 5.584-1.51 5.505-3.696-.577 1.32-2.16 2.146-5.248 2.17z"
        opacity={0.2}
      />
      <Path
        d="M762.887 449.182c0 64.016 40.16 115.817 89.79 115.817z"
        fill="#3f3d56"
      />
      <Path
        d="M852.678 565c0-64.736 44.816-117.12 100.2-117.12zM795.42 454.985c0 60.809 25.61 110.014 57.258 110.014z"
        fill="#6c63ff"
      />
      <Path
        d="M852.678 565c0-82.718 51.8-149.652 115.817-149.652z"
        fill="#3f3d56"
      />
      <Path
        d="M833.788 565.816s12.734-.392 16.571-3.125 19.588-5.996 20.54-1.613 19.137 21.797 4.76 21.913-33.404-2.239-37.234-4.572-4.637-12.603-4.637-12.603z"
        fill="#a8a8a8"
      />
      <Path
        d="M875.916 581.466c-14.377.116-33.404-2.24-37.235-4.573-2.917-1.777-4.08-8.152-4.468-11.094-.27.012-.425.017-.425.017s.806 10.27 4.637 12.603 22.858 4.688 37.234 4.572c4.15-.033 5.584-1.51 5.505-3.696-.577 1.32-2.16 2.146-5.248 2.17z"
        opacity={0.2}
      />
      <Path fill="#3f3d56" d="M481 440.479h18v32.087h-18z" />
      <Circle cx={490} cy={449.088} r={3.522} fill="#f2f2f2" />
      <Path
        d="M492.182 413.059s-5.478 31.775 4.383 32.87 1.096-33.966 1.096-33.966z"
        fill="#ffb9b9"
      />
      <Path
        d="M498.756 304.586s-11.504 109.02-8.217 110.664 12.052 3.835 13.696 2.192 8.218-69.029 8.218-69.029l-4.931-35.062z"
        fill="#575a89"
      />
      <Path
        d="M498.756 304.586s-11.504 109.02-8.217 110.664 12.052 3.835 13.696 2.192 8.218-69.029 8.218-69.029l-4.931-35.062z"
        opacity={0.1}
      />
      <Path fill="#2f2e41" d="M519.848 255.554h34.514v37.253h-34.514z" />
      <Path
        d="M527.792 272.263s-1.096 24.105-8.765 25.749 7.122 29.583 7.122 29.583l23.01-2.191 5.478-32.87s-12.6-2.192-8.218-19.175z"
        fill="#ffb9b9"
      />
      <Path
        d="M527.792 272.263s-1.096 24.105-8.765 25.749 7.122 29.583 7.122 29.583l23.01-2.191 5.478-32.87s-12.6-2.192-8.218-19.175z"
        opacity={0.1}
      />
      <Path
        fill="#ffb9b9"
        d="M528.888 547.829l1.643 9.313 9.862-2.191-2.192-9.314-9.313 2.192zM560.115 533.585l-3.287 9.861 10.409 5.478.548-8.217-7.67-7.122z"
      />
      <Path
        d="M517.383 385.667s-13.148 38.349-10.409 56.428 13.696 104.09 13.696 104.09 12.6 8.218 20.27-1.096l-5.478-73.41s1.096-44.376 5.478-39.993 21.366 55.88 21.366 55.88l-3.287 46.567s1.644 14.244 11.505 8.217l13.696-51.497s-4.383-69.029-6.574-71.768-16.435-34.514-16.435-34.514z"
        fill="#2f2e41"
      />
      <Circle cx={539.023} cy={267.058} r={15.887} fill="#ffb9b9" />
      <Path
        d="M522.862 306.23s6.026 8.765 13.696 2.739 12.052-6.575 12.052-6.575l9.314 5.479-2.192 21.366 3.287 59.167s-39.992 3.287-42.184-1.096 2.74-23.01 2.74-23.01l-7.122-39.992V306.23z"
        fill="#6c63ff"
      />
      <Path
        d="M535.462 322.117s-9.861-30.132-13.148-30.68-12.6 6.027-12.6 6.027-13.697 4.383-13.697 7.122 2.192 2.74 2.192 2.74l7.67 14.79s3.286 13.15 2.19 21.915a88.14 88.14 0 00-.547 15.887s-12.053 72.316-6.026 74.507 6.026 4.383 6.026 4.383 8.765 4.93 10.409 2.739 17.53-96.42 17.53-96.42 8.219-15.888.001-23.01z"
        fill="#575a89"
      />
      <Path
        d="M537.653 322.117s4.931-11.505 2.192-19.175c0 0 2.739-.548 3.835-2.191s0-9.861 2.739-10.41 23.01 0 24.105 1.097 4.383 8.765 4.383 8.765h-1.644l-12.052 19.722s6.026 37.254 4.93 43.28 15.888 31.227 18.08 32.87 12.052 27.94 7.669 30.68-42.732 20.27-44.375 11.505-13.149-61.359-13.149-61.359-.548-29.035 1.096-36.157 2.191-18.627 2.191-18.627z"
        fill="#575a89"
      />
      <Path
        d="M563.402 409.772s-11.505 37.801 0 36.158 8.765-37.254 8.765-37.254z"
        fill="#ffb9b9"
      />
      <Path
        d="M539.321 554.97s9.083 2.595 8.434 8.434a9.716 9.716 0 01-5.839 7.785 5.864 5.864 0 00-2.595 5.84c.649 3.892-5.19 9.731-14.922 7.136s-7.785-5.19-7.785-5.19a11.268 11.268 0 014.541-7.137c3.893-2.595 8.435-11.678 8.435-12.327s1.297-5.19 1.297-5.19 5.19-3.244 8.434.649zM558.471 542.35s-9.86 4.383-7.67 9.861 9.314 13.149 10.41 21.366 10.409 15.34 16.983 10.957-1.096-13.148-1.096-13.148-8.218-15.34-8.765-18.627 1.095-6.574-2.192-7.67-7.67-2.739-7.67-2.739z"
        fill="#2f2e41"
      />
      <Path
        d="M572.99 305.955s-1.37-6.3.273-2.465 13.696 50.402 2.74 78.342c0 0-1.096 34.514-2.192 34.514s-14.244-.548-13.696-4.383 1.644-65.741 1.644-69.576 1.917-28.762 1.917-28.762z"
        opacity={0.1}
      />
      <Path
        d="M570.524 296.368a33.12 33.12 0 014.383 7.122c1.643 3.835 13.696 50.402 2.739 78.342 0 0-1.096 34.514-2.191 34.514s-14.244-.548-13.697-4.383 1.644-65.741 1.644-69.576-3.287-29.583-3.287-29.583z"
        fill="#575a89"
      />
      <Path
        d="M530.067 239.088c-5.749 1.797-10.04 6.493-14.04 10.995a23.298 23.298 0 00-3.92 5.365 21.605 21.605 0 00-1.582 7.886q-.4 6.287-.255 12.593c.092 4.027.339 8.156-.9 11.99-1.196 3.705-3.688 6.838-5.399 10.337-2.73 5.58-3.36 12.353-.84 18.032 1.387 3.126 3.632 5.786 5.31 8.766a27.151 27.151 0 013.12 17.463l7.888-10.22c5.053-6.545 10.265-13.442 11.687-21.588 2.062-11.815-4.24-23.388-5.484-35.317-.347-3.326-.23-6.918 1.652-9.682 2.78-4.08 8.824-5.522 10.495-10.167.242 1.945 11.895 8.14 13.298 6.935a14.51 14.51 0 01-2.201 14.015c-1.128 1.4-2.515 2.579-3.615 4.001-2.849 3.684-3.497 8.652-3.095 13.291s1.738 9.146 2.444 13.75a102.113 102.113 0 01.853 13.824c.053 3.2-.035 6.77-2.279 9.051a27.395 27.395 0 009.861-6.043 49.113 49.113 0 014.919-4.662c3.529-2.546 8.31-3.301 11.189-6.564 2.57-2.914 2.98-7.188 2.376-11.025s-2.076-7.49-2.816-11.304a30.364 30.364 0 01.762-14.584c1.048-3.433 2.72-6.743 2.925-10.326.417-7.31-5.22-13.424-10.638-18.348-8.118-7.375-20.69-11.911-31.715-8.464z"
        fill="#2f2e41"
      />
      <Path
        d="M995.395 104.367c-4.857 1.793-13.383 3.26-23.254 4.444-26.838 3.22-63.62 4.364-63.62 4.364s-189.025 15.679-330.706-42.631c0 0-20.608-10.806-1.465-25.344a61.778 61.778 0 019.348-5.707s.08-.08.236-.23a49.534 49.534 0 017.023-5.414c7.339-4.744 19.734-10.373 34.816-7.824l372.092 60.187s13.591 11.483-4.47 18.155z"
        fill="#f2f2f2"
      />
      <Path
        d="M921.25 77.092l77.9-55.27 34.334 5.937-33.62 58.452s-77.72.618-78.614-9.119zM725.129 43.517L880.294 0l25.013 5.226-70.091 31.53-21.91 24.508-88.177-17.747zM972.141 108.81c-26.838 3.221-63.62 4.365-63.62 4.365s-189.025 15.679-330.706-42.631c0 0-20.608-10.806-1.465-25.344l.065.266s30.57 20.662 176.636 37.914z"
        fill="#f2f2f2"
      />
      <Path
        d="M947.198 107.616l69.376 28.324 17.426-1.935-41.496-31.185s-50.189-10.703-45.306 4.796zM601.544 48.492c-3.313.058-10.896-5.496-15.61-9.23a49.534 49.534 0 017.023-5.413c3.8 2.916 10.565 7.64 14.326 7.47 5.428-.242-.756 7.087-5.74 7.173zM916.702 205.532l-44.539 2.328-125.22-84.44-23.246-15.676-11.299-7.619c21.187-17.907 107.616 6.783 107.616 6.783 1.656 1.397 2.18 3.717 2.105 6.28-.142 4.801-2.397 10.453-3.266 12.465-.21.485-.338.757-.338.757z"
        fill="#f2f2f2"
      />
      <Path
        d="M995.395 104.367c-4.857 1.793-13.383 3.26-23.254 4.444-26.838 3.22-63.62 4.364-63.62 4.364s-189.025 15.679-330.706-42.631c0 0-20.608-10.806-1.465-25.344a61.778 61.778 0 019.348-5.707s.08-.08.236-.23a49.534 49.534 0 017.023-5.414c7.339-4.744 19.734-10.373 34.816-7.824l372.092 60.187s13.591 11.483-4.47 18.155z"
        fill="#3f3d56"
      />
      <Path
        d="M921.25 77.092l77.9-55.27 34.334 5.937-33.62 58.452s-77.72.618-78.614-9.119zM725.129 43.517L880.294 0l25.013 5.226-70.091 31.53-21.91 24.508-88.177-17.747z"
        fill="#3f3d56"
      />
      <Path
        d="M972.141 108.81c-26.838 3.221-63.62 4.365-63.62 4.365s-189.025 15.679-330.706-42.631c0 0-20.608-10.806-1.465-25.344l.065.266s30.57 20.662 176.636 37.914z"
        fill="#6c63ff"
      />
      <Path
        d="M947.198 107.616l69.376 28.324 17.426-1.935-41.496-31.185s-50.189-10.703-45.306 4.796z"
        fill="#3f3d56"
      />
      <Path
        d="M601.544 48.492c-3.313.058-10.896-5.496-15.61-9.23a49.534 49.534 0 017.023-5.413c3.8 2.916 10.565 7.64 14.326 7.47 5.428-.242-.756 7.087-5.74 7.173z"
        fill="#6c63ff"
      />
      <Path
        d="M916.702 205.532l-44.539 2.328-125.22-84.44-23.246-15.676-11.299-7.619c21.187-17.907 107.616 6.783 107.616 6.783 1.656 1.397 2.18 3.717 2.105 6.28-.142 4.801-2.397 10.453-3.266 12.465-.21.485-.338.757-.338.757z"
        fill="#3f3d56"
      />
    </Svg>
      </Animated.View>
      <Animated.View style={[{flex: 1,flexDirection: "column"}, leftSlide]}>
        <Svg width={width} height={width} viewBox={`0 0 4 4`} >
          <AnimatedPath
            fill="#5577dd"
            stroke="none"
            strokeWidth={0.01}
            animatedProps={path1}
          />
          {/*<AnimatedCircle fill="green" r={0.2} animatedProps={circle1}/>
          <AnimatedCircle fill="blue" r={0.2} animatedProps={circle2}/>
          <AnimatedCircle fill="yellow" r={0.2} animatedProps={circle3}/>
          <AnimatedCircle fill="black" r={0.2} animatedProps={circle4}/>*/}
        </Svg>
        <Svg width={width} height={width} viewBox={`0 0 4 4`} >
          <AnimatedPath
            fill="#5577dd"
            stroke="none"
            strokeWidth={0.01}
            animatedProps={path2}
          />
        </Svg>
      </Animated.View>
      <Animated.View style={[{flex: 1,flexDirection: "column"}, rightSlide]}>
        <Svg width={width} height={width} viewBox={`0 0 4 4`} >
          <AnimatedPath
            fill="#5577dd"
            stroke="none"
            strokeWidth={0.01}
            animatedProps={path3}
          />
          {/*<AnimatedCircle fill="green" r={0.2} animatedProps={circle1}/>
          <AnimatedCircle fill="blue" r={0.2} animatedProps={circle2}/>
          <AnimatedCircle fill="yellow" r={0.2} animatedProps={circle3}/>
          <AnimatedCircle fill="black" r={0.2} animatedProps={circle4}/>*/}
        </Svg>
        <Svg width={width} height={width} viewBox={`0 0 4 4`} >
          <AnimatedPath
            fill="#5577dd"
            stroke="none"
            strokeWidth={0.01}
            animatedProps={path4}
          />
        </Svg>
      </Animated.View>
    </View>
  )
}

export default Login
