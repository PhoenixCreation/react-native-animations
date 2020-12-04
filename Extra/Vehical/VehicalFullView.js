import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const colors = [
  "black",
  "white",
  "red",
  "green",
  "blue",
  "pink",
  "gold",
  "lightblue",
  "grey",
  "lightgrey",
  "#ff5566",
  "#6555ff",
  "#44ff22",
]

function VehicalFullView({ route, navigation }) {
  const { car } = route.params
  return (
    <View style={styles.container}>
      <View style={{ height: 50, backgroundColor: colors[car.key]}}></View>
      <Image
        source={{ uri: car.image }}
        style={styles.image}
      />
      <View style={{ position: "absolute", top: 55, left: 12}}>
        <Text style={styles.model}>{car.name}</Text>
        <Text style={styles.description}>{car.description}</Text>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, top: 250}}>
      {
        colors.map((color,i) => {
          return (
            <View key={i} style={{
              width: 50,
              height: 50,
              backgroundColor: color,
              marginLeft: 12,
              borderRadius: 25,
              borderWidth: 0.4
            }}></View>
          );
        })
      }
      </ScrollView>
      <View style={{ height: 70, backgroundColor: colors[3], top: 280 }}>
      </View>
      <View style={{ height: 70, backgroundColor: colors[4], top: 280}}>
      </View>
      <View style={{ height: 70, backgroundColor: colors[5], top: 280 }}>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  model: {
    fontSize: 30,
    fontWeight: '700',
    position: "absolute",
  },
  description: {
    fontSize: 18,
    opacity: 0.7,
    position: "absolute",
    top: 37,
  },
  image: {
    height: 140 * 1.2,
    width: "100%",
    position: "absolute",
    resizeMode: "contain",
    top: 120,
  },
})

export default VehicalFullView
