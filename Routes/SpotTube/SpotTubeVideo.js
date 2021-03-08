import React from "react";
import { StyleSheet, Text, View } from "react-native";

const SpotTubeVideo = () => {
  return (
    <View style={styles.container}>
      <Text>This is video</Text>
    </View>
  );
};

export default SpotTubeVideo;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "yellow",
  },
});
