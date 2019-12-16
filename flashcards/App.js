import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers";
import { View } from "react-native";
import { createAppContainer } from "react-navigation";

import AppNavigator from "./navigators/AppNavigator";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <AppContainer />
        </View>
      </Provider>
    );
  }
}
