import React from "react";
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Button,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";

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
];
var products = [
  {
    key: 1,
    title: "Iced Coffee Rosé",
    subtitle: "Medium, Creamy Cream, Sweet Sugar, Iced",
    color1: "#F9AC8A",
    color2: "#FBC6AE",
    aspectRatio: 1,
    image:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/coldbrew.png",
  },

  {
    key: 2,
    title: "Philharmonic",
    subtitle: "Large, Medium Cream, Medium Sugar",
    color1: "#4DD2A5",
    color2: "#63D8B0",
    aspectRatio: 1,
    image:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/philharmonic.png",
  },
  {
    key: 3,
    title: "New Cold Brew",
    subtitle: "Try Philtered Soul",
    color1: "#FEB829",
    color2: "#FDD446",
    aspectRatio: 1,
    image:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/rose.png",
  },
  {
    key: 4,
    title: "Ecstatic",
    subtitle: "Large, No cream, No sugar, Iced",
    color1: "#FE8E01",
    color2: "#FF9A16",
    aspectRatio: 1,
    image:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/coldbrew.png",
  },
  {
    key: 5,
    title: "Croissant",
    subtitle: "Flaky perfection, baked fresh daily",
    color1: "#E2DDD1",
    color2: "#F3F1ED",
    aspectRatio: 757 / 735,
    image:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/rose.png",
  },
  {
    key: 6,
    title: "Philharmonic",
    subtitle: "Large, Medium Cream, Medium Sugar",
    color1: "#4DD2A5",
    color2: "#63D8B0",
    aspectRatio: 1,
    image:
      "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/philharmonic.png",
  },
];
const extraProducts = [
  {
    key: 1,
    name: "Normal Coffee",
    description: "Charge your mood.",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
    rating:
      Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 2,
    name: "Hot coffee",
    description: "Warm yourself.",
    image:
      "https://images.unsplash.com/photo-1450024529642-858b23834369?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=563&q=80",
    rating:
      Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 3,
    name: "Espresso",
    description: "Spark yourself.",
    image:
      "https://images.unsplash.com/photo-1503481766315-7a586b20f66d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=735&q=80",
    rating:
      Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 4,
    name: "Deep brew",
    description: "A dark one.",
    image:
      "https://images.unsplash.com/photo-1504630083234-14187a9df0f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
    rating:
      Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 5,
    name: "Cold coffee",
    description: "Chill out a bit.",
    image:
      "https://images.unsplash.com/photo-1584286595398-a59f21d313f5?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=375&q=80",
    rating:
      Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 6,
    name: "Coffee 6",
    description: "SIxth delecious coffee.",
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60",
    rating:
      Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 7,
    name: "Coffee 7",
    description: "Seventh delecious coffee.",
    image:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
    rating:
      Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
  {
    key: 8,
    name: "Coffee 8",
    description: "Eighth delecious coffee.",
    image:
      "https://images.unsplash.com/photo-1578094586127-31233af3e4e1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDd8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60",
    rating:
      Math.floor(Math.random() * 5) + "." + Math.floor(Math.random() * 90),
    price: Math.floor(Math.random() * 100) + "$",
  },
];

function CoffeeShopHome({ navigation }) {
  const [currentTopTab, setCurrentTopTab] = React.useState(topTabs[0]);
  const [trigger, setTrigger] = React.useState(0);
  const cardScroll = React.useRef();

  const scrollX = React.useRef(new Animated.Value(0)).current;

  const scrolltoCardWithNumber = (cardNum) => {
    if (cardScroll.current) {
      cardScroll.current.scrollTo({ x: width * cardNum, y: 0, animated: true });
    }
  };

  const scrolltoNext = () => {
    var cur = Math.floor(scrollX._value / width);
    cur++;
    if (cur === products.length) {
      cur = 0;
    }
    scrolltoCardWithNumber(cur);
  };

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setTrigger((prev) => {
  //       return ++prev;
  //     });
  //     scrolltoNext();
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, [trigger]);

  return (
    <View style={[{ flex: 1, justifyContent: "center" }]}>
      <ScrollView showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
        <View
          style={{
            marginTop: 20,
            marginHorizontal: 15,
            borderRadius: 40,
            overflow: "hidden",
            borderWidth: 1,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {topTabs.map((tab, index) => {
              const isActive = currentTopTab === tab;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => setCurrentTopTab(tab)}
                >
                  <Text
                    style={{
                      ...styles.topTabButton,
                      backgroundColor: isActive ? "orange" : "lightgrey",
                      color: isActive ? "white" : "black",
                      borderWidth: isActive ? 1 : 0.5,
                      borderColor: isActive ? "black" : "grey",
                    }}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
        <Animated.ScrollView
          ref={cardScroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
        >
          {products.map((product, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const outputRange = [0.6, 1, 0.6];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-60, 0, 60],
              extrapolate: "clamp",
            });
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.navigate("CoffeeInfo", { product })}
              >
                <Animated.View
                  style={[
                    styles.coffeCard,
                    {
                      backgroundColor: product.color1,
                      transform: [{ translateX }],
                    },
                  ]}
                >
                  <SharedElement id={`product.${product.key}.title`}>
                    <Text style={styles.title}>{product.title}</Text>
                  </SharedElement>
                  <SharedElement id={`product.${product.key}.image`}>
                    <Image
                      source={{ uri: product.image }}
                      style={styles.image}
                    />
                  </SharedElement>
                  <SharedElement id={`product.${product.key}.subtitle`}>
                    <Text style={styles.subtitle}>{product.subtitle}</Text>
                  </SharedElement>
                </Animated.View>
              </TouchableWithoutFeedback>
            );
          })}
        </Animated.ScrollView>
        <Indicator scrollX={scrollX} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {extraProducts.map((product, index) => {
            return (
              <View key={index} style={styles.eProduct}>
                <View style={styles.eProductImageCont}>
                  <Image
                    source={{ uri: product.image }}
                    style={{ flex: 1, borderRadius: 30 }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.eProductname}>{product.name}</Text>
                  <Text style={styles.eProductdesc}>{product.description}</Text>
                </View>
                <View>
                  <Text style={styles.eProductprice}>{product.price}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={styles.eProductrating}>{product.rating}</Text>
                    <Text style={{ ...styles.eProductrating, color: "gold" }}>
                      {" 🌟"}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </ScrollView>
      <Background scrollX={scrollX} />
    </View>
  );
}

const Indicator = ({ scrollX }) => {
  return (
    <View
      style={{ flexDirection: "row", width: width, justifyContent: "center" }}
    >
      {products.map((_, i) => {
        const scale = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0.7, 2, 0.7],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange: [(i - 1) * width, i * width, (i + 1) * width],
          outputRange: [0.6, 1, 0.6],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={i}
            style={{
              height: 8,
              width: 10,
              borderRadius: 3,
              backgroundColor: "black",
              margin: 10,
              opacity,
              transform: [{ scaleX: scale }],
            }}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const Background = ({ scrollX }) => {
  const backgroundColor = scrollX.interpolate({
    inputRange: products.map((_, i) => i * width),
    outputRange: products.map((pro) => pro.color2),
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        {
          zIndex: -2,
          backgroundColor,
        },
      ]}
    ></Animated.View>
  );
};

const styles = StyleSheet.create({
  topTabButton: {
    padding: 10,
    paddingVertical: 6,
    margin: 10,
    borderRadius: 20,
    fontSize: 15,
    fontWeight: "700",
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
    borderWidth: 1,
    borderColor: "white",
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
    width: 160,
    height: 160,
    marginVertical: 20,
    resizeMode: "contain",
  },
  eProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: EXTRA_PRODUCT_HEIGHT,
    margin: 10,
    backgroundColor: "#ddff2266",
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "green",
  },
  eProductImageCont: {
    height: EXTRA_PRODUCT_HEIGHT - 20,
    width: EXTRA_PRODUCT_HEIGHT - 20,
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
});

export default CoffeeShopHome;
