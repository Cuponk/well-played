import { Link } from 'react-router-dom';
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
