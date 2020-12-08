import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SharedElement } from "react-navigation-shared-element";
import * as Animatable from 'react-native-animatable';

const titleAnimation = {
  0: {opacity: 0, translateX: 75},
  1: {opacity: 1, translateX: 0},
}
const subtitleAnimation = {
  0: {opacity: 0, translateX: 60},
  1: {opacity: 1, translateX: 0},
}
const subImage1Animation = {
  0: {opacity: 0, translateX: 60 ,translateY: -110 },
  1: {opacity: 1, translateX: 0 ,translateY: 0 },
}
const subImage2Animation = {
  0: {opacity: 0,translateY: -110 },
  1: {opacity: 1,translateY: 0 },
}
const subImage3Animation = {
  0: {opacity: 0, translateX: -60 ,translateY: -110 },
  1: {opacity: 1, translateX: 0 ,translateY: 0 },
}
const priceAnimation = {
  0: {opacity: 0, translateX: 40},
  1: {opacity: 1, translateX: 0},
}
const opacityChanger = {
  0: { opacity: 0},
  1: { opacity: 1},
}
const like = {
  0: { translateY: 0, scaleX: 1},
  0.5: { translateY: -50, scaleX: 0.1},
  1: { translateY: 0, scaleX: 1}
}
// product = {
//
//   key: 1,
//   title: "How about an Iced Coffee Rosé?",
//   subtitle: "Medium, Creamy Cream, Sweet Sugar, Iced",
//   color1: "#F9AC8A",
//   color2: "#FBC6AE",
//   aspectRatio: 1,
//   image: "https://raw.githubusercontent.com/wcandillon/can-it-be-done-in-react-native/master/season4/src/PhilzCoffee/assets/coldbrew.png",
//
// }

function CoffeeInfo({ navigation, route }) {
  const { product } = route.params

  const likeText = React.useRef()

  return (
    <View style={{...styles.container, backgroundColor: product.color2}}>
      <View style={styles.header}>
        <SharedElement id={`product.${product.key}.title`}>
          <Animatable.Text useNativeDriver animation={titleAnimation} duration={500} delay={200} style={ styles.title }>{product.title}</Animatable.Text>
        </SharedElement>
        <SharedElement id={`product.${product.key}.subtitle`}>
          <Animatable.Text useNativeDriver animation={subtitleAnimation} duration={500} delay={500} style={ styles.subtitle }>{product.subtitle}</Animatable.Text>
        </SharedElement>
      </View>
      <View style={styles.imageContainer}>
        <SharedElement id={`product.${product.key}.image`} style={{ width: "65%", height: "65%", alignItems: "center", justifyContent: "center"}}>
          <Image
            source={{ uri: product.image }}
            style={styles.mainImage}
          />
        </SharedElement>
        <View style={styles.subImageContainer}>
          <Animatable.Image
            useNativeDriver
            animation={subImage1Animation}
            duration={700}
            delay={600}
            source={{ uri: product.image }}
            style={[styles.subImage, styles.subImage1]}
          />
          <Animatable.Image
            useNativeDriver
            animation={subImage2Animation}
            duration={700}
            delay={600}
            source={{ uri: product.image }}
            style={[styles.subImage, styles.subImage2]}
          />
          <Animatable.Image
            useNativeDriver
            animation={subImage3Animation}
            duration={700}
            delay={600}
            source={{ uri: product.image }}
            style={[styles.subImage, styles.subImage3]}
          />
        </View>
      </View>
      <View style={styles.priceContainer}>
        <Animatable.Text
          useNativeDriver
          animation={priceAnimation}
          duration={300}
          delay={1100}
          style={styles.price}
        >
          $ 5.99
        </Animatable.Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Animatable.Text
          useNativeDriver
          animation={opacityChanger}
          duration={300}
          delay={1300}
          style={styles.description}
          numberOfLines={3}
        >
          Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.
        </Animatable.Text>
      </View>
      <Animatable.View
        useNativeDriver
        animation={opacityChanger}
        duration={300}
        delay={1500}
        style={styles.buttonContainer}
      >
        <TouchableOpacity onPress={() => {likeText.current.animate(like)}} style={styles.likeButton}>
          <Animatable.Text ref={likeText} style={styles.likeButtonText}>♡</Animatable.Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Add to cart</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 20,
  },
  header: {
    marginTop: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  imageContainer: {
    flexDirection: "column",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mainImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  subImageContainer: {
    height: "20%",
    width: "100%",
    flexDirection: "row",
  },
  subImage: {
    flex: 1,
    width: "80%",
    height: "80%",
    resizeMode: "contain",
  },
  subImage1: {
    alignSelf: "flex-start"
  },
  subImage2: {
    alignSelf: "flex-end"
  },
  subImage3: {
    alignSelf: "flex-start"
  },
  priceContainer: {
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold"
  },
  descriptionContainer: {
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "justify",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  likeButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  likeButtonText: {
    fontSize: 23,
    color: "white",
  },
  buyButton: {
    flex: 1,
    width: "100%",
    height: 50,
    borderRadius: 25,
    backgroundColor: "orange",
    justifyContent: "center",
    alignItems: "center",
  },
  buyButtonText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white"
  },
})

CoffeeInfo.sharedElements = (route, otherroute, showing) => {
  const { product } = route.params
  return [
    // {
    //   id: `product.${product.key}.title`
    // },
    // {
    //   id: `product.${product.key}.subtitle`
    // },
    {
      id: `product.${product.key}.image`
    },
  ];
}

export default CoffeeInfo
