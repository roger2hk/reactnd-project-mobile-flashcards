import React, { Component } from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, Text, StyleSheet, Button } from "react-native";
import { submitCard } from "../utils/api";
import { addCard } from "../actions";
import { TextInput } from "react-native-gesture-handler";
import { NavigationActions } from "react-navigation";

class AddCard extends Component {
  state = {
    question: "",
    answer: ""
  };

  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;

    return {
      title: `${deckTitle} - New Card`
    };
  };

  submit = () => {
    const { question, answer } = this.state;
    const { deckKey } = this.props;

    const newQuestion = { question, answer };

    this.props.dispatch(addCard(newQuestion, deckKey));

    this.setState(() => ({ question: "", answer: "" }));

    this.toDeckDetail();

    submitCard(newQuestion, deckKey);
  };

  toDeckDetail = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Text>Question</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={question => this.setState({ question })}
          value={question}
        />

        <Text>Answer</Text>

        <TextInput
          style={styles.textInput}
          onChangeText={answer => this.setState({ answer })}
          value={answer}
        />

        <Button
          title="Add Card"
          onPress={this.submit}
          disabled={question === "" || answer === ""}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white"
  },
  textInput: {
    alignSelf: "stretch",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 7,
    marginBottom: 10,
    paddingLeft: 10
  }
});

function mapStateToProps(flashcards, { navigation }) {
  const { deckKey, deckTitle } = navigation.state.params;
  return { deckKey, deckTitle };
}

export default connect(mapStateToProps)(AddCard);
