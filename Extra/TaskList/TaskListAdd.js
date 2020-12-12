import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Pressable, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LINE_COLOR = "#C87C35"
const ICONS = [
  {
    key: 1,
    icon: require("../../assets/icons/1.png")
  },
  {
    key: 2,
    icon: require("../../assets/icons/2.png")
  },
  {
    key: 3,
    icon: require("../../assets/icons/3.png")
  },
  {
    key: 4,
    icon: require("../../assets/icons/4.png")
  },
  {
    key: 5,
    icon: require("../../assets/icons/5.png")
  },
  {
    key: 6,
    icon: require("../../assets/icons/6.png")
  },
]
const COLORS = [
  {
    key: 1,
    color: "#1EE36D",
  },
  {
    key: 2,
    color: "#2ADFEB",
  },
  {
    key: 3,
    color: "#E31EDB",
  },
  {
    key: 4,
    color: "#BF8046",
  },
  {
    key: 5,
    color: "#AD2AEB",
  },
  {
    key: 6,
    color: "#C4C4C4",
  },
]

function TaskListAdd({ route, navigation }) {

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@TodoApp', jsonValue)
    } catch (e) {
      // saving error
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@TodoApp')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }

  const { type } = route.params
  const { PROFILE_INFO } = route.params

  const [todoType, setTodoType] = React.useState(type)
  const [todoTitle,setTodoTitle] = React.useState("")
  const [todoDescription,setTodoDescription] = React.useState("")
  const [todoIcon, setTodoIcon] = React.useState(ICONS[0].icon)
  const [todoColor, setTodoColor] = React.useState(COLORS[0].color)
  const [todoDate,setTodoDate] = React.useState(new Date())
  const [todoTime,setTodoTime] = React.useState(new Date())


  const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = React.useState(false);


  const [lines,setLines] = React.useState(2)
  const toggleLines = () => {
    if (lines === 2) {
      setLines(50)
    } else {
      setLines(2)
    }
  }
  const handleConfirm = (date) => {
    setTodoDate(date)
    setDatePickerVisibility(false)
  };
  const handleConfirmTime = (time) => {
    setTodoTime(time)
    setTimePickerVisibility(false)
  }

  const addTodo = () => {
    getData().then((prevdata) => {
      let data = prevdata
      let todos = prevdata.TODOS
      let currentTodo = {
        key: todos.length + 1,
        title: todoTitle,
        description: todoDescription,
        type: todoType,
        icon: todoIcon,
        color: todoColor,
        date: todoDate,
        time: todoTime,
        done: false
      }
      todos.push(currentTodo)
      data.TODOS = todos
      storeData(data)
      console.log("done");
    })
  }

  return (
    <KeyboardAvoidingView style={styles.app}>
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
            <Text style={{ fontSize: 24}}>Title:</Text>
            <TextInput
              value={todoTitle}
              onChangeText={ text => setTodoTitle(text)}
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
              value={todoDescription}
              onChangeText={text => setTodoDescription(text)}
              style={{
                borderColor: LINE_COLOR,
                borderRadius: 15,
                borderWidth: 2,
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginTop: 5,
                fontSize: 18,
                alignItems: "center"
              }}
              placeholder="Describe what to do..."
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />
          </View>
          <View style={{ flexDirection: "column", marginTop: 15}}>
            <Text style={{ fontSize: 24}}>Icon:</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                borderRadius: 15,
                borderColor: LINE_COLOR,
                borderWidth: 2,
                height: 75,
                paddingHorizontal: 5,

              }}
            >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {
                ICONS.map((icon,i) => {
                  return (
                    <Pressable
                      onPress={() => setTodoIcon(icon.icon)}
                      key={icon.key}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 40,
                        borderWidth: 2,
                        borderColor: "black",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        backgroundColor: todoIcon === icon.icon ? "yellow" : "lightgrey",
                        marginLeft: 10,
                      }}
                    >
                      <Image
                        source={icon.icon}
                        style={{
                          width:40,
                          height: 40,
                          resizeMode: "contain"
                        }}
                      />
                    </Pressable>
                  );
                })
              }
            </View>
            </ScrollView>
          </View>
          <View style={{ flexDirection: "column", marginTop: 15}}>
            <Text style={{ fontSize: 24}}>Color:</Text>
            <View
              style={{
                borderRadius: 15,
                borderColor: LINE_COLOR,
                borderWidth: 2,
                height: 50,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                paddingHorizontal: 5,
              }}
            >
              {
                COLORS.map((color,i) => {
                  return (
                    <Pressable
                      onPress={() => setTodoColor(color.color)}
                      key={color.key}
                      style={{
                        height: 40,
                        width: 40,
                        borderRadius: 40,
                        borderWidth: todoColor === color.color ? 2 : 0,
                        borderColor: todoColor === color.color ? "black" : "yellow",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        backgroundColor: color.color
                      }}
                    >
                    </Pressable>
                  );
                })
              }
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center"}}>
            <Text style={{ fontSize: 24}}>Date:</Text>
            <View style={{paddingLeft: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: LINE_COLOR, borderRadius: 15, height: 50, borderWidth: 2, flex: 1, marginLeft: 15}}>
              <Text style={{ fontSize: 20, flex: 1}}>{todoDate.getDate() + "-" + (todoDate.getMonth()+ 1) + "-" + todoDate.getFullYear()}</Text>
              <Pressable
                onPress={() => setDatePickerVisibility(true)}
                style={{
                  marginRight: 15
                }}
              >
                <FontAwesome name="calendar" size={24} color="black" />
              </Pressable>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center"}}>
            <Text style={{ fontSize: 24}}>Time:</Text>
            <View style={{paddingLeft: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: LINE_COLOR, borderRadius: 15, height: 50, borderWidth: 2, flex: 1, marginLeft: 15}}>
              <Text style={{ fontSize: 20, flex: 1}}>{todoTime.getHours() + ":" + todoTime.getMinutes()}</Text>
              <Pressable
                onPress={() => setTimePickerVisibility(true)}
                style={{
                  marginRight: 15
                }}
              >
                <Ionicons name="md-clock" size={30} color="black" />
              </Pressable>
              <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={() => setTimePickerVisibility(false)}
              />
            </View>
          </View>

        </View>
        {/* PREVIEW */}
        <View style={styles.container}>
          <Text style={{ fontSize: 24, marginBottom: 10}}>Preview:</Text>
          <Pressable onPress={() => toggleLines()} style={{...styles.todo, backgroundColor: todoColor}}>
            <View style={styles.todoIconCont}>
              <Image
                source={todoIcon}
                style={styles.todoIcon}
              />
            </View>
            <View style={styles.todoInfoCont}>
              <Text numberOfLines={lines - 1} style={styles.todoInfoTitle}>{todoTitle}</Text>
              <Text numberOfLines={lines} style={styles.todoInfoDesc}>{todoDescription}</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.container}>
          <Pressable onPress={() => addTodo()}>
            <View style={{ width: 100, height: 50, alignItems: "center", justifyContent: "center", backgroundColor: "lightblue"}}>
              <Text>Add</Text>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
})

export default TaskListAdd
