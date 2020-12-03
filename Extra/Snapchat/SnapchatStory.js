import React from 'react'
import { StyleSheet, Text, View, Button, ScrollView, Dimensions, Pressable, Image } from 'react-native';
import { useFocusEffect  } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";


export const stories = [
  {
    id: "2",
    source: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/stories/2.jpg",
    user: "derek.russel",
    avatar: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/avatars/jmitch.png",
  },
  {
    id: "8",
    source: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/stories/3.jpg",
    user: "derek.russel",
    avatar: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/avatars/jmitch.png",
  },
  {
    id: "4",
    source: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/stories/4.jpg",
    user: "jmitch",
    avatar: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/avatars/jmitch.png",
  },
  {
    id: "7",
    source: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/stories/7.jpg",
    user: "andrea.schmidt",
    avatar: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/avatars/jmitch.png",
    video: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/stories/7.mp4",
  },
  {
    id: "5",
    source: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/stories/5.jpg",
    user: "monicaa",
    avatar: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/avatars/jmitch.png",
  },
  {
    id: "3",
    source: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/stories/3.jpg",
    user: "alexandergarcia",
    avatar: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/avatars/jmitch.png",
  },
  {
    id: "1",
    source: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/stories/3.jpg",
    user: "andrea.schmidt",
    avatar: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/avatars/jmitch.png",
  },
  {
    id: "6",
    source: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/stories/3.jpg",
    user: "andrea.schmidt",
    avatar: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/910109ae17e60c4dc31ce18d7fa82a26b6d1cb54/season4/src/Snapchat/assets/avatars/jmitch.png",
  },
];


const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;

function SnapchatStory({ navigation }) {
  return (
    <ScrollView
      showsVertcalScrollIndicator={false}
    >
      <View style={styles.container}>
        {stories.map((story) => (
          <StoryThumbnail key={story.id} story={story} navigation={navigation}/>
        ))}
      </View>
    </ScrollView>
  )
}

const StoryThumbnail = ({story, navigation}) => {
  const [opacity, setOpacity] = React.useState(1)
  useFocusEffect(() => {
    if (navigation.isFocused()) {
      setOpacity(1);
    }
  })

  return (

    <Pressable
      style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
      onPress={() => {
        setOpacity(0);
        navigation.navigate("FullStory", { story });
      }}
    >
      <View style={[styles.thumbnail_container, { opacity }]}>
        <SharedElement id={story.id} style={{flex: 1}}>
          <Image source={{ uri: story.source }} style={styles.image} />
        </SharedElement>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  thumbnail_container: {
    width,
    height: width * 1.77,
    marginTop: 16,
    borderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    borderRadius,
  },
});

export default SnapchatStory
