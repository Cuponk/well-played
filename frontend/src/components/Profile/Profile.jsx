import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <h2>Welcome, {currentUser.username}</h2>
    </>
  );
}

export default Profile;
