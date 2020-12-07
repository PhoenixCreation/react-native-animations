import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { SCREENS } from '../App'

function HomePage({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, marginTop: 20}}>
      {
        SCREENS.map((screenName, i) => {
          if(i === 0){
            return
          }

          return (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate(screenName.name)}
            >
              <View style={{ ...styles.navigationButton, backgroundColor: i === 1 ? "orange" : "white"}}>
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
