import React, { useRef, useEffect, useState } from "react";
import { StyleSheet, Text, View, Dimensions, Pressable } from "react-native";
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

import * as MediaLibrary from "expo-media-library";

const AnimatedVideo = Animated.createAnimatedComponent(Video);

const SpringConfig = {
  damping: 10,
};

const { width, height } = Dimensions.get("window");

const BAR_HEIGHT = 60;

const BREAK_POINT = 150;

const SpotTubeVideo = () => {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  // useEffect(() => {
  //   getVideos();
  // }, []);

  // const getVideos = async () => {
  //   try {
  //     const { status } = await MediaLibrary.requestPermissionsAsync();
  //     if (status === "granted") {
  //       const userVideos = await MediaLibrary.getAssetsAsync({
  //         first: 999,
  //         mediaType: MediaLibrary.MediaType.video,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const translateY = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const state = useSharedValue("down");

  const onGestureEvent = useAnimatedGestureHandler({
    onActive: ({ translationY }) => {
      translateY.value = translationY + offsetY.value;
    },
    onEnd: ({ translationY, velocityY }) => {
      const point = translationY + 0.2 * velocityY;
      if (state.value === "down") {
        if (point > 0) {
          // Go down
          translateY.value = withTiming(0);
          offsetY.value = 0;
        } else {
          // Go up
          translateY.value = withTiming(-(height - BAR_HEIGHT));
          offsetY.value = -(height - BAR_HEIGHT);
          state.value = "up";
        }
      } else if (state.value === "up") {
        if (point > 0) {
          // Go down
          translateY.value = withTiming(0);
          offsetY.value = 0;
          state.value = "down";
        } else {
          // Go Full Screen
          translateY.value = withTiming(-(height - BAR_HEIGHT));
          offsetY.value = -(height - BAR_HEIGHT);
          // runOnJS(video?.current?.presentFullscreenPlayer);

          state.value = "full";
        }
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
      width:
        translateY.value < -BREAK_POINT
          ? "100%"
          : interpolate(
              translateY.value,
              [-BREAK_POINT, 0],
              [width, width / 2]
            ),
      height: "100%",
    };
  });

  useEffect(() => {
    if (video.current) {
      return () => {
        video.current.unloadAsync();
      };
    }
  }, [video]);

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
                    "file:///storage/emulated/0/Download/@RMG.The.Flash.2014.S07E03.480p.hdtv.x264.mkv",
                }}
                useNativeControls={true}
                resizeMode="cover"
                onPlaybackStatusUpdate={(newstatus) => setStatus(newstatus)}
              />
            </Animated.View>
          </PanGestureHandler>
          <Pressable
            onPress={() => {
              status.isPlaying
                ? video.current.pauseAsync()
                : video.current.playAsync();
            }}
          >
            <Text>{status.isPlaying ? "pause" : "Play"}</Text>
          </Pressable>
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
