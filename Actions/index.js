import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  RESET_STORE,
} from "./constants";

import { getDecks } from "../Utils/api";

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id,
  };
}

export function addCardToDeck(deckId, card) {
  return {
    type: ADD_CARD,
    deckId,
    card,
  };
}

export function resetStore() {
  return {
    type: RESET_STORE,
  };
}
export function handleInitialData() {
  return (dispatch) => {
    return getDecks().then((decks) => {
      dispatch(receiveDecks(decks));
    });
  };
}
