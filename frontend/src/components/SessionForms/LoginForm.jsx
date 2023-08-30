import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';

import { login, clearSessionErrors } from '../../store/session';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'username' ? setUsername : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  }

  return (
    <div className="form-container">
      <div className="form-container-wrapper">

        <form className="session-form" onSubmit={handleSubmit}>
          <h2>Log In Form</h2>
          <div className="inputErrors">{errors?.username}</div>
          <label>
            <p>Username</p>
          </label>
          <input type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
          />
          <div className="inputErrors">{errors?.password}</div>
          <label>
            <p>Password</p>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <button disabled={!username || !password}>Log In</button>
        </form>
      </div>
    </div>

  );
}

export default LoginForm;
