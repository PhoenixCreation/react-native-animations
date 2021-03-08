import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackgroundBottom from "../../Svgs/SpotTube/BackgroundBottom";

const { width, height } = Dimensions.get("window");
const SpotTubeHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.backgroundCont}>
        <BackgroundBottom
          style={styles.backgroundBottom}
          width={width}
          height={width * 0.88}
        />
      </View>
      <TouchableOpacity
        style={{ ...styles.card, ...styles.cardLeft }}
        onPress={() => navigation.navigate("Music")}
      >
        <View style={styles.logoCont}>
          <Ionicons
            style={{ ...styles.logo, ...styles.musicLogo }}
            name="ios-musical-notes"
            size={40}
            color="black"
          />
        </View>
        <View style={styles.typeCont}>
          <Text style={styles.typeText}>Music</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ ...styles.card, ...styles.cardRight }}
        onPress={() => navigation.navigate("Video")}
      >
        <View style={styles.logoCont}>
          <Ionicons
            style={{ ...styles.logo, ...styles.videoLogo }}
            name="md-videocam"
            size={40}
            color="black"
          />
        </View>
        <View style={styles.typeCont}>
          <Text style={{ ...styles.typeText, ...styles.videoText }}>
            Videos
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SpotTubeHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(204, 255, 255)",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  backgroundCont: {
    position: "absolute",
    flex: 1,
    left: 0,
    top: 0,
    height,
  },
  backgroundBottom: {
    position: "absolute",
    bottom: 0,
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: "#00ff34",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 15,
  },
  cardRight: {
    backgroundColor: "rgba(77, 255, 195,1)",
  },
  logo: {
    fontSize: 60,
    color: "green",
  },
  typeText: {
    fontSize: 22,
    color: "green",
  },
  videoLogo: {
    color: "#ff4444",
  },
  videoText: {
    color: "#ff4444",
  },
});
