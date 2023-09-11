import { useDispatch } from "react-redux";
import { login } from '../../store/session';


function DemoUserLogin() {
  const dispatch = useDispatch();

  const loginDemoUser = () => {
    dispatch(login({ username: 'demo-user', password: 'hello123' }));
  }

  return (
    <button onClick={loginDemoUser}>Demo User Login</button>
  );
}

export default DemoUserLogin;
