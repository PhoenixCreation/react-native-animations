import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { SCREENS } from '../Constants'

function HomePage({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, marginTop: 20}}>
      {
        SCREENS.map((screenName, i) => {
          let backgroundColor = "white"
          if (screenName.name === "TaskList") { // current should be marked as yellow colored...
            backgroundColor = "yellow"
          } else if(i === 0){
            backgroundColor = "orange"
          }
          return (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate(screenName.name)}
            >
              <View style={{ ...styles.navigationButton, backgroundColor}}>
                <Text style={{ fontSize: 16}}>{screenName.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  navigationButton: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
  },
})

export default HomePage
