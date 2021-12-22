import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./Reducers/index";
import middleware from "./Middleware";
import React from "react";

import MainNavigator from "./Components/Stacks";
import { setLocalNotification } from "./Utils/notifications";
import TheStatusBar from "./Components/Statusbar";
import AppNavigator from "./Components/Tabs";

const store = createStore(reducer, middleware);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <TheStatusBar backgroundColor="green" barStyle="light-content" />
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde",
  },
});

//   render() {
//     return (
//       <Provider store={store}>
//         <View style={{ flex: 1 }}>
//           <TheStatusBar backgroundColor={"#1EA7FD"} barStyle="light-content" />
//           <Navigation />
//         </View>
//       </Provider>
//     );
//   }
// }

/*export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});*/
