import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import * as firebase from "firebase";
import { theme } from "../Theme";
import { TouchableOpacity } from "react-native-gesture-handler";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: null,
      loading: true,
    };
    this.Item = props.Item;
  }

  componentDidMount() {
    this.db = firebase.firestore().collection("users").doc(this.Item.userUID);
    this.db.get().then((snapshot) => {
      this.setState({ userDetails: snapshot.data(), loading: false });
    });
  }

  render() {
    if (!this.state.loading)
      return (
        <View style={styles.body}>
          <TouchableOpacity style={styles.userBox}>
            <Image
              source={{ uri: this.state.userDetails.profileImage }}
              style={styles.profileImage}
            />
            <Text style={styles.username}>
              {this.state.userDetails.username}
            </Text>
          </TouchableOpacity>
          <Text style={styles.bodyText}>{this.Item.text}</Text>
        </View>
      );
    else return null;
  }
}

const styles = StyleSheet.create({
  body: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  bodyText: {
    fontSize: 12,
    color: theme.colors.text,
    marginLeft: 32,
  },
  username: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: "bold",
  },
});
