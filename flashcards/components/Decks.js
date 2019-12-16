import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { connect } from "react-redux";
import { receiveDecks, resetState } from "../actions";
import { fetchResults, resetStorage } from "../utils/api";
import { AppLoading } from "expo";
import { ScrollView } from "react-native-gesture-handler";

import { SafeAreaView } from "react-navigation";

const DeckItem = ({ deckTitle, qustionCount, onPress }) => {
  return (
    <TouchableOpacity style={styles.deckItem} onPress={onPress}>
      <Text style={styles.deckTitleText}>{deckTitle}</Text>
      <Text style={styles.questionCountText}>
        {qustionCount} {qustionCount > 1 ? "cards" : "card"}
      </Text>
    </TouchableOpacity>
  );
};

class Decks extends Component {
  state = {
    ready: false
  };

  componentDidMount() {
    this.onLoad();
  }

  onLoad = () => {
    fetchResults()
      .then(decks => this.props.dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ ready: true })));
  };

  reset = () => {
    this.setState({ ready: false });
    this.props.dispatch(resetState());
    resetStorage().then(() => this.onLoad());
  };

  render() {
    const { decks } = this.props;
    const { ready } = this.state;

    if (ready === false) {
      return <AppLoading />;
    }

    if (!decks || typeof decks === "undefined" || decks.length === 0) {
      return (
        <View>
          <Text style={styles.noDataText}>404 NOT FOUND</Text>
        </View>
      );
    }

    return (
      <SafeAreaView>
        <ScrollView>
          {Object.keys(decks).map(key => (
            <DeckItem
              key={key}
              deckTitle={decks[key].title}
              qustionCount={decks[key].questions.length}
              onPress={() =>
                this.props.navigation.navigate("Deck", {
                  deckKey: key,
                  deckTitle: decks[key].title
                })
              }
            />
          ))}
          <Button title="Reset" onPress={this.reset} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  deckItem: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1
  },
  deckTitleText: {
    flex: 1,
    textAlign: "center",
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
    marginTop: 10
  },
  questionCountText: {
    flex: 1,
    textAlign: "center",
    color: "gray",
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10
  },
  noDataText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24
  }
});

function mapStateToProps(flashcards) {
  const { decks } = flashcards;
  return { decks };
}

export default connect(mapStateToProps)(Decks);
