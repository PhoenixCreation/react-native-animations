import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate
} from "react-native-reanimated";
import { interpolateColor, ColorSpace } from "react-native-redash";

var { width, height } = Dimensions.get("window");

const products = [
  {
    title: "How about an Iced Coffee Rosé?",
    subtitle: "Medium, Creamy Cream, Sweet Sugar, Iced",
    color1: "#F9AC8A",
    color2: "#FBC6AE",
    aspectRatio: 1,
  },

  {
    title: "Craving a Philharmonic?",
    subtitle: "Large, Medium Cream, Medium Sugar",
    color1: "#4DD2A5",
    color2: "#63D8B0",
    aspectRatio: 1,
  },
  {
    title: "Craving a new Cold Brew?",
    subtitle: "Try Philtered Soul",
    color1: "#FEB829",
    color2: "#FDD446",
    aspectRatio: 1,
  },
  {
    title: "Excited for an Ecstatic?",
    subtitle: "Large, No cream, No sugar, Iced",
    color1: "#FE8E01",
    color2: "#FF9A16",
    aspectRatio: 1,
  },
  {
    title: "Craving a Croissant?",
    subtitle: "Flaky perfection, baked fresh daily",
    color1: "#E2DDD1",
    color2: "#F3F1ED",
    aspectRatio: 757 / 735,
  },
];


function Temp() {

  const translateX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({contentOffset: {x}}) => {
      translateX.value = x;
    },
  });
  const style = useAnimatedStyle(() => {
    var x = products.map((_, i) => width * (i - 1))
    x.push(1440)
    var y = products.map((product,i) => products[i].color2)
    y.push(products[products.length - 1].color2)
    return {
    backgroundColor: interpolate(
      translateX.value,
      x,
      y
    ).slice(0,7),
  }}
)

  return (
    <Animated.View style={style}>
    <Animated.ScrollView
      onScroll={onScroll}
      scrollEventThrottle={16}
      horizontal
      snapToInterval={width}
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
    >
      <Animated.View style={{ flexDirection: "row"}}>
        {
          products.map((product,i) => (
            <View key={i} style={styles.product}>
              <View style={styles.main}>
                <Text style={styles.title}>{product.title}</Text>
                <Text style={styles.subtitle}>{product.subtitle}</Text>
                <View style={styles.imageContainer}>
                  <Image
                    style={styles.image}
                    source={{
                      uri: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/coldbrew.png"
                    }}
                  />
                </View>
                <Text style={{...styles.button, backgroundColor: product.color2}}>{product.color2}</Text>
              </View>
            </View>
          ))
        }
      </Animated.View>
    </Animated.ScrollView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  product: {
    width: width,
    padding: 30,
  },
  main: {
    backgroundColor: "#0ff",
    height: height - 150,
    borderRadius: 30,
    padding: 30,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image:{
    width: 150,
    height: 150,
  },
  button: {
    alignSelf: 'center',
    textAlign: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
  },
})

export default Temp
