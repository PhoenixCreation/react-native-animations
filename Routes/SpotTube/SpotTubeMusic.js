import React, { useState, useEffect } from "react";
import { Text, ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { Audio } from "expo-av";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";
import { songs } from "../../Constants";
const { width, height } = Dimensions.get("window");

const BAR_HEIGHT = 60;

const theme = {
  backgroundColor: "#333333",
  playerBackgroundColor: "#9474ff",
};

const SpringConfig = {
  damping: 15,
};

export default function SpotTubeMusic() {
  const [sound, setSound] = useState(null);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const translateY = useSharedValue(0);
  const offsetY = useSharedValue(0);

  async function playSound() {
    console.log("Loading Sound");
    const { sound, status: newStatus } = await Audio.Sound.createAsync({
      uri:
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    });
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound?.unloadAsync();
  }, [sound]);

  const pauseAudio = () => {
    if (sound) {
      sound.pauseAsync();
    }
  };

  const playAudio = () => {
    if (sound) {
      sound.playAsync();
    }
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: ({ translationY }) => {},
    onActive: ({ translationY }) => {
      translateY.value = translationY + offsetY.value;
    },
    onEnd: ({ translationY, velocityY }) => {
      const point = translationY + 0.2 * velocityY;
      if (point > 0) {
        // Go down
        translateY.value = withTiming(0, SpringConfig);
        offsetY.value = 0;
      } else {
        // Full Screen
        translateY.value = withTiming(-(height - BAR_HEIGHT), SpringConfig);
        offsetY.value = -(height - BAR_HEIGHT);
      }
    },
  });

  const playerStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      height: height,
      width,
      top: 0,
      zIndex: 10,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      backgroundColor: theme.playerBackgroundColor,
      transform: [{ translateY: translateY.value + (height - BAR_HEIGHT) }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.albumsCont}>
        {/* Start with currentSong Image */}
      </View>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        style={{ flex: 1, width, height }}
      >
        <Animated.View style={playerStyle}></Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.backgroundColor,
  },
  albumsCont: {
    width,
    height: height - BAR_HEIGHT,
    backgroundColor: theme.backgroundColor,
    zIndex: 1,
  },
});
