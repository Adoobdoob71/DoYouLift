import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";
import BounceButton from "../components/BounceButton";

export default class WorkoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <View style={styles.StepsView}></View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  StepsView: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
