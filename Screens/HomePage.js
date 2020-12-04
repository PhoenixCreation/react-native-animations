import React from 'react'
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { SCREENS } from '../App'

function HomePage({ navigation }) {
  return (
    <View style={{ flex: 1, marginTop: 20}}>
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
              <View style={styles.navigationButton}>
                <Text style={{ fontSize: 16}}>{screenName.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })
      }
    </View>
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
