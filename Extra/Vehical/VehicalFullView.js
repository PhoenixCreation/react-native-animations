import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from 'react-native-animatable';

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
const animation = {
  0: {opacity: 0, translateX: 50},
  1: {opacity: 1, translateX: 0},
}

const AnimatableScrollView = Animatable.createAnimatableComponent(ScrollView);

function VehicalFullView({ route, navigation }) {
  const { car } = route.params
  return (
    <View style={styles.container}>
      <View style={{ height: 50, backgroundColor: colors[car.key]}}></View>
      <SharedElement id={`item.${car.key}.image`}>
      <Image
        source={{ uri: car.image }}
        style={styles.image}
      />
      </SharedElement>
      <View style={{ position: "absolute", top: 55, left: 12}}>
        <SharedElement id={`item.${car.key}.name`}>
          <Text style={styles.model}>{car.name}</Text>
        </SharedElement>
        <SharedElement id={`item.${car.key}.description`}>
          <Text style={styles.description}>{car.description}</Text>
        </SharedElement>
      </View>
      <AnimatableScrollView
        useNativeDriver
        animation={animation}
        delay={200}
        duration={400}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0, top: 270}}
      >
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
      </AnimatableScrollView>
      <Animatable.View animation={animation} useNativeDriver duration={500} delay={400} style={{ height: 70, backgroundColor: colors[3], top: 300 }}>
      </Animatable.View>
      <Animatable.View animation={animation} useNativeDriver duration={500} delay={550} style={{ height: 70, backgroundColor: colors[4], top: 300}}>
      </Animatable.View>
      <Animatable.View animation={animation} useNativeDriver duration={500} delay={700} style={{ height: 70, backgroundColor: colors[5], top: 300 }}>
      </Animatable.View>
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
    resizeMode: "center",
    top: 120,
  },
})

VehicalFullView.sharedElements = (route, otherroute, showing) => {
  const { car } = route.params
  return [
    {
      id: `item.${car.key}.name`
    },
    {
      id: `item.${car.key}.description`
    },
    {
      id: `item.${car.key}.image`
    },
  ];
}

export default VehicalFullView
