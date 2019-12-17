import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  Text,
  StyleSheet,
  Button,
  View
} from "react-native";
import { NavigationActions } from "react-navigation";

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    numOfCorrectAnswers: 0,
    showAnswer: false
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Quiz"
    };
  };

  correctAnswer = () => {
    const { currentQuestion, numOfCorrectAnswers } = this.state;

    this.setState({
      currentQuestion: currentQuestion + 1,
      numOfCorrectAnswers: numOfCorrectAnswers + 1,
      showAnswer: false
    });
  };

  incorrectAnswer = () => {
    const { currentQuestion } = this.state;

    this.setState({
      currentQuestion: currentQuestion + 1,
      showAnswer: false
    });
  };

  restartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      numOfCorrectAnswers: 0,
      showAnswer: false
    });
  };

  toDeckDetail = () => {
    this.props.navigation.dispatch(NavigationActions.back());
  };

  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { currentQuestion, numOfCorrectAnswers, showAnswer } = this.state;
    const totalQuestions = questions.length;
    const card = questions[currentQuestion];

    return (
      <ScrollView style={styles.container}>
        {currentQuestion === totalQuestions ? (
          <View>
            <Text>
              {numOfCorrectAnswers} out of {totalQuestions} are correct.
            </Text>
            <Button title="Restart Quiz" onPress={() => this.restartQuiz()} />
            <Button title="Back to Deck" onPress={() => this.toDeckDetail()} />
          </View>
        ) : (
          <View>
            <Text>
              {numOfCorrectAnswers} out of {totalQuestions} are correct.
            </Text>

            <Text>{totalQuestions - currentQuestion} questions left</Text>

            <Text>{card.question}</Text>

            {showAnswer && <Text>{card.answer}</Text>}

            {!showAnswer && (
              <Button
                title="Show answer"
                onPress={() => this.setState({ showAnswer: true })}
              />
            )}

            <Button title="Correct" onPress={this.correctAnswer} />
            <Button title="Incorrect" onPress={this.incorrectAnswer} />
          </View>
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
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

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
