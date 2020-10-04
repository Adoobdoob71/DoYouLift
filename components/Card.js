import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ProgressBar } from "react-native-paper";
import { theme } from "../Theme";
import BounceButton from "./BounceButton";

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.row,
          { justifyContent: "space-between", marginBottom: 4 },
        ]}>
        <Text style={styles.attribute}>{props.name}</Text>
        <BounceButton icon="add" iconButton={true} />
      </View>
      <View style={styles.row}>
        <Text style={styles.progressText}>{props.progress * 100}%</Text>
        {/* <ProgressBar
          progress={props.progress}
          color={theme.colors.primary}
          style={styles.progressBar}
        /> */}
        <View
          style={{
            flex: 1,
            backgroundColor: theme.colors.accent,
            height: 4,
            marginHorizontal: 12,
          }}>
          <View
            style={{
              width: `${props.progress * 100}%`,
              backgroundColor: theme.colors.primary,
              flex: 1,
            }}></View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    justifyContent: "space-between",
    marginBottom: 16,
  },
  attribute: {
    fontSize: 14,
    color: theme.colors.text,
  },
  progressBar: {
    marginHorizontal: 12,
    maxWidth: "85%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
    color: theme.colors.text,
  },
});
