import React from "react";
import { Text, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../Theme";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function BounceButton(props) {
  const colors = theme.colors;
  return (
    <TouchableOpacity
      onPress={() => (props.onPress === undefined ? {} : props.onPress())}
      disabled={props.disabled}>
      <LinearGradient
        style={styles.background}
        colors={[colors.accent, colors.primary]}
        start={[1, 1]}
        end={[0, 1]}>
        <MaterialIcons
          name={props.icon}
          color={colors.textOnPrimary}
          size={props.size ? props.size : 18}
        />
        {!props.iconButton && <Text style={styles.text}>{props.text}</Text>}
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  background: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: theme.colors.textOnPrimary,
    marginLeft: 8,
  },
});
