import React from 'react'
import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useVector, snapPoint } from "react-native-redash";
import { SharedElement } from "react-navigation-shared-element";
const { height } = Dimensions.get("window");

function SnapchatFullStory({ route, navigation }) {
  const isGestureActive = useSharedValue(false);
  const translation = useVector();
  const { story } = route.params;
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: () => (isGestureActive.value = true),
    onActive: ({ translationX, translationY }) => {
      translation.x.value = translationX;
      translation.y.value = translationY;
    },
    onEnd: ({ translationY, velocityY }) => {
      let point = translationY + 0.2 * velocityY;
      let topmargin = Math.abs(point)
      let bottommargin = Math.abs(point - height)
      const snapBack = topmargin > bottommargin

      if (snapBack) {
        navigation.goBack();
      } else {
        isGestureActive.value = false;
        translation.x.value = withSpring(0);
        translation.y.value = withSpring(0);
      }
    },
  });
  const style = useAnimatedStyle(() => {
    const scale = interpolate(
      translation.y.value,
      [0, height],
      [1, 0.5],
      Extrapolate.CLAMP
    );
    return {
      flex: 1,
      transform: [
        { translateX: translation.x.value * scale },
        { translateY: translation.y.value * scale },
        { scale },
      ],
    };
  });
  const borderStyle = useAnimatedStyle(() => {
    return {
      borderRadius: withTiming(isGestureActive.value ? 24 : 0),
    };
  });


  return (
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={style}>
        <SharedElement id={story.id} style={{ flex: 1 }}>
            <Animated.Image
              source={{
                uri:story.source
              }}
              style={[
                {
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                  resizeMode: "cover",
                },
              ]}
            />
        </SharedElement>
      </Animated.View>
    </PanGestureHandler>

  )
}

export default SnapchatFullStory
