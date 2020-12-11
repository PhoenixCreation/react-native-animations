import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, Pressable } from 'react-native';
import { Svg, Circle } from "react-native-svg"

const Todos = [
  {
    key: 1,
    title: "Title of todo",
    description: "Description of the first todo and it should be only two lines of content",
    icon: require("../../assets/adaptive-icon.png"),
    color: "#2ADFEB",
    done: false,
    time: new Date().toUTCString(),

  },
  {
    key: 2,
    title: "Title of todo",
    description: "Description of the first todo and it should be only two lines of content",
    icon: { uri: "https://picsum.photos/200"},
    color: "#2AEB54",
    done: false,
    time: new Date().toUTCString(),

  },
  {
    key: 3,
    title: "Title of todo",
    description: "Description of the first todo and it should be only two lines of content",
    icon: require("../../assets/adaptive-icon.png"),
    color: "#2ADFEB",
    done: false,
    time: new Date().toUTCString(),

  },
]
const PROFILE_INFO = {
  image: "https://phoenixcreation2.herokuapp.com/static/logomain.png",
  name: {
    first: "Phoenix",
    last: "Creation",
  },
  todos: 15,
}

function TaskListHome({ navigation }) {
  return (
    <ScrollView style={styles.app} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.todosCount}>{"Total Todos: " + 15}</Text>
          </View>
        </View>
      </View>
      <View style={{...styles.container, paddingVertical: 22}}>
        <TodoContainer todos={Todos} />
      </View>
      <View style={{...styles.container, paddingVertical: 22}}>
        <View style={styles.buttonsCont}>
          <Pressable onPress={() => navigation.navigate("TaskListAdd", { type: "normal", PROFILE_INFO})} style={styles.button}>
            <Text style={styles.buttonText}>Create Todo</Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate("TaskListAdd", { type: "important", PROFILE_INFO})} style={{...styles.button, marginRight: 0, backgroundColor: "#1324C2"}}>
            <Text style={{ ...styles.buttonText, color: "white", fontSize: 15}}>Important Todo</Text>
          </Pressable>
        </View>
      </View>
      <View style={{...styles.container, paddingVertical: 22}}>
        <View style={styles.progressCont}>
          <ProgressCard title="Progress" progress={10} />
          <ProgressCard title="Progress" progress={45} />
          <ProgressCard title="Progress" progress={65} />
          <ProgressCard title="Progress" progress={85} />
        </View>
      </View>
      <View style={{...styles.container, paddingVertical: 22, flexDirection: "row", justifyContent: "center"}}>
        <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, marginRight: 10, backgroundColor: "red"}}></View>
        <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, marginRight: 10, backgroundColor: "red"}}></View>
        <View style={{ width: 50, height: 50, borderRadius: 25, borderWidth: 1, marginRight: 0, backgroundColor: "red"}}></View>
      </View>
    </ScrollView>
  )
}

const TodoContainer = ({ todos }) => {

  if(todos.length === 0){
    return <View><Text>Start Adding todos to show them here..</Text></View>
  }
  return (
    <View style={styles.todosCont}>
    {
      todos.map((todo,index) => {
        const [lines,setLines] = React.useState(2)
        const toggleLines = () => {
          if (lines === 2) {
            setLines(50)
          } else {
            setLines(2)
          }
        }
        if (index > 1) {
          return
        }
        return (
          <Pressable onPress={() => toggleLines()} onLongPress={() => console.log("Long press")} style={{...styles.todo, backgroundColor: todo.color}} key={todo.key}>
            <View style={styles.todoIconCont}>
              <Image
                source={todo.icon}
                style={styles.todoIcon}
              />
            </View>
            <View style={styles.todoInfoCont}>
              <Text numberOfLines={lines - 1} style={styles.todoInfoTitle}>{todo.title}</Text>
              <Text numberOfLines={lines} style={styles.todoInfoDesc}>{todo.description}</Text>
            </View>
          </Pressable>
        );
      })
    }
    </View>
  );
}

const ProgressCard = ({ title, progress}) => {
  const pstyles = StyleSheet.create({
    card: {
      width: 145,
      height: 200, // TEMP: Remove
      marginBottom: 15,
      backgroundColor: "#1BFBC5",
      borderRadius: 25,
      borderWidth: 1,
      flexDirection: "column",
      padding: 15,
      elevation: 16,
      alignItems: "center"
    },
    title: {
      fontSize: 22,
      fontWeight: "bold",
      textAlign: "center",
      color: "#050FFB",
      marginBottom: 10,
    }
  })
  const circumference = 45 * 2 * Math.PI
  const strokeOffset = ((100 - progress) / 100) * Math.PI * 2 * 45

  return (
    <View style={pstyles.card}>
      <Text style={pstyles.title}>{title}</Text>
      <View style={{ position: "absolute", left: 50, top: 100}}>
        <Text style={{ fontSize: 22, color: "#050FFB"}}>{progress+ "%"}</Text>
      </View>
      <View style={{ transform: [{ rotate: "270deg"}]}}>
        <Svg width={110} height={110}>
          <Circle
          stroke="#fff00099"
          strokeWidth={10}
          fill="none"
          r={45}
          cx={55}
          cy={55}
          />
          <Circle
            stroke="#ff0000"
            strokeWidth={10}
            fill="none"
            r={45}
            cx={55}
            cy={55}
            strokeDasharray={`${circumference}, ${circumference}`}
            strokeDashoffset={strokeOffset}
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "#fff",
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
    elevation: 30,
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
    // height: 90,
    paddingVertical: 10,
    elevation: 5,
    backgroundColor: "#2ADFEB",
    marginBottom: 10,
    borderRadius: 25,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",

		shadowColor: 'black',
		shadowOpacity: 1,
		shadowRadius: 20,
		shadowOffset: { width: 2, height: 2 },
  },
  todoIconCont: {

      width: 80,
      height: 80,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 13,
      borderWidth: 1.5,
      borderRadius: 40,
      overflow: "hidden",
      borderColor: "#0720FE",
      backgroundColor: "#fffa",
  },
  todoIcon: {
    width: 60,
    height: 60,
    resizeMode: "contain"
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
  },
  buttonsCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    marginRight: 12,
    borderWidth: 2,
    borderRadius: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
    backgroundColor: "white"
  },
  buttonText: {
    color: "#1324C2",
    fontSize: 20,
    fontWeight: "bold"
  },
  progressCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }
})

export default TaskListHome