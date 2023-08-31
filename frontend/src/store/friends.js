import { RECEIVE_CURRENT_USER } from "./session";

const friendsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const newState = {};
      if (!action.currentUser) return newState;
      console.log(action.currentUser);
      // Populate state with friendId: friendData key-value pairs.
      if (action.currentUser.friends.length > 0) {
        action.currentUser.friends.forEach((friend) => {
          newState[friend._id] = friend;
        });
      }
      return newState;
    default:
      return state;
  }
}

export default friendsReducer;
