import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { IconButton, Snackbar } from "react-native-paper";
import { theme } from "../Theme";
import * as firebase from "firebase";

export default class AddComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      text: "",
      error: null,
    };
    this.Item = props.route.params.Item;
  }

  submitComment = () => {
    this.setState({ loading: true });
    firebase
      .firestore()
      .collection("posts")
      .doc(this.Item.id)
      .collection("comments")
      .add({
        userUID: firebase.auth().currentUser.uid,
        text: this.state.text.trim(),
      })
      .then(() => this.props.navigation.pop())
      .catch((error) => this.setState({ error: error, loading: false }));
  };

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <IconButton
            icon="send"
            color={theme.colors.primary}
            onPress={() => this.submitComment()}
            disabled={this.state.loading || this.state.text.trim().length == 0}
          />
        </View>
      ),
    });
    return (
      <>
        <SafeAreaView style={styles.body}>
          <TextInput
            value={this.state.text}
            onChangeText={(value) => this.setState({ text: value })}
            placeholder="Say something..."
            multiline={true}
            autoCapitalize="sentences"
            style={styles.textInput}
            placeholderTextColor={theme.colors.placeholder}
          />
        </SafeAreaView>
        <Snackbar
          visible={this.state.error}
          onDismiss={() => this.setState({ error: null })}
          action={{
            label: "DISMISS",
            onPress: () => this.setState({ error: null }),
          }}>
          {this.state.error ? this.state.error.message : ""}
        </Snackbar>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 12,
  },
  textInput: {
    flex: 1,
    color: theme.colors.text,
    textAlignVertical: "top",
  },
});
