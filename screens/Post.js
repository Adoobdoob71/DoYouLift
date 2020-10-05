import React from "react";
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { theme } from "../Theme";
import * as firebase from "firebase";
import { IconButton } from "react-native-paper";
import Comment from "../components/Comment";
import { LinearGradient } from "expo-linear-gradient";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      data: [],
    };
    this.Item = props.route.params.Item;
  }

  componentDidMount() {
    this.db = firebase.firestore().collection("posts").doc(this.Item.id);
    this.db
      .collection("comments")
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          this.setState({ data: [...this.state.data, item.data()] });
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <FlatList
          ListHeaderComponent={() => (
            <LinearGradient
              style={styles.header}
              start={[1, 1]}
              end={[0, 1]}
              colors={[theme.colors.accent, theme.colors.primary]}>
              <IconButton
                icon="arrow-left"
                onPress={() => this.props.navigation.pop()}
                color={theme.colors.textOnPrimary}
              />
              <View style={{ marginLeft: 8 }}>
                <Text style={styles.title}>{this.Item.title}</Text>
                <View style={styles.userBox}>
                  <Image
                    source={{ uri: this.Item.profileImage }}
                    style={styles.profileImage}
                  />
                  <Text style={styles.username}>{this.Item.username}</Text>
                </View>
              </View>
              <IconButton
                icon="plus"
                onPress={() =>
                  this.props.navigation.navigate("AddComment", {
                    Item: this.Item,
                  })
                }
                color={theme.colors.textOnPrimary}
                style={{ marginLeft: "auto" }}
              />
            </LinearGradient>
          )}
          data={this.state.data}
          renderItem={({ item }) => <Comment Item={item} />}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  header: {
    paddingVertical: 4,
    flexDirection: "row",
  },
  title: {
    fontSize: 14,
    color: theme.colors.textOnPrimary,
    fontWeight: "bold",
  },
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  profileImage: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  username: {
    fontSize: 12,
    color: theme.colors.textOnPrimary,
  },
});
