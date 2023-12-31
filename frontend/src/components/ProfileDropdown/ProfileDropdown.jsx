import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../store/session';
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import "./ProfileDropdown.css";
import { NavLink } from "react-router-dom";

export default function ProfileDropdown() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const logoutUser = (e) => {
    e.preventDefault();
    dispatch(logout());
    history.push("/");
  };

  return (
    <div
      className="dropdown"
      onClick={() => setIsOpen(!isOpen)}
    >
      <li className="user-container">
        <i className="fa-solid fa-user-circle profile-avatar"></i>
        <h2>{currentUser.username}</h2>
        <i className="fa-solid fa-chevron-down dropdown-arrow"></i>
      </li>
      {isOpen && (
        <div className="dropdown-content">
          <li><NavLink to="/profile">View Profile</NavLink></li>
          <li><NavLink to="/search">Search Games</NavLink></li>
          <li onClick={logoutUser}>Log Out</li>
        </div>
      )}
    </div>
  )
}
