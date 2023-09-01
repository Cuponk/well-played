import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameListItem from '../GameListItem/GameListItem';
import './Profile.css';
import FriendListItem from '../FriendListItem/FriendListItem';

function Profile() {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const wishlist = Object.values(useSelector(state => state.wishlist));
	const ownedGames = Object.values(useSelector(state => state.ownedGames));
	const friends = useSelector(state => state.friends);

	const handleGamesList = list => {
		const games = list.map(game => {
			return <GameListItem game={game} />
		})
		return games;
	}

	const handleFriends = () => {
		const allUsers = Object.values(friends).map(friend => {
			if (currentUser._id !== friend._id) {
				return <FriendListItem key={friend._id} user={friend} />
			}
		})
		return allUsers;
	}

	return (
		<>
			<h2>Welcome, {currentUser.username}</h2>
			<div className='profile-page-container'>
				<div className='profile-page-lists'>
					<h3>Wishlist</h3>
					<div className='profile-page-wishlist'>
						{handleGamesList(wishlist)}
					</div>

					<h3>Library</h3>
					<div className='profile-page-library'>
						{handleGamesList(ownedGames)}
					</div>
				</div>
				<div className='profile-page-friends'>
					<h3>Friends</h3>
					{handleFriends()}
				</div>
			</div>
		</>
	);
}

export default Profile;
