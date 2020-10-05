import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "react-native-paper";
import { LightTheme, theme } from "../Theme";
import BounceButton from "./BounceButton";
import * as firebase from "firebase";

export default class FitnessCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      userDetails: null,
    };
    this.Item = this.props.Item;
  }

  componentDidMount() {
    this.db = firebase.firestore().collection("users").doc(this.Item.userUID);
    this.db
      .get()
      .then((snapshot) => this.setState({ userDetails: snapshot.data() }));
  }

  render() {
    if (this.state.userDetails)
      return (
        <View style={styles.card}>
          <Image
            source={{
              uri: this.Item.image,
            }}
            style={styles.image}
          />
          <View style={styles.readMoreButton}>
            <BounceButton
              icon="chevron-right"
              iconButton={true}
              onPress={() =>
                this.props.navigation.navigate("Post", {
                  Item: {
                    ...this.Item,
                    profileImage: this.state.userDetails.profileImage,
                    username: this.state.userDetails.username,
                    email: this.state.userDetails.email,
                  },
                })
              }
            />
          </View>
          <View style={styles.textBox}>
            <Text style={styles.caption}>{this.Item.title}</Text>
            <Text style={styles.body}>{this.Item.body}</Text>
            <View style={styles.footer}>
              <View style={styles.userBox}>
                <Image
                  style={styles.profileImage}
                  source={{
                    uri: this.state.userDetails.profileImage,
                  }}
                />
                <Text style={styles.username}>
                  {this.state.userDetails.username}
                </Text>
              </View>
              <IconButton
                icon={this.state.liked ? "heart" : "heart-outline"}
                onPress={() => this.setState({ liked: !this.state.liked })}
                color={theme.colors.primary}
              />
            </View>
          </View>
        </View>
      );
    else return null;
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: theme.colors.primary,
    marginBottom: 16,
    marginHorizontal: 24,
  },
  image: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 8,
  },
  textBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    padding: 8,
  },
  caption: {
    fontSize: 21,
    fontWeight: "bold",
    marginHorizontal: 8,
    color: theme.colors.text,
  },
  body: {
    fontSize: 10,
    color: "#757575",
    paddingHorizontal: 8,
    marginVertical: 8,
    color: theme.colors.text,
  },
  profileImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    justifyContent: "space-between",
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    fontSize: 12,
    color: theme.colors.text,
  },
  readMoreButton: {
    position: "absolute",
    right: 8,
    top: 8,
  },
});
