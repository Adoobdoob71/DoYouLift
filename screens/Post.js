import React from "react";
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native";
import { FlatList } from "react-native-gesture-handler";

export default class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
    this.Item = props.route.params.Item;
  }

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <FlatList
          ListHeaderComponent={() => (
            <View style={styles.header}>
              <Text>{this.Item.title}</Text>
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
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
});
