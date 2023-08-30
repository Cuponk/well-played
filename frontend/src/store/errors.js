import { combineReducers } from 'redux';
import { sessionErrorsReducer } from './session';
import { gameErrorsReducer } from './games';

export default combineReducers({
  session: sessionErrorsReducer,
  games: gameErrorsReducer,
});
