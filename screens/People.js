import React from "react";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BounceButton from "../components/BounceButton";
import FitnessCard from "../components/FitnessCard";
import * as firebase from "firebase";
import { theme } from "../Theme";

export default class People extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.db = firebase.firestore().collection("posts");
    this.db
      .limit(10)
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) =>
          this.setState({
            data: [...this.state.data, { ...item.data(), id: item.id }],
          })
        );
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <FlatList
          data={this.state.data}
          style={styles.flatList}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FitnessCard Item={item} navigation={this.props.navigation} />
          )}
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text style={styles.textTitle}>
                Let's see what people are up to today!
              </Text>
              <BounceButton
                icon="add"
                iconButton={true}
                onPress={() => this.props.navigation.navigate("AddPost")}
              />
            </View>
          )}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: theme.colors.text,
  },
  textTitle: {
    fontSize: 12,
    color: theme.colors.text,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: theme.colors.surface,
    padding: 8,
    marginBottom: 8,
  },
  flatList: {
    flex: 1,
  },
});
