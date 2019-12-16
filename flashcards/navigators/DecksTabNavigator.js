import React from "react";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";

import Decks from "../components/Decks";
import AddDeck from "../components/AddDeck";

import { Platform } from "react-native";

const DeckTabNavigator = createBottomTabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: "Decks",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-list-box" size={30} color={tintColor} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      adaptive: true,
      activeTintColor: Platform.OS === "ios" ? "black" : "white",
      tabStyle: {
        paddingTop: 5
      }
    }
  }
);

export default DeckTabNavigator;
