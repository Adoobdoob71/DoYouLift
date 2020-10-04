import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import BounceButton from "../components/BounceButton";
import Card from "../components/Card";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { IconButton, Menu } from "react-native-paper";
import * as firebase from "firebase";
import { changeTheme, theme } from "../Theme";
import { Pedometer } from "expo-sensors";
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      userDetails: null,
      menuVisible: false,
      stepsCount: 0,
      pedometerAvailable: false,
    };
  }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user });
        this.fireRef = firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((snapshot) =>
            this.setState({ userDetails: snapshot.data() })
          );
      } else {
        this.setState({ user: null });
      }
    });
    let avaiable = await Pedometer.isAvailableAsync();
    this.setState({ pedometerAvailable: avaiable });

    // const end = new Date();
    // const start = new Date();
    // start.setDate(end.getDate() - end.getHours() / 24);
    // Pedometer.getStepCountAsync(start, end)
    //   .then((result) => {
    //     this.setState({ stepsCount: result.steps });
    //   })
    //   .catch((error) => console.log(error.message));
    Pedometer.watchStepCount((result) => {
      this.setState({ stepsCount: result.steps });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.body}>
        <StatusBar
          style={theme.dark ? "light" : "dark"}
          animated
          translucent={false}
          backgroundColor={theme.colors.surface}
        />
        <View style={styles.header}>
          <View style={{ marginRight: 12 }}>
            <BounceButton icon="menu" iconButton={true} />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Login")}>
            <Image
              source={{
                uri: this.state.userDetails
                  ? this.state.userDetails.profileImage
                  : "empty",
              }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
          <View style={[styles.headerTitle, { marginRight: "auto" }]}>
            <Text style={styles.textTitle}>
              {this.state.userDetails ? "Welcome," : "Sign In"}
            </Text>
            {this.state.userDetails && (
              <Text style={styles.textTitleUsername}>
                {this.state.userDetails.username}
              </Text>
            )}
          </View>
          <Menu
            anchor={
              <IconButton
                icon="dots-vertical"
                color={theme.colors.text}
                onPress={() => this.setState({ menuVisible: true })}
              />
            }
            onDismiss={() => this.setState({ menuVisible: false })}
            visible={this.state.menuVisible}>
            <Menu.Item
              title="Sign Out"
              onPress={() =>
                firebase
                  .auth()
                  .signOut()
                  .then(() => this.setState({ menuVisible: false }))
              }
            />
            <Menu.Item
              title="Theme"
              onPress={() => {
                changeTheme();
                this.setState({ menuVisible: false });
              }}
            />
          </Menu>
        </View>
        <ScrollView
          style={styles.ScrollView}
          showsVerticalScrollIndicator={false}>
          {this.state.pedometerAvailable ? (
            <View style={styles.stepsView}>
              <Text style={styles.textTitle}>Today you've walked</Text>
              <View style={styles.stepsViewRow}>
                <Text
                  style={{
                    fontSize: 24,
                    fontWeight: "bold",
                    color:
                      this.state.stepsCount > 6000
                        ? theme.colors.primary
                        : theme.colors.text,
                  }}>
                  {this.state.stepsCount}
                </Text>
                <Text style={{ fontSize: 12, color: theme.colors.text }}>
                  /6000
                </Text>
              </View>
              <Text style={styles.textTitle}>steps</Text>
            </View>
          ) : (
            <View style={styles.stepsView}>
              <Text style={styles.textTitle}>Pedometer not avaiable!</Text>
            </View>
          )}
          <Text style={styles.caption}>What I've done today: </Text>
          <Card progress={0.7} name="Running" />
          <Card progress={0.4} name="Jumping" />
          <Card progress={0.1} name="Tennis" />
          <Card progress={1.0} name="Football" />
          <Card progress={0.8} name="High-Jumping" />
          <Card progress={0.9} name="Basketball" />
          <Card progress={0.2} name="Steps" />
          <Card progress={0.3} name="Sprinting" />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    padding: 12,
    paddingBottom: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },
  headerTitle: {},
  textTitle: {
    fontSize: 21,
    color: theme.colors.text,
  },
  textTitleUsername: {
    fontSize: 21,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  caption: {
    fontSize: 16,
    marginBottom: 16,
    color: theme.colors.text,
  },
  card: {
    borderRadius: 4,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 16,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 21,
    marginRight: 12,
    backgroundColor: theme.colors.backdrop,
  },
  ScrollView: {
    flex: 1,
  },
  stepsView: {
    alignItems: "center",
    paddingVertical: 12,
    marginVertical: 12,
  },
  stepsViewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
});
