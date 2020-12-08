import React from 'react'
import { StyleSheet, Text, View } from 'react-native';

function TaskListHome() {
  return (
    <View style={styles.TaskListHome}>
      <Text>
        Hi from TaskListHome
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  TaskListHome: {
    flex: 1,
    backgroundColor: "white",
  }
})

export default TaskListHome
