import React from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../Theme";

export default function Workout(props) {
  return (
    <TouchableOpacity style={styles.body}>
      <Image source={{ uri: props.image }} style={styles.image} />
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.workoutTime}>{props.workoutTime}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: 4,
    marginRight: 12,
    width: 110,
    flex: 1,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 8,
    alignSelf: "center",
  },
  title: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 12,
    color: theme.colors.text,
  },
  workoutTime: {
    fontSize: 10,
    color: theme.colors.placeholder,
    marginTop: "auto",
  },
});
