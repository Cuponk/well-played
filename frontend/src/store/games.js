import jwtFetch from './jwt';

const RECEIVE_GAMES = 'RECEIVE_GAMES';
const RECEIVE_GAME = 'RECEIVE_GAME';
const REMOVE_GAME = 'REMOVE_GAME';
const RECEIVE_GAME_ERRORS = 'RECEIVE_GAME_ERRORS';
const CLEAR_GAME_ERRORS = 'CLEAR_GAME_ERRORS';

const receiveGames = games => ({
  type: RECEIVE_GAMES,
  games,
});

/*
We most likely won't use these. In the game index we load all of the games.
When we load all of the games, we can pass the game title as a prop to game show
and load from the API. We don't need to manage individual games in our state.
*/
const receiveGame = game => ({
  type: RECEIVE_GAME,
  game,
});

const removeGame = gameId => ({
  type: REMOVE_GAME,
  gameId,
});

export const fetchGames = () => async dispatch => {
  const response = await jwtFetch('/api/games');
  if (response.ok) {
    const games = await response.json();
    dispatch(receiveGames(games));
  }
}

const nullErrors = null;

export const gameErrorsReducer = (state = nullErrors, action) => {
  switch (action.type) {
    case RECEIVE_GAME_ERRORS:
      return action.errors;
    case CLEAR_GAME_ERRORS:
      return nullErrors;
    default:
      return state;
  }
};

const gamesReducer = (state = {}, action) => {
  const newState = { ...state };
  switch (action.type) {
    case RECEIVE_GAMES:
      return action.games;
    case RECEIVE_GAME:
      newState[action.game.id] = action.game;
      return newState;
    case REMOVE_GAME:
      delete newState[action.gameId];
      return newState;
    default:
      return state;
  }
}

export default gamesReducer;
