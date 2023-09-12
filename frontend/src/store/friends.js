import { RECEIVE_CURRENT_USER, RECEIVE_USER_LOGOUT } from "./session";
import { ACCEPT_FRIEND_REQUEST, REMOVE_FRIENDSHIP } from "./friendships";

const friendsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const newState = {};
      if (!action.currentUser) return newState;
      // Populate state with friendId: friendData key-value pairs.
      if (action.currentUser.friends.length > 0) {
        action.currentUser.friends.forEach((friend) => {
          newState[friend._id] = friend;
        });
      }
      return newState;
    case ACCEPT_FRIEND_REQUEST:
      return { ...state, [action.friendship.sender._id]: action.friendship.sender };
    case REMOVE_FRIENDSHIP:
      const nextState = { ...state };
      delete nextState[action.friendshipId];
      return nextState;
    case RECEIVE_USER_LOGOUT:
      return {};
    default:
      return state;
  }
}

export default friendsReducer;
