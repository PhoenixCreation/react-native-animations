import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native';

function Info() {
  return (
    <ScrollView style={styles.container}>
      <View style={ styles.header}>
        <Text style={ styles.disclaimer}>Disclaimer</Text>
        <Text style={ styles.dtext}>
          I(Phoenix or Het Patel) hearby declare that I do not own any type of images, text styling or font
          used/shown in this app. If you have any problem or objection with any content then uninstall this App.
          If that's not enough then contact me. I'll remove those parts.
        </Text>
      </View>
      <View style={ styles.header}>
        <Text style={styles.disclaimer}>Main Highlights</Text>
        <Text style={styles.tips}>
          1. CoffeeShop
        </Text>
        <Text style={styles.tips}>
          2. Vehical
        </Text>
        <Text style={styles.tips}>
          3. Login
        </Text>
        <Text style={styles.tips}>
          4. Snapchat
        </Text>
        <Text style={{...styles.tips, borderBottomWidth: 0}}>
          5. Cards
        </Text>
      </View>
      <View style={ styles.header}>
        <Text style={styles.disclaimer}>-: Tips :-</Text>
        <Text style={ styles.tips}>
          1. First of all about images, they are hosted somewhere and are loaded synchronically(after the screen is loaded).
          So sometime it may happen that you just see some big blank spaces so wait for sometime. This happens if you have
          poor connection like the developer of this app.
        </Text>
        <Text style={styles.tips}>
          2. Some animations are not completed. because the developer is too low iq-ed to finish them. So sorry for that.
        </Text>
        <Text style={styles.tips}>
          3. All the names are hypothetical and does not mean to hurt anyone.
        </Text>

        <Text style={styles.tips}>
          4. If you found any problem then do whatever you can do. You can DM me if you just want me to know.
        </Text>
        <Text style={{ ...styles.tips, borderBottomWidth: 0}}>
          5. And be patients for future release.
        </Text>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
  },
  disclaimer: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  dtext: {
    textAlign: "justify",
    fontSize: 16,
  },
  tips: {
    fontSize: 16,
    textAlign: "justify",
    paddingVertical: 10,
    borderBottomWidth: 1,
  }

})

export default Info
