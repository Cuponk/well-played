import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'username':
        setState = setUsername;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => setState(e.currentTarget.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      username,
      password
    };

    dispatch(signup(user));
  }

  return (
    <div className="form-container">
      <div className="form-container-wrapper">
        <form className="session-form" onSubmit={handleSubmit}>
          <h2>Sign Up Form</h2>
          <div className="inputErrors"><p>{errors?.email}</p></div>
          <label>
            <p>Email</p>
            <input type="text"
              value={email}
              onChange={update('email')}
              placeholder="Email"
            />
          </label>
          <div className="inputErrors"><p>{errors?.username}</p></div>
          <label>
            <p>Username</p>
            <input type="text"
              value={username}
              onChange={update('username')}
              placeholder="Username"
            />
          </label>
          <div className="inputErrors"><p>{errors?.password}</p></div>
          <label>
            <p>Password</p>
            <input type="password"
              value={password}
              onChange={update('password')}
              placeholder="Password"
            />
          </label>
          <div className="inputErrors">
            {password !== password2 && <p>Confirm Password field must match</p>}
          </div>
          <label>
            <p>Confirm Password</p>
            <input type="password"
              value={password2}
              onChange={update('password2')}
              placeholder="Confirm Password"
            />
          </label>
          <button disabled={!email || !username || !password || password !== password2}>Sign Up</button>

        </form>
      </div>
    </div>
  );
}

export default SignupForm;
