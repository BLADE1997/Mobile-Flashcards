import React, { Component } from "react";
import { connect } from "react-redux";
import { addCardToDeck } from "../Actions/index";
import { addCardToDeckAS } from "../Utils/api";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export class AddCard extends Component {
  state = {
    question: "",
    answer: "",
  };
  handleQuestionChange = (question) => {
    this.setState({ question });
  };
  handleAnswerChange = (answer) => {
    this.setState({ answer });
  };
  handleSubmit = () => {
    const { addCardToDeck, title, navigation } = this.props;
    const card = {
      question: this.state.question,
      answer: this.state.answer,
    };

    addCardToDeck(title, card);
    addCardToDeckAS(title, card);

    this.setState({ question: "", answer: "" });
    navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.block}>
            <Text style={styles.title}>Add a question</Text>
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.question}
              onChangeText={this.handleQuestionChange}
              placeholder="Enter Question"
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => this.answerTextInput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={[styles.block]}>
            <TextInput
              style={styles.input}
              value={this.state.answer}
              onChangeText={this.handleAnswerChange}
              placeholder=" Enter Answer"
              ref={(input) => {
                this.answerTextInput = input;
              }}
              returnKeyType="done"
              onSubmitEditing={this.handleSubmit}
            />
          </View>
        </View>
        <TouchableOpacity onPress={this.handleSubmit} style={styles.btn}>
          <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
        <View style={{ height: "30%" }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "white",
    justifyContent: "space-around",
  },
  block: {
    marginBottom: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#fff",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
  },

  btn: {
    borderWidth: 1,
    borderColor: "#34A8EF",
    backgroundColor: "#1EA7FD",
    padding: 15,
    margin: 25,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  btnText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
  },
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam("title", "undefined");

  return {
    title,
  };
};

export default connect(mapStateToProps, { addCardToDeck })(AddCard);
