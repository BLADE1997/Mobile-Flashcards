import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import QuizQA from "./QuizQA";
import {
  setLocalNotification,
  clearLocalNotification,
} from "../Utils/notifications";

class Quiz extends Component {
  state = {
    current: 1,
    count: 0,
    correct: [],
    incorrect: [],
  };

  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam("title", "");
    return {
      title: `${title} Quiz`,
    };
  };

  componentDidMount() {
    const { deck } = this.props;
    this.setState({ count: deck.questions.length });
  }

  correctAnswer = (question) => {
    this.setState({
      current: this.state.current + 1,
      correct: this.state.correct.concat([question]),
    });
  };

  incorrectAnswer = (question) => {
    this.setState({
      current: this.state.current + 1,
      incorrect: this.state.incorrect.concat([question]),
    });
  };

  handleAnswer = (answer, question) => {
    if (answer === true) {
      this.correctAnswer(question.question);
    } else {
      this.incorrectAnswer(question.question);
    }
  };

  restartQuiz = () => {
    const empty = [];
    this.setState({ current: 1, count: 0, correct: empty, incorrect: empty });
    clearLocalNotification().then(setLocalNotification);
  };

  toDeck = () => {
    this.restartQuiz();
    this.props.navigation.goBack();
  };

  render() {
    const { deck } = this.props;
    const { questions } = deck;
    const { current, correct } = this.state;

    return (
      <View style={styles.container}>
        {questions.map((question, index) => (
          <QuizQA
            key={question.question}
            deck={deck.title}
            question={question}
            index={index}
            current={current}
            onAnswer={this.handleAnswer}
          />
        ))}
        {current > questions.length && (
          <View>
            <Text style={styles.deckTitle}>Quiz Complete</Text>
            <Text style={styles.cardTitle}>
              You got {correct.length} out of {questions.length} correct. (
              {Math.floor((correct.length / questions.length) * 100)}%)
            </Text>
            <TouchableOpacity style={styles.btn} onPress={this.restartQuiz}>
              <Text style={styles.btnText}>Restart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnLink} onPress={this.toDeck}>
              <Text style={styles.btnLinkText}>Back to Deck</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  deckTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    marginTop: 25,
    textAlign: "center",
  },
  cardTitle: {
    fontSize: 15,
    color: "#757575",
  },
  input: {
    borderColor: "#DDD",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  btn: {
    borderWidth: 1,
    borderColor: "#34A8EF",
    backgroundColor: "#1EA7FD",
    padding: 15,
    marginTop: 25,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
  btnLink: {
    padding: 15,
    marginTop: 25,
  },
  btnLinkText: {
    textAlign: "center",
    color: "#1EA7FD",
  },
});

function mapStateToProps(decks, { navigation }) {
  const { title } = navigation.state.params;
  return {
    deck: decks[title],
  };
}

export default connect(mapStateToProps)(Quiz);
