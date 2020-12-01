import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Svg, { Path } from "react-native-svg";

const {width, height} = Dimensions.get("window")

function Login() {
  return (
    <View style={{ flex: 1}}>
      <Svg width={width} height={width} viewBox={`0 0 4 4`} style={{ backgroundColor: "#0003"}}>
        <Path
          fill="red"
          stroke="none"
          strokeWidth={0.01}
          d="M 2 0 c -1 0.5 0.5 1.5 0 2 c -1 1 0.5 1.5 0 2 l -3 0 l 0 -4 Z"
        />
      </Svg>
      <Svg width={width} height={width} viewBox={`0 0 4 4`} style={{ backgroundColor: "#0003"}}>
        <Path
          fill="red"
          stroke="none"
          strokeWidth={0.01}
          d="M 2 0 c -1 0.5 0.5 1.5 0 2 c -1 1 0.5 1.5 0 2 l -3 0 l 0 -4 Z"
        />
      </Svg>
    </View>
  )
}

export default Login
