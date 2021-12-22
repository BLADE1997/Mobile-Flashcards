import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";

class Deck extends Component {
  render() {
    const { deck } = this.props;

    if (deck === undefined) {
      return <View style={styles.deckContainer} />;
    }

    return (
      <View style={styles.deckContainer}>
        <View>
          <Text style={styles.deckText}>{deck.title}</Text>
        </View>
        <View>
          <Text style={styles.cardText}>
            {deck.questions.length > 1 || deck.questions.length < 1
              ? `${deck.questions.length} Cards`
              : `${deck.questions.length} Card`}
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "white",
  },

  deckText: {
    fontSize: 20,
  },

  cardText: {
    fontSize: 15,
    color: "gray",
  },
});

const mapStateToProps = (state, { id }) => {
  const deck = state[id];

  return {
    deck,
  };
};

export default connect(mapStateToProps)(Deck);
