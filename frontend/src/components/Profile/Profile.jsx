import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameListItem from '../GameListItem/GameListItem';
import './Profile.css';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  return (
    <>
      <h2>Welcome, {currentUser.username}</h2>
	  <div className='profile-page-container'>
		<div className='profile-page-lists'> 
			<h3>Wishlist</h3>
			<div className='profile-page-wishlist'>
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
			</div>

			<h3>Library</h3>
			<div className='profile-page-library'> 
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
			</div>
		</div>
		<div className='profile-page-friends'>
			<h3>Friends</h3>
			<div>Friend 1</div>
			<div>Friend 2</div>
			<div>Friend 3</div>
			<div>Friend 4</div>
		</div>
	  </div>
    </>
  );
}

export default Profile;
