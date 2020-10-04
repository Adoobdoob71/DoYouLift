import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import BounceButton from "../components/BounceButton";
import Workout from "../components/Workout";
import { theme } from "../Theme";

export default function Workouts(props) {
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={styles.row}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowTitle}>Workouts</Text>
            <BounceButton icon="chevron-right" iconButton={true} />
          </View>
          <FlatList
            data={[
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
            ]}
            style={styles.flatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Workout
                title={item.title}
                workoutTime={item.workoutTime}
                image={item.image}
              />
            )}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowTitle}>Workouts</Text>
            <BounceButton icon="chevron-right" iconButton={true} />
          </View>
          <FlatList
            data={[
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
            ]}
            style={styles.flatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Workout
                title={item.title}
                workoutTime={item.workoutTime}
                image={item.image}
              />
            )}
          />
        </View>
        <View style={styles.row}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowTitle}>Workouts</Text>
            <BounceButton icon="chevron-right" iconButton={true} />
          </View>
          <FlatList
            data={[
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "6-Pack Tones Abs",
                workoutTime: "2 weeks",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
              {
                title: "Ultimate Running Exercise",
                workoutTime: "1 month",
                image:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSwH1vWP1JisV1qNl3YsLxXJXH3T-8UYhhHWg&usqp=CAU",
              },
            ]}
            style={styles.flatList}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Workout
                title={item.title}
                workoutTime={item.workoutTime}
                image={item.image}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  row: {
    paddingVertical: 12,
    marginVertical: 16,
    backgroundColor: theme.colors.surface,
  },
  rowHeader: {
    flexDirection: "row",
    paddingHorizontal: 8,
    justifyContent: "space-between",
  },
  rowTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
  },
  flatList: {
    marginTop: 8,
    paddingHorizontal: 8,
  },
});
