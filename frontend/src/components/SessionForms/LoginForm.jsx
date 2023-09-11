import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { login, clearSessionErrors } from '../../store/session';
import DemoUserLogin from './DemoUserLogin';

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
          <label>
            <p>Username</p>
          </label>
          <input type="text"
            value={username}
            onChange={update('username')}
            placeholder="Username"
          />
          <label>
            <p>Password</p>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
            <div className="inputErrors"><p>{errors?.username}</p></div>
            <div className="inputErrors"><p>{errors?.password}</p></div>
          </label>
          <button disabled={!username || !password}>Log In</button>
        </form>
        <div className="session-form">
          <DemoUserLogin />
        </div>
      </div>
    </div>

  );
}

export default LoginForm;
