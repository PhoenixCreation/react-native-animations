import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
} from "react-native";
import { Audio } from "expo-av";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { songs } from "../../dummyData";
import { createAnimatableComponent } from "react-native-animatable";
import { Entypo } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
const { width, height } = Dimensions.get("window");

const AnimatableImage = createAnimatableComponent(Image);

const rotateAnimation = {
  0: { rotate: "0deg" },
  1: { rotate: "360deg" },
};

const BAR_HEIGHT = 60;

const theme = {
  backgroundColor: "#333333",
  playerBackgroundColor: "#9474ff",
};

const SpringConfig = {
  damping: 14,
};

export default function SpotTubeMusic() {
  const [sound, setSound] = useState(null);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const translateY = useSharedValue(0);
  const offsetY = useSharedValue(0);

  useEffect(() => {
    getUserAudios();
  });

  const getUserAudios = async () => {
    const { status } = MediaLibrary.requestPermissionsAsync();
    if (status === "granted") {
      console.log("here");
    }
  };

  useEffect(() => {
    return sound?.unloadAsync();
  }, [sound]);

  async function playSound() {
    console.log("Loading Sound");
    const { sound, status: newStatus } = await Audio.Sound.createAsync({
      uri:
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    });
    setSound(sound);

    await sound.playAsync();
  }

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
        translateY.value = withSpring(0, SpringConfig);
        offsetY.value = 0;
      } else {
        // Full Screen
        translateY.value = withSpring(-(height - BAR_HEIGHT), SpringConfig);
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
      <View style={styles.topBarCont}></View>
      <View style={styles.albumsCont}>
        <View style={styles.albumImageCont}>
          <Image
            style={styles.albumImage}
            source={{
              uri:
                currentSong.song_photo +
                "random=" +
                Math.floor(Math.random() * 10000),
            }}
          />
          <View style={styles.artistImageCont}>
            <AnimatableImage
              animation={rotateAnimation}
              duration={3000}
              easing="linear"
              delay={2000}
              iterationCount="infinite"
              style={styles.artistImage}
              source={{ uri: currentSong.artist_photo }}
            />
          </View>
          <Pressable style={styles.shuffleButton}>
            <Text style={styles.shuffleButtonText}>Shuffle</Text>
          </Pressable>
        </View>
        <View style={styles.albumsListCont}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
            {songs.map((song, index) => {
              const isCurrentlyPlaying = currentSong === song;
              return (
                <Pressable
                  key={index}
                  style={styles.songCont}
                  onPress={() => setCurrentSong(song)}
                >
                  <View style={styles.songImageCont}>
                    <Image
                      style={styles.songImage}
                      source={{ uri: song.song_photo + "random=" + index }}
                    />
                    {isCurrentlyPlaying && (
                      <View style={styles.isPlaying}>
                        <Entypo
                          name="controller-play"
                          size={28}
                          color="white"
                        />
                      </View>
                    )}
                  </View>
                  <View style={styles.songInfo}>
                    <Text style={styles.songName}>{song.song_name}</Text>
                    <Text style={styles.artistsName}>
                      {song.artists.map((artist) => {
                        return artist + ", ";
                      })}
                    </Text>
                  </View>
                  <Pressable
                    style={styles.songOption}
                    onPress={() => {
                      // TODO: Add song option
                    }}
                  >
                    <Entypo
                      name="dots-three-vertical"
                      size={16}
                      color="#d1ddd1"
                    />
                  </Pressable>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
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
  topBarCont: {
    width,
    height: 50,
    backgroundColor: theme.backgroundColor,
  },
  albumsCont: {
    width,
    height: height - BAR_HEIGHT - 50,
    backgroundColor: theme.backgroundColor,
    zIndex: 1,
    alignItems: "center",
    padding: 15,
    paddingBottom: 0,
  },
  albumImageCont: {
    width: "80%",
    height: 240,
    alignItems: "center",
  },
  albumImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    resizeMode: "stretch",
  },
  artistImageCont: {
    position: "absolute",
    bottom: 10,
    right: 10,
    elevation: 20,
    borderRadius: 40,
  },
  artistImage: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  shuffleButton: {
    position: "absolute",
    bottom: 10,
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: theme.playerBackgroundColor,
    elevation: 10,
  },
  shuffleButtonText: {
    fontSize: 16,
    color: "white",
  },
  albumsListCont: {
    width,
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 15,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomColor: "transparent",
    marginTop: 10,
    marginBottom: -15,
    paddingBottom: 15,
  },
  songCont: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderBottomWidth: 2,
    borderRadius: 50,
    borderColor: "#414141",
    paddingLeft: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },
  songImageCont: {
    width: 40,
    height: 40,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  songImage: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  isPlaying: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#31313199",
    alignItems: "center",
    justifyContent: "center",
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    color: "#e1e1e1",
    fontSize: 15,
    fontWeight: "bold",
  },
  artistsName: {
    color: "lightgrey",
    fontSize: 13,
  },
  songOption: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
});
