import React from "react";
import { Alert, SafeAreaView, StyleSheet, Text, View } from "react-native";
import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from "react-native-gesture-handler";
import * as firebase from "firebase";
import { LinearGradient } from "expo-linear-gradient";
import LeadersCard from "../components/LeadersCard";
import { theme } from "../Theme";
import { IconButton } from "react-native-paper";

export default class Leaderboards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.db = firebase
      .firestore()
      .collection("users")
      .orderBy("dailySteps", "desc")
      .limit(10);
    this.db
      .get()
      .then((snapshot) => {
        let count = 1;
        snapshot.forEach((item) => {
          this.setState({
            data: [...this.state.data, { ...item.data(), index: count }],
          });
          count++;
        });
      })
      .then(() => this.setState({ loading: false }));
  }

  render() {
    if (!this.state.loading)
      return (
        <SafeAreaView style={styles.body}>
          <Text style={styles.title}>Congratulations To The Top 10!</Text>
          <FlatList
            data={this.state.data.slice(1, this.state.data.length)}
            style={styles.flatList}
            ListHeaderComponent={() => (
              <TouchableOpacity onPress={() => {}}>
                <LinearGradient
                  style={styles.firstPlace}
                  colors={[theme.colors.accent, theme.colors.primary]}
                  start={[1, 1]}
                  end={[0, 1]}>
                  <LeadersCard Item={this.state.data[0]} leader={true} />
                </LinearGradient>
              </TouchableOpacity>
            )}
            renderItem={({ item }, index) => (
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.leaderCard}>
                  <LeadersCard Item={item} leader={false} />
                </View>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      );
    else return null;
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  title: {
    fontSize: 21,
    color: theme.colors.text,
    marginVertical: 24,
    alignSelf: "center",
  },
  flatList: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  firstPlace: {
    flex: 1,
    marginVertical: 4,
    borderRadius: 8,
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  leaderCard: {
    marginVertical: 4,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.surface,
  },
});
