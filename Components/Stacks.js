import React from "react";
import { Platform } from "react-native";
import * as Icon from "@expo/vector-icons";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import DeckList from "../Components/DeckList";
import AddDeck from "../Components/AddDeck";
import DeckDetail from "../Components/DeckDetails";
import AddCard from "../Components/AddCard";
import Quiz from "../Components/Quiz";

const isIOS = Platform.OS === "ios" ? true : false;

const routeConfigs = {
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: "Decks",
      tabBarIcon: ({ tintColor }) => (
        <Icon.Ionicons
          name={isIOS ? "ios-bookmarks" : "md-bookmarks"}
          size={30}
          color={tintColor}
        />
      ),
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: "Add Deck",
      tabBarIcon: ({ tintColor }) => (
        <Icon.FontAwesome name="plus-square" size={30} color={tintColor} />
      ),
    },
  },
};

const tabNavigatorConfig = {
  navigationOptions: {
    header: null,
  },
  defaultNavigationOptions: {
    bounces: true,
  },
  tabBarOptions: {
    activeTintColor: "darkgreen",
    style: {
      height: 60,
      backgroundColor: "#fff",
      shadowColor: "rgba(0,0,0, 0.24)",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
      borderTopWidth: 1,
      borderTopColor: "#aaa",
    },
    labelStyle: {
      fontSize: 12,
      fontWeight: "bold",
    },
    tabStyle: {
      marginTop: 5,
      marginBottom: 3,
    },
    showIcon: true,
  },
};

const Tabs = createBottomTabNavigator(routeConfigs, tabNavigatorConfig);

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: Tabs,
    },
    DeckDetail: {
      screen: DeckDetail,
      navigationOptions: {
        headerTintColor: "darkgreen",
        headerStyle: {
          backgroundColor: "#cdeccd",
        },
        title: "Deck Details",
      },
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: {
        headerTintColor: "darkgreen",
        headerStyle: {
          backgroundColor: "#cdeccd",
        },
        headerTitleStyle: {
          justifyContent: "center",
          textAlign: "center",
        },
        title: "Add Card",
      },
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: "darkgreen",
        headerStyle: {
          backgroundColor: "#cdeccd",
        },
      },
    },
  },
  { headerLayoutPreset: "center" }
);

export default MainNavigator;

/*import { createStackNavigator } from "react-navigation-stack";
import Tabs from "./Tabs";
import DeckDetails from "./DeckDetails";
import AddCard from "./AddCard";
//import Quiz from "./Quiz"

const Stacks = createStackNavigator(
  {
    Decks: {
      screen: Tabs,
    },
    Deck: {
      screen: DeckDetails,
      path: "DeckDetails",
    },
    AddCard: {
      screen: AddCard,
      path: "AddCard",
    },
    // Quiz:{
    //     screen: Quiz,
    //     path: "Quiz"
    // },
  }
  // {
  //   initialRouteName: "DeckList",
  // }
);
export default Stacks;*/
