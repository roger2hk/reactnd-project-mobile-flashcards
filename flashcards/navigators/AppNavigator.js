import { createStackNavigator } from "react-navigation-stack";

import DeckTabNavigator from "../navigators/DecksTabNavigator";
import Deck from "../components/Deck";
import Quiz from "../components/Quiz";
import AddCard from "../components/AddCard";

const AppNavigator = createStackNavigator({
  Home: {
    screen: DeckTabNavigator
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "black"
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "black"
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "black"
      }
    }
  }
});

export default AppNavigator;
