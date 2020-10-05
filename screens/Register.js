import React from "react";
import { IconButton, ProgressBar, Snackbar } from "react-native-paper";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { theme } from "../Theme";
import { TextInput } from "react-native-gesture-handler";
import BounceButton from "../components/BounceButton";
import * as firebase from "firebase";

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
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

  register = async () => {
    this.setState({ loading: true });
    if (this.state.username.trim().length == 0) return;
    else
      try {
        let user = await (
          await firebase
            .auth()
            .createUserWithEmailAndPassword(
              this.state.email,
              this.state.password
            )
        ).user;
        let docRef = await firebase
          .firestore()
          .collection("users")
          .doc(user.uid);
        docRef.set({
          username: this.state.username.trim(),
          email: this.state.email,
          dailySteps: 0,
        });
        let storageRef = firebase.storage().ref("users").child(user.uid);
        let uploadTask = storageRef.put(this.state.image.blob);
        uploadTask.on("state_changed", (snapshot) => {
          this.setState({
            progress: snapshot.bytesTransferred / snapshot.totalBytes,
          });
        });
        uploadTask.then(() => {
          storageRef.getDownloadURL().then((url) => {
            docRef
              .update({
                profileImage: url,
              })
              .then(() => this.props.navigation.pop());
          });
        });
      } catch (error) {
        this.setState({ error: error, loading: false });
      }
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.body}>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <ProgressBar
              progress={this.state.progress}
              color={theme.colors.primary}
              style={{ width: "100%", marginBottom: 12 }}
              visible={this.state.loading}
            />
            <View style={{ paddingVertical: 24, paddingHorizontal: 56 }}>
              <View style={styles.imagePickView}>
                <Image
                  source={this.state.image.uri && { uri: this.state.image.uri }}
                  style={styles.image}
                />
                <IconButton
                  icon="camera"
                  color={theme.colors.primary}
                  onPress={() => this.pickImage()}
                />
              </View>
              <View style={styles.textInput}>
                <TextInput
                  value={this.state.email}
                  onChangeText={(value) => this.setState({ email: value })}
                  style={{ flex: 1, color: theme.colors.text }}
                  placeholder="Email"
                  placeholderTextColor={theme.colors.placeholder}
                  clearButtonMode="while-editing"
                  returnKeyType="next"
                  keyboardType="email-address"
                />
              </View>
              <View style={styles.textInput}>
                <TextInput
                  value={this.state.username}
                  onChangeText={(value) => this.setState({ username: value })}
                  style={{ flex: 1, color: theme.colors.text }}
                  placeholderTextColor={theme.colors.placeholder}
                  clearButtonMode="while-editing"
                  placeholder="Username"
                  returnKeyType="next"
                />
              </View>
              <View style={styles.textInput}>
                <TextInput
                  value={this.state.password}
                  onChangeText={(value) => this.setState({ password: value })}
                  style={{ flex: 1, color: theme.colors.text }}
                  placeholder="Password"
                  secureTextEntry={true}
                  clearButtonMode="while-editing"
                  returnKeyType="done"
                  placeholderTextColor={theme.colors.placeholder}
                />
              </View>
              <View style={{ alignSelf: "flex-end", marginTop: 24 }}>
                <BounceButton
                  icon="chevron-right"
                  IconButton={false}
                  text="Submit"
                  onPress={() => this.register()}
                />
              </View>
            </View>
          </ScrollView>
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
  imagePickView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  image: {
    width: 82,
    height: 82,
    borderRadius: 41,
    marginRight: 16,
    backgroundColor: theme.colors.backdrop,
  },
  textInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    width: "100%",
    marginVertical: 12,
  },
});
