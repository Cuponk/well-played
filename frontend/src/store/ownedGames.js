import jwtFetch from "./jwt";
import { RECEIVE_CURRENT_USER } from "./session";

const RECEIVE_OWNED_GAMES_ITEM = "RECEIVE_OWNED_GAMES_ITEM";
const REMOVE_OWNED_GAMES_ITEM = "REMOVE_OWNED_GAMES_ITEM";

const receiveOwnedGamesItem = (ownedGamesItem) => ({
  type: RECEIVE_OWNED_GAMES_ITEM,
  ownedGamesItem,
});

const removeOwnedGamesItem = (gameId) => ({
  type: REMOVE_OWNED_GAMES_ITEM,
  gameId,
});

export const addOwnedGamesItem = (userId, gameData) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}/ownedGames`, {
    method: "POST",
    body: JSON.stringify(gameData),
  });
  const ownedGamesItem = await res.json();
  return dispatch(receiveOwnedGamesItem(ownedGamesItem));
}

export const deleteOwnedGamesItem = (userId, gameId) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}/ownedGames`, {
    method: "DELETE",
    body: JSON.stringify({ gameId }),
  });
  const userInfo = await res.json();
  return dispatch(removeOwnedGamesItem(gameId));
}

const ownedGamesReducer = (state = {}, action) => {
  switch (action.type) {
    // Load ownedGames when a user logs in or session is restored.
    case RECEIVE_CURRENT_USER:
      const newState = {};
      // Populate state with gameId: gameData key-value pairs.
      if (action.currentUser.ownedGames.length > 0) {
        action.currentUser.ownedGames.forEach((ownedGamesItem) => {
          newState[ownedGamesItem.gameId] = ownedGamesItem;
        });
      }
      return newState;
    case RECEIVE_OWNED_GAMES_ITEM:
      return {
        ...state,
        [action.ownedGamesItem.id]: action.ownedGamesItem,
      }
    case REMOVE_OWNED_GAMES_ITEM:
      const nextState = { ...state };
      delete nextState[action.ownedGamesItemId];
      return nextState;
    default:
      return state;
  }
}

export default ownedGamesReducer;
