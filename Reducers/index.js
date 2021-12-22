import {
  RECEIVE_DECKS,
  ADD_DECK,
  REMOVE_DECK,
  ADD_CARD,
  RESET_STORE,
} from "../Actions/constants";

import { decks as DEFAULT_STATE } from "../Utils/_DATA";

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: [],
        },
      };
    case REMOVE_DECK:
      const { id } = action;
      const { [id]: value, ...remainingDecks } = state;
      return remainingDecks;
    case ADD_CARD:
      const { deckId, card } = action;
      return {
        ...state,
        [deckId]: {
          ...state[deckId],
          questions: [...state[deckId].questions].concat(card),
        },
      };
    case RESET_STORE:
      return DEFAULT_STATE;
    default:
      return state;
  }
}
