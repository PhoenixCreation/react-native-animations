import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate
} from "react-native-reanimated";
import { interpolateColor, ColorSpace } from "react-native-redash";

const { width, height } = Dimensions.get("window");
const CARD_MARGIN = 20;
const EXTRA_PRODUCT_HEIGHT = 80;

const topTabs = [
  "Special",
  "Today's",
  "Coffees",
  "Espresso",
  "Latté",
  "Hot chocolate",
  "Milkshkes",
]
const products = [
  {
    key: 1,
    title: "How about an Iced Coffee Rosé?",
    subtitle: "Medium, Creamy Cream, Sweet Sugar, Iced",
    color1: "#F9AC8A",
    color2: "#FBC6AE",
    aspectRatio: 1,
    image: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/coldbrew.png",
  },

  {
    key: 2,
    title: "Craving a Philharmonic?",
    subtitle: "Large, Medium Cream, Medium Sugar",
    color1: "#4DD2A5",
    color2: "#63D8B0",
    aspectRatio: 1,
    image: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/philharmonic.png",
  },
  {
    key: 3,
    title: "Craving a new Cold Brew?",
    subtitle: "Try Philtered Soul",
    color1: "#FEB829",
    color2: "#FDD446",
    aspectRatio: 1,
    image: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/rose.png",
  },
  {
    key: 4,
    title: "Excited for an Ecstatic?",
    subtitle: "Large, No cream, No sugar, Iced",
    color1: "#FE8E01",
    color2: "#FF9A16",
    aspectRatio: 1,
    image: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/coldbrew.png",
  },
  {
    key: 5,
    title: "Craving a Croissant?",
    subtitle: "Flaky perfection, baked fresh daily",
    color1: "#E2DDD1",
    color2: "#F3F1ED",
    aspectRatio: 757 / 735,
    image: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/rose.png",
  },
];
const extraProducts = [
  {
    key: 1,
    name: "Coffee 1",
    description: "One delecious coffee.",
    image: "https://picsum.photos/200",
    rating: Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 2,
    name: "Coffee 2",
    description: "Second delecious coffee.",
    image: "https://picsum.photos/200",
    rating: Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 3,
    name: "Coffee 3",
    description: "Three delecious coffee.",
    image: "https://picsum.photos/200",
    rating: Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 4,
    name: "Coffee 4",
    description: "Fourth delecious coffee.",
    image: "https://picsum.photos/200",
    rating: Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 5,
    name: "Coffee 5",
    description: "Fifth delecious coffee.",
    image: "https://picsum.photos/200",
    rating: Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 6,
    name: "Coffee 6",
    description: "SIxth delecious coffee.",
    image: "https://picsum.photos/200",
    rating: Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 7,
    name: "Coffee 7",
    description: "Seventh delecious coffee.",
    image: "https://picsum.photos/200",
    rating: Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 8,
    name: "Coffee 8",
    description: "Eighth delecious coffee.",
    image: "https://picsum.photos/200",
    rating: Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
]


function Temp() {
  const [currentTopTab, setCurrentTopTab] = React.useState(topTabs[0])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 15,
          borderRadius: 40,
          overflow: "hidden",
          borderWidth: 0.4,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}

        >
        {
          topTabs.map((tab,index) => {
            const isActive = currentTopTab === tab;
            return (
              <TouchableOpacity key={index} onPress={() => setCurrentTopTab(tab)}>
                <Text style={{
                   ...styles.topTabButton,
                   backgroundColor: isActive ? "orange" : "lightgrey",
                   color: isActive ? "white" : "black",
                   borderWidth: isActive ? 0.8 : 0
                 }}>{tab}</Text>
              </TouchableOpacity>
            );
          })
        }
        </ScrollView>
      </View>
      <ScrollView
        horizontal
        snapToInterval={width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
      >
        {
          products.map((product,index) => {
            return (
              <TouchableWithoutFeedback key={index}>
                <View style={{ ...styles.coffeCard,backgroundColor: product.color1}}>
                  <Text style={ styles.title }>{product.title}</Text>
                  <Image
                    source={{ uri: product.image }}
                    style={ styles.image }
                  />
                  <Text style={ styles.subtitle }>{product.subtitle}</Text>
                </View>
              </TouchableWithoutFeedback>
            );
          })
        }
      </ScrollView>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {
          extraProducts.map((product,index) => {
            return (
              <View key={index} style={styles.eProduct}>
                <View style={styles.eProductImageCont}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ flex: 1, borderRadius: 30 }}
                  />
                </View>
                <View style={{ flex: 1}}>
                  <Text style={styles.eProductname}>{product.name}</Text>
                  <Text style={styles.eProductdesc}>{product.description}</Text>
                </View>
                <View>
                  <Text style={styles.eProductprice}>{product.price}</Text>
                  <View style={{ flexDirection: "row"}}>
                    <Text style={styles.eProductrating}>{product.rating}</Text>
                    <Text style={{...styles.eProductrating, color: "gold"}}>{" 🌟"}</Text>
                  </View>
                </View>
              </View>
            );
          })
        }
      </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  topTabButton: {
    padding: 10,
    paddingVertical: 6,
    margin: 10,
    borderRadius: 20,
    fontSize: 15,
    fontWeight: "700"
  },
  coffeCard: {
    width: width - CARD_MARGIN * 4,
    // height: height * 0.55,
    alignItems: "center",
    justifyContent: "center",
    margin: CARD_MARGIN,
    marginHorizontal: CARD_MARGIN * 2,
    borderRadius: 55,
    padding: CARD_MARGIN,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: CARD_MARGIN,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    opacity: 0.7,
    marginTop: CARD_MARGIN,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: "contain"
  },
  eProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: EXTRA_PRODUCT_HEIGHT,
    margin: 10,
    backgroundColor: "#ffff0066",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "green"
  },
  eProductImageCont: {
    height: EXTRA_PRODUCT_HEIGHT - 20,
    width: EXTRA_PRODUCT_HEIGHT -20,
    marginRight: 5,
  },
  eProductname: {
    fontWeight: "bold",
    fontSize: 17,
  },
  eProductdesc: {
    opacity: 0.7,
  },
  eProductprice: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  eProductrating: {},
})

export default Temp
