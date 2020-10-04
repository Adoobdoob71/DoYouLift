import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import BounceButton from "../components/BounceButton";
import { theme } from "../Theme";
import * as firebase from "firebase";
import { Snackbar } from "react-native-paper";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: null,
    };
  }

  authenticate = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.pop())
      .catch((error) => this.setState({ error: error }));
  };

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 8, alignSelf: "center" }}>
          <BounceButton
            icon="chevron-right"
            iconButton={true}
            onPress={() => this.props.navigation.navigate("Register")}
          />
        </View>
      ),
    });
    return (
      <>
        <SafeAreaView style={styles.body}>
          <View style={styles.textInput}>
            <TextInput
              value={this.state.email}
              onChangeText={(value) => this.setState({ email: value })}
              style={{ color: theme.colors.text }}
              placeholder="Email"
              placeholderTextColor={theme.colors.placeholder}
              clearButtonMode="while-editing"
              returnKeyType="next"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              value={this.state.password}
              onChangeText={(value) => this.setState({ password: value })}
              placeholder="Password"
              secureTextEntry={true}
              style={{ color: theme.colors.text }}
              placeholderTextColor={theme.colors.placeholder}
              returnKeyType="done"
              clearButtonMode="while-editing"
            />
          </View>
          <View style={{ alignSelf: "flex-end", marginTop: 12 }}>
            <BounceButton
              icon="chevron-right"
              iconButton={false}
              text="Sign In"
              onPress={() => this.authenticate()}
            />
          </View>
        </SafeAreaView>
        <Snackbar
          action={{
            label: "DISMISS",
            onPress: () => this.setState({ error: null }),
          }}
          visible={this.state.error}
          onDismiss={() => this.setState({ error: null })}>
          {this.state.error ? this.state.error.message : ""}
        </Snackbar>
      </>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingVertical: 72,
    paddingHorizontal: 56,
  },
  textInput: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    width: "100%",
    marginVertical: 16,
  },
});
