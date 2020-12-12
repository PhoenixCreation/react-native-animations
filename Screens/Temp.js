import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Temp() {

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

  React.useEffect(() => {
    getData().then((data) => {
      console.log(data);
    })
  },[])

  // React.useEffect(() => {
  //   var data = {
  //     PROFILE_INFO: {
  //       image: "https://picsum.photos/200",
  //       name: {
  //         first: "Phoenix",
  //         last: "Creation",
  //       },
  //       settings: {
  //         theme: "normal"
  //       }
  //     },
  //     TODOS: []
  //   }
  //   storeData(data)
  // },[])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <Text>Check console for AsyncStorage testing....</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
})

export default Temp
