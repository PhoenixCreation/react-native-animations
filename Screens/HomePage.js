import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { SCREENS } from '../Constants'

function HomePage({ navigation }) {
  return (
    <ScrollView style={{ flex: 1, marginTop: 20}}>
      {
        SCREENS.map((screenName, i) => {
          return (
            <TouchableOpacity
              key={i}
              onPress={() => navigation.navigate(screenName.name)}
            >
              <View style={{ ...styles.navigationButton, backgroundColor: i === 0 ? "orange" : "white"}}>
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
