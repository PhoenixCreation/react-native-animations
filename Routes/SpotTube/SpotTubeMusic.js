import React, { useState, useEffect } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Pressable,
  BackHandler,
} from "react-native";
import { Audio } from "expo-av";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  Easing,
} from "react-native-reanimated";
import { songs as defaultSongs } from "../../dummyData";
import {
  Entypo,
  Ionicons,
  AntDesign,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import { clamp } from "react-native-redash";
import MusicInfo from "expo-music-info";
const { width, height } = Dimensions.get("window");

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const BAR_HEIGHT = 60;

const theme = {
  backgroundColor: "#333333",
  playerBackgroundColor: "#7878d1",
};

const SpringConfig = {
  damping: 12,
};

export default function SpotTubeMusic({ navigation }) {
  const [sound, setSound] = useState(null);
  const [songs, setSongs] = useState(defaultSongs);
  const [currentSong, setCurrentSong] = useState(songs[0]);

  const translateY = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // useEffect(() => {
  //   getUserAudios();
  // }, []);

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (offsetY.value !== 0) {
      goSmallScreen();
      return true;
    } else {
      return false;
    }
  });

  const getUserAudios = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        const userSongs = await MediaLibrary.getAssetsAsync({
          first: 8,
          mediaType: MediaLibrary.MediaType.audio,
        });
        var newSongs = [];
        for (var i = 0; i < userSongs.assets.length; i++) {
          const crntSong = userSongs.assets[i];
          var tempSong = {};
          tempSong.id = crntSong.id;
          tempSong.song_name = crntSong.filename;
          tempSong.song_source = crntSong.uri;
          tempSong.song_photo = "https://picsum.photos/480/480";
          tempSong.artist_photo =
            "https://picsum.photos/480/480?random=" +
            Math.floor(Math.random() * 100);
          tempSong.artists = ["No artists"];
          newSongs.push(tempSong);
        }
        setSongs((prev) => [...prev, ...newSongs]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeSongTo = async (newSong) => {
    // let metadata = await MusicInfo.getMusicInfoAsync(newSong.song_source, {
    //   title: true,
    //   artist: true,
    //   album: true,
    //   genre: true,
    //   picture: true,
    // });
    // if (metadata) {
    //   if (metadata?.picture?.pictureData) {
    //     newSong.song_photo = metadata.picture.pictureData;
    //   } else {
    //     // TODO: Add default image
    //     newSong.song_photo = "https://picsum.photos/480/480";
    //   }
    //   newSong.artist_photo =
    //     "https://picsum.photos/480/480?random=" +
    //     Math.floor(Math.random() * 100);
    //   newSong.artists = [metadata?.artist];
    // }
    setCurrentSong(newSong);
  };

  useEffect(() => {
    return sound?.unloadAsync();
  }, [sound]);

  async function playSound() {
    console.log("Loading Sound");
    const { sound, status: newStatus } = await Audio.Sound.createAsync({
      uri: currentSong.song_source,
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
      borderColor: "#ffff43",
      borderWidth: 3,
      borderBottomWidth: 0,
      overflow: "hidden",
      backgroundColor: theme.playerBackgroundColor,
      transform: [{ translateY: translateY.value + (height - BAR_HEIGHT) }],
    };
  });

  const playerSmallStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 0,
      width: "100%",
      height: BAR_HEIGHT,
      zIndex: interpolate(
        translateY.value,
        [-(height - BAR_HEIGHT) / 7, 0],
        [5, 15]
      ),
      flexDirection: "row",
      backgroundColor: theme.playerBackgroundColor,
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      opacity: interpolate(
        translateY.value,
        [-(height - BAR_HEIGHT) / 3, 0],
        [0, 1]
      ),
      display: translateY.value > -(height - BAR_HEIGHT) / 3 ? "none" : "flex",
    };
  });

  const goFullScreen = () => {
    translateY.value = withSpring(-(height - BAR_HEIGHT), SpringConfig);
    offsetY.value = -(height - BAR_HEIGHT);
  };
  const goSmallScreen = () => {
    translateY.value = withSpring(0, SpringConfig);
    offsetY.value = 0;
  };

  const sliderValue = useSharedValue(0);
  const sliderOffsetValue = useSharedValue(0);
  const sliderState = useSharedValue("normal");
  const [sliderWidth, setSliderWidth] = useState(1);
  const [sliderCurrentValue, setSliderCurrentValue] = useState(0);

  const sliderGestureEvent = useAnimatedGestureHandler({
    onStart: () => {},
    onActive: ({ translationX }) => {
      sliderValue.value = translationX + sliderOffsetValue.value;
      sliderState.value = "active";
    },
    onEnd: ({ translationX }) => {
      sliderState.value = "normal";
      sliderValue.value = translationX + sliderOffsetValue.value;
      if (translationX + sliderOffsetValue.value < 0) {
        sliderOffsetValue.value = 0;
      } else if (translationX + sliderOffsetValue.value > sliderWidth) {
        sliderOffsetValue.value = sliderWidth;
      } else {
        sliderOffsetValue.value = translationX + sliderOffsetValue.value;
      }
      setSliderCurrentValue(
        Math.floor(sliderOffsetValue.value / 60) +
          ":" +
          Math.floor(
            sliderOffsetValue.value -
              Math.floor(sliderOffsetValue.value / 60) * 60
          )
      );
    },
    onCancel: () => {
      sliderState.value = "normal";
    },
    onFail: () => {
      sliderState.value = "normal";
    },
  });

  const sliderButtonStyle = useAnimatedStyle(() => {
    return {
      width: 15,
      height: 15,
      opacity: sliderState.value === "normal" ? 1 : 0,
      borderRadius: 40,
      backgroundColor: "#3838f1",
      position: "absolute",
      alignSelf: "flex-start",
      transform: [
        {
          translateX: interpolate(
            sliderValue.value,
            [0, sliderWidth],
            [0, sliderWidth - 10],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    return {
      width: "100%",
      backgroundColor: "white",
      borderRadius: 20,
      height: sliderState.value === "normal" ? 5 : 15,
    };
  });

  const forgroundStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      alignSelf: "flex-start",
      height: sliderState.value === "normal" ? 5 : 15,
      borderRadius: 20,
      width: interpolate(
        sliderValue.value,
        [0, sliderWidth],
        [5, sliderWidth],
        Extrapolate.CLAMP
      ),
      backgroundColor: "#3838f1",
    };
  });

  const likeAnimation = useSharedValue(0);

  const likeAnimationStyle1 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      opacity: interpolate(likeAnimation.value, [0, 0.2, 1], [0, 0.8, 0]),
      transform: [
        { translateY: interpolate(likeAnimation.value, [0, 1], [0, -70]) },
        { translateX: interpolate(likeAnimation.value, [0, 1], [0, 60]) },
        {
          scaleX: interpolate(
            likeAnimation.value,
            [0, 0.2, 1],
            [0.8, 1.7, 0.9]
          ),
        },
        {
          scaleY: interpolate(
            likeAnimation.value,
            [0, 0.2, 1],
            [0.8, 1.7, 0.9]
          ),
        },
      ],
    };
  });
  const likeAnimationStyle2 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      opacity: interpolate(likeAnimation.value, [0, 0.23, 1], [0, 0.8, 0]),
      transform: [
        { translateY: interpolate(likeAnimation.value, [0, 1], [0, -80]) },
        { translateX: interpolate(likeAnimation.value, [0, 1], [0, 50]) },
        {
          scaleX: interpolate(
            likeAnimation.value,
            [0, 0.23, 1],
            [0.8, 1.7, 0.9]
          ),
        },
        {
          scaleY: interpolate(
            likeAnimation.value,
            [0, 0.23, 1],
            [0.8, 1.7, 0.9]
          ),
        },
      ],
    };
  });
  const likeAnimationStyle3 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      opacity: interpolate(likeAnimation.value, [0, 0.26, 1], [0, 0.8, 0]),
      transform: [
        { translateY: interpolate(likeAnimation.value, [0, 1], [0, -80]) },
        { translateX: interpolate(likeAnimation.value, [0, 1], [0, -50]) },
        {
          scaleX: interpolate(
            likeAnimation.value,
            [0, 0.27, 1],
            [0.8, 1.7, 0.9]
          ),
        },
        {
          scaleY: interpolate(
            likeAnimation.value,
            [0, 0.27, 1],
            [0.8, 1.7, 0.9]
          ),
        },
      ],
    };
  });
  const likeAnimationStyle4 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      opacity: interpolate(likeAnimation.value, [0, 0.3, 1], [0, 0.8, 0]),
      transform: [
        { translateY: interpolate(likeAnimation.value, [0, 1], [0, -120]) },
        { translateX: interpolate(likeAnimation.value, [0, 1], [0, 0]) },
        {
          scaleX: interpolate(
            likeAnimation.value,
            [0, 0.3, 1],
            [0.8, 1.7, 0.9]
          ),
        },
        {
          scaleY: interpolate(
            likeAnimation.value,
            [0, 0.3, 1],
            [0.8, 1.7, 0.9]
          ),
        },
      ],
    };
  });
  const likeAnimationStyle5 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      opacity: interpolate(likeAnimation.value, [0, 0.33, 1], [0, 0.8, 0]),
      transform: [
        { translateY: interpolate(likeAnimation.value, [0, 1], [0, -90]) },
        { translateX: interpolate(likeAnimation.value, [0, 1], [0, 20]) },
        {
          scaleX: interpolate(
            likeAnimation.value,
            [0, 0.33, 1],
            [0.8, 1.7, 0.9]
          ),
        },
        {
          scaleY: interpolate(
            likeAnimation.value,
            [0, 0.33, 1],
            [0.8, 1.7, 0.9]
          ),
        },
      ],
    };
  });
  const likeAnimationStyle6 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      opacity: interpolate(likeAnimation.value, [0, 0.36, 1], [0, 0.8, 0]),
      transform: [
        { translateY: interpolate(likeAnimation.value, [0, 1], [0, -90]) },
        { translateX: interpolate(likeAnimation.value, [0, 1], [0, -20]) },
        {
          scaleX: interpolate(
            likeAnimation.value,
            [0, 0.36, 1],
            [0.8, 1.7, 0.9]
          ),
        },
        {
          scaleY: interpolate(
            likeAnimation.value,
            [0, 0.36, 1],
            [0.8, 1.7, 0.9]
          ),
        },
      ],
    };
  });
  const likeAnimationStyle7 = useAnimatedStyle(() => {
    return {
      position: "absolute",
      opacity: interpolate(likeAnimation.value, [0, 0.39, 1], [0, 0.8, 0]),
      transform: [
        { translateY: interpolate(likeAnimation.value, [0, 1], [0, -70]) },
        { translateX: interpolate(likeAnimation.value, [0, 1], [0, -60]) },
        {
          scaleX: interpolate(
            likeAnimation.value,
            [0, 0.39, 1],
            [0.8, 1.7, 0.9]
          ),
        },
        {
          scaleY: interpolate(
            likeAnimation.value,
            [0, 0.39, 1],
            [0.8, 1.7, 0.9]
          ),
        },
      ],
    };
  });

  const startLikeAnimation = () => {
    likeAnimation.value = 0;
    likeAnimation.value = withTiming(1, {
      duration: 1000,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBarCont}>
        <Pressable style={styles.backButtonCont}>
          <Ionicons
            style={styles.backButton}
            name="ios-arrow-round-back"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </Pressable>
        <View style={styles.headingCont}>
          <Text style={styles.heading} numberOfLines={1}>
            {currentSong.song_name}
          </Text>
        </View>
        <Pressable
          style={styles.moreOptionsCont}
          accessible={true}
          accessibilityLabel="More options"
          accessibilityHint="More options"
          onPress={() => {}}
        >
          <Entypo
            style={styles.moreOptions}
            name="dots-three-vertical"
            size={16}
            color="white"
          />
        </Pressable>
      </View>
      <View style={styles.albumsCont}>
        <View style={styles.albumImageCont}>
          <Image
            style={styles.albumImage}
            source={{
              uri: currentSong.song_photo,
            }}
          />
          <View style={styles.artistImageCont}>
            <Image
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
                  style={{
                    ...styles.songCont,
                    backgroundColor: isCurrentlyPlaying
                      ? theme.playerBackgroundColor + "44"
                      : "transparent",
                  }}
                  onPress={() => changeSongTo(song)}
                >
                  <View style={styles.songImageCont}>
                    <Image
                      style={styles.songImage}
                      source={{
                        uri: song.song_photo,
                      }}
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
                    <Text
                      style={{
                        ...styles.songName,
                        fontWeight: isCurrentlyPlaying ? "bold" : "100",
                      }}
                      numberOfLines={1}
                    >
                      {song.song_name}
                    </Text>
                    <Text style={styles.artistsName} numberOfLines={1}>
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
        <Animated.View style={{ ...styles.player, ...playerStyle }}>
          <AnimatedPressable
            style={playerSmallStyle}
            onPress={() => goFullScreen()}
          >
            <View style={styles.playerSongImageCont}>
              <Image
                style={styles.playerSongImage}
                source={{ uri: currentSong.song_photo }}
              />
            </View>
            <View style={styles.playerSongInfoCont}>
              <Text style={styles.playerSongName} numberOfLines={1}>
                {currentSong.song_name}
              </Text>
              <Text style={styles.playerArtistsName} numberOfLines={1}>
                {currentSong.artists.map((artist) => {
                  return artist + ", ";
                })}
              </Text>
            </View>
            <Pressable style={styles.lastSongCont} onPress={() => {}}>
              <AntDesign name="fastbackward" size={20} color="white" />
            </Pressable>
            <Pressable style={styles.playPauseSongCont} onPress={() => {}}>
              <Entypo name="controller-play" size={24} color="white" />
            </Pressable>
            <Pressable style={styles.nextSongCont} onPress={() => {}}>
              <AntDesign name="fastforward" size={20} color="white" />
            </Pressable>
            <Pressable style={styles.muteCont} onPress={() => {}}>
              <FontAwesome5 name="volume-mute" size={21} color="white" />
            </Pressable>
          </AnimatedPressable>
          <Animated.View style={styles.playerFull}>
            <View style={styles.fullTopBar}>
              <Pressable
                style={styles.fullGotoBottomCont}
                onPress={() => goSmallScreen()}
              >
                <AntDesign
                  style={styles.fullGotoBottom}
                  name="down"
                  size={24}
                  color="white"
                />
              </Pressable>
              <View style={styles.fullOptionsCont}>
                <Pressable style={styles.fullMuteOptionCont}>
                  <FontAwesome5
                    style={styles.fullMuteOption}
                    name="volume-mute"
                    size={21}
                    color="white"
                  />
                </Pressable>
                <Pressable style={styles.fullWaveOptionCont}>
                  <MaterialIcons
                    style={styles.fullWaveOption}
                    name="tune"
                    size={24}
                    color="white"
                  />
                </Pressable>
                <Pressable style={styles.fullMoreOptionCont}>
                  <Entypo
                    style={styles.moreOptions}
                    name="dots-three-vertical"
                    size={16}
                    color="white"
                  />
                </Pressable>
              </View>
            </View>
            <View style={styles.fullmiddleBar}>
              <View style={styles.fullImageCont}>
                <Image
                  style={styles.fullImage}
                  source={{ uri: currentSong.song_photo }}
                />
              </View>
              <View style={styles.fullSongInfoCont}>
                <Text style={styles.fullSongName}>{currentSong.song_name}</Text>
                <Text style={styles.fullArtistsName}>
                  {currentSong.artists.map((artist) => {
                    return artist + ", ";
                  })}
                </Text>
              </View>
            </View>
            <View style={styles.fullBottomBar}>
              <View style={styles.fullBottomFirst}>
                <Pressable style={styles.fullBottomPlaylistCont}>
                  <MaterialCommunityIcons
                    name="playlist-music"
                    size={24}
                    color="white"
                  />
                </Pressable>
                <Pressable
                  style={styles.fullBottomLikeCont}
                  onPress={() => startLikeAnimation()}
                >
                  <FontAwesome name="heart-o" size={24} color="white" />
                  <View style={styles.likeAnimationCont}>
                    <Animated.View
                      style={{
                        ...styles.likeAnimationHeart,
                        ...likeAnimationStyle1,
                      }}
                    >
                      <Entypo name="heart" size={24} color="white" />
                    </Animated.View>
                    <Animated.View
                      style={{
                        ...styles.likeAnimationHeart,
                        ...likeAnimationStyle2,
                      }}
                    >
                      <Entypo name="heart" size={24} color="white" />
                    </Animated.View>
                    <Animated.View
                      style={{
                        ...styles.likeAnimationHeart,
                        ...likeAnimationStyle3,
                      }}
                    >
                      <Entypo name="heart" size={24} color="white" />
                    </Animated.View>
                    <Animated.View
                      style={{
                        ...styles.likeAnimationHeart,
                        ...likeAnimationStyle4,
                      }}
                    >
                      <Entypo name="heart" size={24} color="white" />
                    </Animated.View>
                    <Animated.View
                      style={{
                        ...styles.likeAnimationHeart,
                        ...likeAnimationStyle5,
                      }}
                    >
                      <Entypo name="heart" size={24} color="white" />
                    </Animated.View>
                    <Animated.View
                      style={{
                        ...styles.likeAnimationHeart,
                        ...likeAnimationStyle6,
                      }}
                    >
                      <Entypo name="heart" size={24} color="white" />
                    </Animated.View>
                    <Animated.View
                      style={{
                        ...styles.likeAnimationHeart,
                        ...likeAnimationStyle7,
                      }}
                    >
                      <Entypo name="heart" size={24} color="white" />
                    </Animated.View>
                  </View>
                </Pressable>
                <Pressable style={styles.fullBottomAddCont}>
                  <AntDesign name="plus" size={24} color="white" />
                </Pressable>
              </View>
              <View style={styles.fullBottomSecond}>
                {/* TODO: Slider here... should be done by you only */}
                <PanGestureHandler
                  style={sliderStyles.container}
                  onGestureEvent={sliderGestureEvent}
                >
                  <Animated.View style={sliderStyles.innerCont}>
                    <Animated.View
                      style={{ ...sliderStyles.background, ...backgroundStyle }}
                      onLayout={(nativeEvent) =>
                        setSliderWidth(nativeEvent.nativeEvent.layout.width)
                      }
                    ></Animated.View>
                    <Animated.View style={forgroundStyle}></Animated.View>
                    <Animated.View style={sliderButtonStyle}></Animated.View>
                    <Animated.Text
                      style={sliderStyles.timeStart}
                      children={sliderCurrentValue}
                    />
                    <Text style={sliderStyles.timeEnd}>2:34</Text>
                  </Animated.View>
                </PanGestureHandler>
              </View>
              <View style={styles.fullBottomThird}>
                <Pressable style={styles.fullBottomShuffleCont}>
                  <Entypo name="shuffle" size={24} color="white" />
                </Pressable>
                <Pressable style={styles.fullBottomBackwardCont}>
                  <AntDesign name="fastbackward" size={20} color="white" />
                </Pressable>
                <Pressable style={styles.fullBottomPlayCont}>
                  <Entypo name="controller-play" size={26} color="white" />
                </Pressable>
                <Pressable style={styles.fullBottomForwardCont}>
                  <AntDesign name="fastforward" size={20} color="white" />
                </Pressable>
                <Pressable style={styles.fullBottomLoopCont}>
                  <Entypo name="loop" size={24} color="white" />
                </Pressable>
              </View>
            </View>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const sliderStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerCont: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    width: "100%",
    height: 5,
    backgroundColor: "white",
    borderRadius: 10,
  },
  timeStart: {
    fontSize: 14,
    position: "absolute",
    left: 0,
    bottom: 0,
    color: "white",
  },
  timeEnd: {
    fontSize: 14,
    position: "absolute",
    right: 0,
    bottom: 0,
    color: "white",
  },
});

const styles = StyleSheet.create({
  likeAnimationCont: {
    position: "absolute",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.backgroundColor,
  },
  topBarCont: {
    width,
    height: 50,
    backgroundColor: theme.backgroundColor,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderWidth: 1,
    borderColor: theme.playerBackgroundColor,
    borderBottomColor: "transparent",
  },
  headingCont: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    color: "#d1d1dd",
    fontSize: 18,
    fontWeight: "100",
  },
  backButtonCont: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  moreOptionsCont: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  backButton: {
    fontSize: 35,
  },
  moreOptions: {
    fontSize: 20,
  },
  albumsCont: {
    width,
    height: height - BAR_HEIGHT - 50,
    backgroundColor: theme.backgroundColor,
    zIndex: 1,
    alignItems: "center",
    padding: 15,
    paddingBottom: 0,
    borderWidth: 1,
    borderColor: theme.playerBackgroundColor,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    marginTop: -2,
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
    borderWidth: 2,
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
    borderRadius: 40,
  },
  songInfo: {
    flex: 1,
  },
  songName: {
    color: "white",
    fontSize: 16,
  },
  artistsName: {
    color: "lightgrey",
    fontSize: 12,
  },
  songOption: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  playerFull: {
    width: "100%",
    height: "100%",
    zIndex: 8,
  },
  playerSongImageCont: {
    width: 40,
    height: 40,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 10,
  },
  playerSongImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    resizeMode: "cover",
  },
  playerSongInfoCont: {
    flex: 1,
    marginTop: -5,
  },
  playerSongName: {
    fontWeight: "bold",
    color: "white",
    fontSize: 19,
  },
  playerArtistsName: {
    fontSize: 12,
    color: "white",
    marginTop: -5,
  },
  lastSongCont: {
    paddingHorizontal: 5,
  },
  playPauseSongCont: {
    paddingHorizontal: 5,
  },
  nextSongCont: {
    paddingHorizontal: 5,
  },
  muteCont: {
    paddingHorizontal: 5,
    marginLeft: 3,
  },
  fullGotoBottom: {
    padding: 10,
  },
  fullTopBar: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  fullOptionsCont: {
    flexDirection: "row",
  },
  fullMuteOptionCont: {
    padding: 10,
  },
  fullWaveOptionCont: {
    padding: 10,
  },
  fullMoreOptionCont: {
    padding: 10,
  },
  fullmiddleBar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  fullImageCont: {
    width: width / 2,
    height: width / 2,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 5,
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  fullSongInfoCont: {
    width: "100%",
  },
  fullSongName: {
    fontSize: 22,
    color: "white",
    width: "100%",
    textAlign: "center",
  },
  fullArtistsName: {
    fontSize: 16,
    color: "lightgrey",
    width: "100%",
    textAlign: "center",
  },
  fullBottomBar: {
    height: 200,
    paddingVertical: 15,
  },
  fullBottomFirst: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  fullBottomSecond: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
  fullBottomThird: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 30,
  },
});
