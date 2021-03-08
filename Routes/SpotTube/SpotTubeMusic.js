import React, { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { Audio } from "expo-av";

export default function SpotTubeMusic() {
  const [sound, setSound] = useState(null);
  const [status, setStatus] = useState(null);

  async function playSound() {
    console.log("Loading Sound");
    const { sound, status: newStatus } = await Audio.Sound.createAsync({
      uri:
        "https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Comfort_Fit_-_03_-_Sorry.mp3",
    });
    setStatus(newStatus);
    setSound(sound);

    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
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

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
      <Button title="Play" onPress={playAudio} />
      <Button title="Pause" onPress={pauseAudio} />
      <Text>{JSON.stringify(status)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "white",
  },
});
