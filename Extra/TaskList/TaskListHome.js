import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';

const PROFILE_INFO = {
  image: "https://phoenixcreation2.herokuapp.com/static/logomain.png",
  name: {
    first: "Phoenix",
    last: "Creation",
  },
  todos: 15,
}

function TaskListHome() {
  return (
    <View style={styles.app}>
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
            <Text style={styles.todosCount}>{"Total Todos: " + PROFILE_INFO.todos}</Text>
          </View>
        </View>
      </View>
      <View style={{...styles.container, paddingVertical: 22}}>
        <View style={styles.todosCont}>
          <View style={styles.todo}>
            <View style={styles.todoIconCont}>
              <Image
                source={require("../../assets/adaptive-icon.png")}
                style={styles.todoIcon}
              />
            </View>
            <View style={styles.todoInfoCont}>
              <Text numberOfLines={1} style={styles.todoInfoTitle}>Title of todo</Text>
              <Text numberOfLines={2} style={styles.todoInfoDesc}>Description of the first todo and it should be only two lines of content</Text>
            </View>
          </View>
          <View style={{...styles.todo, marginBottom: 0}}>
            <View style={styles.todoIconCont}>
              <Image
              source={require("../../assets/adaptive-icon.png")}
              style={styles.todoIcon}
              />
            </View>
            <View style={styles.todoInfoCont}>
              <Text numberOfLines={1} style={styles.todoInfoTitle}>Title of todo</Text>
              <Text numberOfLines={2} style={styles.todoInfoDesc}>Description of the first todo and it should be only two lines of content</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#ccc",
  },
  container: {
    padding: 30,
    borderBottomWidth: 2,
    borderColor: "grey",
    borderRadius: 30,
  },
  profileImageCont: {
    backgroundColor: "white",
    shadowColor: "black",
    elevation: 20,
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
    width: 100,
    height: 100,
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
  todosCont: {
    flexDirection: "column",
  },
  todo: {
    height: 90,
    elevation: 5,
    backgroundColor: "#2ADFEB",
    marginBottom: 10,
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  todoIconCont: {
    marginLeft: 13,

  },
  todoIcon: {
    width: 70,
    height: 70,
    borderWidth: 1.5,
    borderRadius: 35,
    borderColor: "#0720FE",
    backgroundColor: "#1EE36D"
  },
  todoInfoCont: {
    flexDirection: "column",
    marginLeft: 15,
    flex: 1,
    marginRight: 15,
  },
  todoInfoTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  todoInfoDesc: {
    fontSize: 15,
    width: "100%",
    textAlign: "justify"
  }
})

export default TaskListHome
