import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../Theme";

export default class LeadersCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
    };
    this.Item = this.props.Item;
  }

  render() {
    const styles = StyleSheet.create({
      body: {
        flexDirection: "row",
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: "center",
        flex: 1,
      },
      image: {
        width: 40,
        height: 40,
        borderRadius: 20,
      },
      textBox: {
        flexDirection: "column",
        flex: 1,
        marginLeft: 12,
      },
      username: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: this.props.leader ? "#ffffff" : theme.colors.text,
      },
      dailySteps: {
        fontSize: 12,
        color: this.props.leader ? "#ffffff" : theme.colors.text,
      },
    });
    return (
      <View style={styles.body}>
        <Image source={{ uri: this.Item.profileImage }} style={styles.image} />
        <View style={styles.textBox}>
          <Text style={styles.username}>
            {this.Item.index}. {this.Item.username}
          </Text>
          <Text style={styles.dailySteps}>{this.Item.dailySteps} steps</Text>
        </View>
      </View>
    );
  }
}
