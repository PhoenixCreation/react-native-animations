import React from 'react'
import { Animated, ScrollView , Dimensions, StyleSheet, Text, View , Image} from 'react-native';
import { PanGestureHandler } from "react-native-gesture-handler";

var { width, height } = Dimensions.get("window");
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

var products = [
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

  {
    title: "Excited for an Ecstatic?",
    subtitle: "Large, No cream, No sugar, Iced",
    color1: "#FE8E01",
    color2: "#FF9A16",
    aspectRatio: 1,
  },

  {
    title: "Excited for an Ecstatic?",
    subtitle: "Large, No cream, No sugar, Iced",
    color1: "#FE8E01",
    color2: "#FF9A16",
    aspectRatio: 1,
  },
];
const CARD_HEIGHT = 200

const Card = ({ product, index, y}) => {
  const position = Animated.subtract(index * CARD_HEIGHT, y);
  const isDisappearing = -CARD_HEIGHT;
  const isTop = 0;
  const isBottom = height - CARD_HEIGHT;
  const isAppearing = height;
  const scale = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0.5, 1, 1, 0.5],
    extrapolate: "clamp",
  });
  const opacity = position.interpolate({
    inputRange: [isDisappearing, isTop, isBottom, isAppearing],
    outputRange: [0, 1, 1, 0],
  });

  const translateY = Animated.add(
    Animated.add(
      y,
      y.interpolate({
        inputRange: [0, 0.00001 + index * CARD_HEIGHT],
        outputRange: [0, -index * CARD_HEIGHT],
        extrapolateRight: "clamp",
      })
    ),
    position.interpolate({
      inputRange: [isBottom, isAppearing],
      outputRange: [0, -CARD_HEIGHT / 4],
      extrapolate: "clamp",
    })
  );
  return (
    <Animated.View
      key={index}
      style={[{...styles.card, backgroundColor: product.color2}, { transform: [ {translateY }]}]}
    >
      <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: "bold"}}>{product.title}</Text>
      <Image
        style={{width: 100, height: 100, alignSelf: 'center'}}
        source={{
          uri: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/coldbrew.png"
        }}
      />
    </Animated.View>
  );
}


function Cards() {

  const y = new Animated.Value(0)
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y }}}],{ useNativeDriver: true })


  return (
    <AnimatedScrollView
    showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      {...{onScroll}}
    >
    <View style={styles.container}>
    {
      products.map((product,i) => (
        <Card product={product} index={i} y={y} />
      ))
    }
    </View>
    </AnimatedScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: CARD_HEIGHT,
    margin: 15,
    backgroundColor: "red",
    borderRadius: 25,
    padding: 15,
  }
})

export default Cards
