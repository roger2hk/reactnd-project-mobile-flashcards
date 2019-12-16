import React, { Component } from "react";
import { Text, StyleSheet, StatusBar, Button } from "react-native";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params;

    return {
      title: deckTitle
    };
  };

  render() {
    const { deck, deckKey } = this.props;

    if (!deck || typeof deck === "undefined") {
      return (
        <ScrollView style={styles.container}>
          <Text style={styles.noDataText}>Deck not found</Text>
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.questionCountText}>
          {deck.questions.length} {deck.questions.length > 1 ? "cards" : "card"}
        </Text>

        <Button
          title="Add Card"
          onPress={() =>
            this.props.navigation.navigate("AddCard", {
              deckKey,
              deckTitle: deck.title
            })
          }
        />

        <Button
          title="Start a Quiz"
          onPress={() =>
            this.props.navigation.navigate("Quiz", {
              deckKey,
              deckTitle: deck.title
            })
          }
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  deckTitleText: {
    flex: 1,
    textAlign: "center",
    color: "black",
    fontSize: 25
  },
  questionCountText: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    marginBottom: 10
  },
  noDataText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24
  }
});

function mapStateToProps(flashcards, { navigation }) {
  const { deckKey } = navigation.state.params;
  const { decks } = flashcards;

  return {
    deckKey,
    deck: decks[deckKey]
  };
}

function mapDispatchToProps({ navigation }) {
  return {
    goBack: () => navigation.goBack()
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
