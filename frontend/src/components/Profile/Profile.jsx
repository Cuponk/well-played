import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameListItem from '../GameListItem/GameListItem';
import './Profile.css';
import FriendListItem from '../FriendListItem/FriendListItem';

function Profile() {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const friends = useSelector(state => state.friends)

  const handleUsers = () => {
	const allUsers = Object.values(friends).map(user => {
		if(currentUser._id !== user._id) {
			return <FriendListItem key={user._id}user={user}/>
		}
	})
	return allUsers;
  }

	return (
		<>
			<h2>Welcome, {currentUser.username}</h2>
			<div className='profile-page-container'>
				<div className='profile-page-lists'>
					Wishlist
					<div className='profile-page-wishlist'>
						<GameListItem />
						<GameListItem />
						<GameListItem />
						<GameListItem />
						<GameListItem />
						<GameListItem />
					</div>

					Library
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
					{handleUsers()}
				</div>
			</div>
    </>
  );
}

export default Profile;
