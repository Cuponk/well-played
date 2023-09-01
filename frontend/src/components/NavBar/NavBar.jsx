import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './NavBar.css';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

function NavBar() {
  // When we're not logged in we'll have an empty user object.
  const loggedIn = Object.keys(useSelector(state => state.user)).length > 0;

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
          <NavLink to={'/signup'}><button>Signup</button></NavLink>
          <NavLink to={'/login'}><button>Login</button></NavLink>
        </div>
      );
    }
  }

  return (
    <div className="nav-bar">
      <NavLink to="/"><h1>Well Played</h1></NavLink>
      {getLinks()}
    </div>
  );
}

export default NavBar;
