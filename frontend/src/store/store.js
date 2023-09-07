import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session';
import errors from './errors';
import wishlist from './wishlist';
import ownedGames from './ownedGames';
import friends from './friends';
import friendships from './friendships';
import otherUsers from './otherUsers';

const rootReducer = combineReducers({
  user: session,
  wishlist,
  ownedGames,
  friends,
  errors,
  friendships
  // otherUsers
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

