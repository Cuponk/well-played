import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    // dispatch(fetchUserTweets(currentUser._id));
  }, [currentUser, dispatch]);


  return (
    <>
      <h2>Welcome, {currentUser.username}'s Tweets</h2>
    </>
  );
}

export default Profile;
