import jwtFetch from "./jwt";
import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } from "./session";

const RECEIVE_WISHLIST_ITEM = "RECEIVE_WISHLIST_ITEM";
const REMOVE_WISHLIST_ITEM = "REMOVE_WISHLIST_ITEM";

const receiveWishlistItem = (wishlistItem) => ({
  type: RECEIVE_WISHLIST_ITEM,
  wishlistItem,
});

const removeWishlistItem = (gameId) => ({
  type: REMOVE_WISHLIST_ITEM,
  gameId,
});

export const addWishlistItem = (userId, gameData) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}/wishlistGames`, {
    method: "POST",
    body: JSON.stringify({ gameData }),
  });
  const wishlistItem = await res.json();
  return dispatch(receiveWishlistItem(wishlistItem));
};

export const deleteWishlistItem = (userId, gameId) => async (dispatch) => {
  const res = await jwtFetch(`/api/users/${userId}/wishlistGames`, {
    method: "DELETE",
    body: JSON.stringify({ gameId }),
  });
  await res.json();
  return dispatch(removeWishlistItem(gameId));
};

const wishlistReducer = (state = {}, action) => {
  switch (action.type) {
    // Load wishlist when a user logs in or session is restored.
    case RECEIVE_CURRENT_USER:
      const newState = {};
      if (!action.currentUser) return newState;
      // Populate state with gameId: gameData key-value pairs.
      if (action.currentUser.wishlistGames.length > 0) {
        action.currentUser.wishlistGames.forEach((wishlistItem) => {
          newState[wishlistItem.gameId] = wishlistItem;
        });
      }
      return newState;
    case RECEIVE_WISHLIST_ITEM:
      return {
        ...state,
        [action.wishlistItem.gameId]: action.wishlistItem,
      }
    case REMOVE_WISHLIST_ITEM:
      const nextState = { ...state };
      delete nextState[action.gameId];
      return nextState;
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export default wishlistReducer;
