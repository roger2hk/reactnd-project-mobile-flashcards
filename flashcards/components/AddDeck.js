import React, { Component } from "react";
import { connect } from "react-redux";
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  Button
} from "react-native";
import { submitDeck } from "../utils/api";
import { addDeck } from "../actions";
import { TextInput } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    alignSelf: "stretch",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    paddingLeft: 10
  },
  questionText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10
  }
});

class AddDeck extends Component {
  state = {
    deckTitle: ""
  };

  submit = () => {
    const { deckTitle } = this.state;

    if (deckTitle !== "") {
      const deck = {
        title: deckTitle,
        questions: []
      };
      const key = deckTitle.replace(" ", "_");

      this.props.dispatch(
        addDeck({
          [key]: deck
        })
      );

      this.setState(() => ({ deckTitle: "" }));

      this.toHome();

      submitDeck(deck, key);
    }
  };

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: "AddDeck" }));
  };

  render() {
    const { deckTitle } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text style={styles.questionText}>Deck Title</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={deckTitle => this.setState({ deckTitle })}
          value={deckTitle}
          autoFocus={true}
        />

        <Button
          title="Create Deck"
          onPress={this.submit}
          disabled={deckTitle === ""}
        />
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(AddDeck);
