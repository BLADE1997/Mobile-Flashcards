import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Deck from "./Deck";
import { connect } from "react-redux";
import { removeDeck } from "../Actions/index";
import { removeDeckAS } from "../Utils/api";

export class DeckDetails extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.deck !== undefined;
  }
  handleDelete = (id) => {
    const { removeDeck, navigation } = this.props;

    removeDeck(id);
    removeDeckAS(id);

    navigation.goBack();
  };

  render() {
    const { deck } = this.props;

    return (
      <View style={styles.container}>
        <Deck id={deck.title} />
        <View>
          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              this.props.navigation.navigate("AddCard", { title: deck.title })
            }
          >
            <Text style={styles.btnText}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btn}
            onPress={() =>
              this.props.navigation.navigate("Quiz", { title: deck.title })
            }
          >
            <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnLink}
            onPress={() => this.handleDelete(deck.title)}
          >
            <Text style={styles.btnLinkText}>Delete this Deck</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: "white",
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
    textAlign: "center",
  },
  btnLinkText: {
    color: "#1EA7FD",
  },
});

const mapStateToProps = (state, { navigation }) => {
  const title = navigation.getParam("title", "undefined");
  const deck = state[title];

  return {
    deck,
  };
};

export default connect(mapStateToProps, { removeDeck })(DeckDetails);
