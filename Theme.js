import { DefaultTheme, DarkTheme as PaperDarkTheme } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";
import * as Update from "expo-updates";
import { Alert } from "react-native";

export const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#4568DC",
    accent: "#B06AB3",
    textOnPrimary: "#ffffff",
  },
};

export const DarkTheme = {
  ...PaperDarkTheme,
  colors: {
    ...PaperDarkTheme.colors,
    surface: "#252525",
    primary: "#F2994A",
    accent: "#F2C94C",
    textOnPrimary: "#ffffff",
  },
};
let dark = false;
export const theme = dark ? DarkTheme : LightTheme;
export function changeTheme() {}
// let dark = "false";
// // async function getDark() {
// //   try {
// //     dark = await AsyncStorage.getItem("dark");
// //   } catch (error) {
// //     console.log(error.message);
// //   }
// // }
// AsyncStorage.getItem("dark").then((value) => {
//   dark = value;
//   Alert.alert(value);
// });
// export const theme = dark === "true" ? DarkTheme : LightTheme;
// export async function changeTheme() {
//   await AsyncStorage.setItem("dark", dark === "true" ? "false" : "true");
// }
