import { ADD_CARD, ADD_DECK, RECEIVE_INITIAL_DATA } from '../actions'

export default function (state = {}, action) {
  switch (action.type) {
    case RECEIVE_INITIAL_DATA:
      return {
        ...state,
        ...action.decks
      }
    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: state[action.title].questions.concat(action.card)
        }
      }
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: []
        }
      }
    default:
      return state
  }
}