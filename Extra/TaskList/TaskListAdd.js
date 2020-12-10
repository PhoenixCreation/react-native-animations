import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Pressable, TextInput } from 'react-native';

const LINE_COLOR = "#C87C35"

function TaskListAdd({ route, navigation }) {
  const { type } = route.params
  const { PROFILE_INFO } = route.params

  const [todoType, setTodoType] = React.useState(type)

  return (
    <ScrollView style={styles.app}>
      <View style={styles.container}>
        <View style={styles.headerCont}>
          <View style={styles.profileImageCont}>
            <Image
              source={{ uri: PROFILE_INFO.image }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.headerNameCont}>
            <Text style={styles.profileName}>{PROFILE_INFO.name.first}</Text>
          </View>
        </View>
      </View>
      <View style={{...styles.container, flexDirection: "column"}}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <Text style={{ fontSize: 24}}>Type:</Text>
          <View style={{ flexDirection: "row"}}>
            <Pressable onPress={() => setTodoType("normal")} style={{ borderColor: LINE_COLOR, backgroundColor: todoType === "normal" ? "#27f7f3" : "white", borderWidth: 2, borderRadius: 15, height: 50, width: 100, marginRight: 3, justifyContent: "center", alignItems: "center"}}>
              <Text style={{ fontSize: 18, color: todoType === "normal" ? "black" : "#27f7f3"}}>Normal</Text>
            </Pressable>
            <Pressable onPress={() => setTodoType("important")} style={{ borderColor: LINE_COLOR, backgroundColor: todoType === "important" ? "#f02121" : "white", borderWidth: 2, borderRadius: 15, height: 50, width: 100, justifyContent: "center", alignItems: "center"}}>
              <Text style={{ fontSize: 16, color: todoType === "important" ? "white" : "#f02121"}}>Important</Text>
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: "column", marginTop: 15}}>
          <Text style={{ fontSize: 24}}>Type:</Text>
          <TextInput
            style={{
              borderColor: LINE_COLOR,
              borderRadius: 15,
              borderWidth: 2,
              height: 50,
              paddingHorizontal: 15,
              marginTop: 5,
              fontSize: 18,
              alignItems: "center"
            }}
            placeholder="Enter a superb title...."
          />
        </View>
        <View style={{ flexDirection: "column", marginTop: 15}}>
          <Text style={{ fontSize: 24}}>Description:</Text>
          <TextInput
            style={{
              borderColor: LINE_COLOR,
              borderRadius: 15,
              borderWidth: 2,
              height: 50,
              paddingHorizontal: 15,
              marginTop: 5,
              fontSize: 18,
              alignItems: "center"
            }}
            placeholder="Describe what to do..."
          />
        </View>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    padding: 30,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderColor: "grey",
    borderRadius: 30,
  },
  profileImageCont: {
    backgroundColor: "white",
    shadowColor: "black",
    borderRadius: 50,
    borderColor: "#0720FEAA",
    borderWidth: 3,
    overflow: "hidden",

  },
  headerCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 65,
    height: 65,
    backgroundColor: "orange",
  },
  headerNameCont: {
    flexDirection: "column",
    marginLeft: 22,
  },
  profileName: {
    fontSize: 48,
    textShadowOffset: {
      width: 3,
      height: 3
    },
    textShadowRadius: 1
  },
  todosCount: {
    fontSize: 18,
  },
})

export default TaskListAdd
