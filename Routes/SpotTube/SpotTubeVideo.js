import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Video } from "expo-av";
import { theme } from "./SpotTubeConfig";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const AnimatedVideo = Animated.createAnimatedComponent(Video);

const SpringConfig = {
  damping: 10,
};

const { width, height } = Dimensions.get("window");

const BAR_HEIGHT = 60;

const SpotTubeVideo = () => {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const translateY = useSharedValue(0);
  const offsetY = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationY }) => {
      translateY.value = translationY + offsetY.value;
    },
    onEnd: ({ translationY, velocityY }) => {
      const point = translationY + 0.2 * velocityY;
      if (point > 0) {
        // Go down
        translateY.value = withTiming(0);
        offsetY.value = 0;
      } else {
        // Full Screen
        translateY.value = withTiming(-(height - BAR_HEIGHT));
        offsetY.value = -(height - BAR_HEIGHT);
      }
    },
  });

  const videoContStyle = useAnimatedStyle(() => {
    return {
      width,
      height,
      backgroundColor: "white",
      position: "absolute",
      zIndex: 2,
      top: 0,
      transform: [{ translateY: height - BAR_HEIGHT + translateY.value }],
    };
  });

  const playerContStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        translateY.value,
        [-(height - BAR_HEIGHT), 0],
        [225, BAR_HEIGHT]
      ),
      width: "100%",
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "black",
    };
  });

  const videoStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      height: "100%",
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.mainCont}></View>
      <Animated.View style={videoContStyle}>
        <View style={styles.gestureCont}>
          <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={playerContStyle}>
              <AnimatedVideo
                ref={video}
                style={videoStyle}
                source={{
                  uri:
                    "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
                }}
                useNativeControls={false}
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </Animated.View>
          </PanGestureHandler>
        </View>
      </Animated.View>
    </View>
  );
};

export default SpotTubeVideo;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.backgroundColor,
  },
  mainCont: {
    width,
    height,
  },
  videoCont: {
    width,
    height,
    backgroundColor: "lightblue",
    position: "absolute",
    zIndex: 2,
    top: 0,
    transform: [{ translateY: height - BAR_HEIGHT }],
  },
  playerCont: {
    height: BAR_HEIGHT,
    width: "100%",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "black",
  },
});
