import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { addDeck } from "../Actions/index";
import { connect } from "react-redux";
import { saveDeckTitleAS } from "../Utils/api";
import { StackActions, NavigationActions } from "react-navigation";

export class AddDeck extends Component {
  state = {
    text: "",
  };
  handleChange = (text) => {
    this.setState({ text });
  };

  handleSubmit = () => {
    const { addDeck, navigation } = this.props;
    const { text } = this.state;

    addDeck(text);
    saveDeckTitleAS(text);

    const resetAction = StackActions.reset({
      index: 1,
      actions: [
        NavigationActions.navigate({ routeName: "Home" }),
        NavigationActions.navigate({
          routeName: "DeckDetail",
          params: { title: text },
        }),
      ],
    });
    navigation.dispatch(resetAction);

    this.setState(() => ({ text: "" }));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ height: 60 }} />
        <View style={styles.block}>
          <Text style={styles.title}>Adding A Deck</Text>
        </View>
        <View style={[styles.block]}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            onChangeText={this.handleChange}
            placeholder="Enter Deck Title"
            autoFocus={true}
            returnKeyType="done"
            onSubmitEditing={this.handleSubmit}
          />
          <TouchableOpacity
            onPress={this.handleSubmit}
            style={styles.btn}
            disabled={this.state.text === ""}
          >
            <Text style={styles.btnText}>Add Deck</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "white",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 5,
    fontSize: 20,
    height: 40,
    marginBottom: 20,
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

export default connect(null, { addDeck })(AddDeck);
