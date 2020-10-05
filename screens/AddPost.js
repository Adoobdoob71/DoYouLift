import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { IconButton, ProgressBar, Snackbar } from "react-native-paper";
import { theme } from "../Theme";
import * as ImagePicker from "expo-image-picker";
import * as firebase from "firebase";
import BounceButton from "../components/BounceButton";

export default class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      image: { uri: null, blob: null },
      progress: 0,
      loading: false,
      error: null,
    };
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      const res = await fetch(result.uri);
      const blob = await res.blob();
      this.setState({ image: { uri: result.uri, blob: blob } });
    }
  };

  submitPost = async () => {
    this.setState({ loading: true });
    try {
      this.db = firebase.firestore().collection("posts");
      let docRef = await this.db.add({
        userUID: firebase.auth().currentUser.uid,
        title: this.state.title,
        body: this.state.body,
      });
      this.storageRef = firebase.storage().ref("images").child(this.db.id);
      let uploadTask = this.storageRef.put(this.state.image.blob);
      uploadTask.on("state_changed", (snapshot) => {
        this.setState({
          progress: snapshot.bytesTransferred / snapshot.totalBytes,
        });
      });
      uploadTask.then(() => {
        this.storageRef.getDownloadURL().then((url) => {
          this.db
            .doc(docRef.id)
            .update({
              image: url,
            })
            .then(() => this.props.navigation.pop());
        });
      });
    } catch (error) {
      this.setState({ error: error, loading: false });
    }
  };

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="attachment"
            disabled={this.state.loading}
            color={theme.colors.text}
            onPress={() => this.pickImage()}
          />
          <IconButton
            icon="send"
            disabled={
              this.state.loading ||
              this.state.body.trim().length == 0 ||
              this.state.title.trim().length == 0 ||
              this.state.image.blob === null
            }
            color={theme.colors.primary}
            onPress={() => this.submitPost()}
          />
        </View>
      ),
    });
    return (
      <>
        <SafeAreaView style={styles.body}>
          <ProgressBar
            progress={this.state.progress}
            style={{ width: "100%" }}
            visible={this.state.loading}
          />
          <View style={{ padding: 12, flex: 1 }}>
            <TextInput
              value={this.state.title}
              onChangeText={(value) => this.setState({ title: value })}
              autoCapitalize="sentences"
              style={styles.title}
              placeholderTextColor={theme.colors.placeholder}
              placeholder="Title"
            />
            <TextInput
              value={this.state.body}
              onChangeText={(value) => this.setState({ body: value })}
              autoCapitalize="sentences"
              style={styles.bodyText}
              placeholder="Body"
              placeholderTextColor={theme.colors.placeholder}
              multiline={true}
            />
          </View>
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
  },
  title: {
    padding: 6,
    color: theme.colors.text,
    fontSize: 14,
  },
  bodyText: {
    flex: 1,
    padding: 6,
    marginTop: 12,
    color: theme.colors.text,
    fontSize: 14,
    textAlignVertical: "top",
  },
});
