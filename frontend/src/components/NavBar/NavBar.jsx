import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

function NavBar() {
  const loggedIn = useSelector(state => !!state.user);
  const dispatch = useDispatch();

  const logoutUser = e => {
    e.preventDefault();
    dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <ProfileDropdown />
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}><button>Signup</button></Link>
          <Link to={'/login'}><button>Login</button></Link>
        </div>
      );
    }
  }

  return (
    <div className="nav-bar">
      <Link to="/"><h1>Well Played</h1></Link>
      {getLinks()}
    </div>
  );
}

export default NavBar;
