import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Pressable, TextInput, KeyboardAvoidingView, Button } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from 'react-native-animatable';
const AnimatableTextInput = Animatable.createAnimatableComponent(TextInput);
const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);

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

const typeTitle = {
  0: { opacity: 0, translateY: -50},
  1: { opacity: 1, translateY: 0},
}
const typeType = {
  0: { opacity: 0, translateX: 300},
  1: { opacity: 1, translateX: 0},
}

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
      navigation.navigate("TaskListHome")
    })
  }

  return (
    <KeyboardAvoidingView style={styles.app}>
      <ScrollView style={styles.app} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerCont}>
            <View style={styles.profileImageCont}>
              <SharedElement id="profileimage" style={{ backgroundColor: "orange"}}>
              <Image
                source={{ uri: PROFILE_INFO.image }}
                style={styles.profileImage}
              />
              </SharedElement>
            </View>
            <View style={styles.headerNameCont}>
              <SharedElement id="profilename">
                <Text style={styles.profileName}>{PROFILE_INFO.name.first}</Text>
              </SharedElement>
            </View>
          </View>
        </View>
        <View style={{...styles.container, flexDirection: "column"}}>
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
            <Animatable.Text
              useNativeDriver
              animation={typeTitle}
              duration={400}
              delay={500}
              style={{ fontSize: 24}}
            >
              Type:
            </Animatable.Text>
            <Animatable.View
              useNativeDriver
              animation={typeType}
              duration={400}
              delay={700}
              style={{ flexDirection: "row"}}
            >
              <Pressable onPress={() => setTodoType("normal")} style={{ borderColor: LINE_COLOR, backgroundColor: todoType === "normal" ? "#27f7f3" : "white", borderWidth: 2, borderRadius: 15, height: 50, width: 100, marginRight: 3, justifyContent: "center", alignItems: "center"}}>
                <Text style={{ fontSize: 18, color: todoType === "normal" ? "black" : "#27f7f3"}}>Normal</Text>
              </Pressable>
              <Pressable onPress={() => setTodoType("important")} style={{ borderColor: LINE_COLOR, backgroundColor: todoType === "important" ? "#f02121" : "white", borderWidth: 2, borderRadius: 15, height: 50, width: 100, justifyContent: "center", alignItems: "center"}}>
                <Text style={{ fontSize: 16, color: todoType === "important" ? "white" : "#f02121"}}>Important</Text>
              </Pressable>
            </Animatable.View>
          </View>
          <View style={{ flexDirection: "column", marginTop: 15}}>
            <Animatable.Text
              useNativeDriver
              animation={typeTitle}
              duration={400}
              delay={900}
              style={{ fontSize: 24}}
            >
              Title:
            </Animatable.Text>
            <AnimatableTextInput
              animation={typeType}
              duration={500}
              delay={1000}
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
            <Animatable.Text
              useNativeDriver
              animation={typeTitle}
              duration={400}
              delay={1100}
              style={{ fontSize: 24}}
            >
              Description:
            </Animatable.Text>
            <AnimatableTextInput
              animation={typeType}
              duration={500}
              delay={1200}
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
            <Animatable.Text
              useNativeDriver
              animation={typeTitle}
              duration={400}
              delay={1300}
              style={{ fontSize: 24}}
            >
              Icon:
            </Animatable.Text>
            <AnimatableScrollView
              animation={typeType}
              duration={500}
              delay={1400}
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
            </AnimatableScrollView>
          </View>
          <View style={{ flexDirection: "column", marginTop: 15}}>
            <Animatable.Text
              useNativeDriver
              animation={typeTitle}
              duration={400}
              delay={1500}
              style={{ fontSize: 24}}
            >
              Color:
            </Animatable.Text>
            <Animatable.View
              animation={typeType}
              duration={500}
              delay={1600}
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
            </Animatable.View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center"}}>
            <Animatable.Text
              useNativeDriver
              animation={typeTitle}
              duration={400}
              delay={1700}
              style={{ fontSize: 24}}
            >
              Date:
            </Animatable.Text>
            <Animatable.View
              animation={typeType}
              duration={500}
              delay={1800}
              style={{paddingLeft: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: LINE_COLOR, borderRadius: 15, height: 50, borderWidth: 2, flex: 1, marginLeft: 15}}
            >
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
            </Animatable.View>
          </View>
          <View style={{ flexDirection: "row", marginTop: 15, alignItems: "center"}}>
            <Animatable.Text
              useNativeDriver
              animation={typeTitle}
              duration={400}
              delay={1900}
              style={{ fontSize: 24}}
            >
              Time:
            </Animatable.Text>
            <Animatable.View
              animation={typeType}
              duration={500}
              delay={2000}
              style={{paddingLeft: 10, flexDirection: "row", justifyContent: "center", alignItems: "center", borderColor: LINE_COLOR, borderRadius: 15, height: 50, borderWidth: 2, flex: 1, marginLeft: 15}}
            >
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
            </Animatable.View>
          </View>

        </View>
        {/* PREVIEW */}
        <View style={styles.container}>
          <Animatable.Text
            useNativeDriver
            animation={typeTitle}
            duration={400}
            delay={2000}
            style={{ fontSize: 24, marginBottom: 10}}
          >
            Preview:
          </Animatable.Text>
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
          <Pressable onPress={() => addTodo()} style={{ alignSelf: "center"}}>
            <View style={{ width: 100, height: 50, alignItems: "center", justifyContent: "center", backgroundColor: "gold"}}>
              <Text style={{ color: "blue", fontSize: 20}}>Add</Text>
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
    backgroundColor: "orange",
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
    borderRadius: 65,
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

TaskListAdd.sharedElements = (route, otherroute, showing) => {
  return [
    {
      id: `profileimage`
    },
    {
      id: `profilename`
    },
    // {
    //   id: `item.${car.key}.image`
    // },
  ];
}

export default TaskListAdd
