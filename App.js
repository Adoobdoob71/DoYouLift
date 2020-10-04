import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import { theme } from "./Theme";
import StackNavigation from "./routes/StackNavigation";
let firebase = require("firebase/app");

let firebaseConfig = {
  apiKey: "AIzaSyBKiyRO-OhVVq_-ypWwnAzetVKIGTxDu_A",
  authDomain: "doyoulift-e727a.firebaseapp.com",
  databaseURL: "https://doyoulift-e727a.firebaseio.com",
  projectId: "doyoulift-e727a",
  storageBucket: "doyoulift-e727a.appspot.com",
  messagingSenderId: "682013277624",
  appId: "1:682013277624:web:40f1e9e9545a62a5d2634d",
  measurementId: "G-7Q7XCJSPTL",
};
firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <NavigationContainer theme={theme}>
      <Provider theme={theme}>
        <StackNavigation />
      </Provider>
    </NavigationContainer>
  );
}
