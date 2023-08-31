import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = Object.keys(useSelector(state => state.user)).length > 0;

  return (
    <Route path={path} exact={exact} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    )} />
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = Object.keys(useSelector(state => state.user)).length > 0;

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
