import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameListItem from '../GameListItem/GameListItem';
import './Profile.css';
import FriendListItem from '../FriendListItem/FriendListItem';

function Profile() {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const friends = useSelector(state => state.friends);
	const ownedGames = Object.values(useSelector(state => state.ownedGames));

	const handleFriends = () => {
		const allFriends = Object.values(friends).map(friend => {
			if (currentUser._id !== friend._id) {
				return <FriendListItem key={friend._id} user={friend} />
			}
		})
		return allFriends;
	}

	return (
		<>
			<h2>Welcome, {currentUser.username}</h2>
			<div className='profile-page-container'>
				<div className='profile-page-lists'>
					Wishlist
					<div className='profile-page-wishlist'>
						{ownedGames.map(game => {
							return <GameListItem game={game}/>
						})}
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
					{handleFriends()}
				</div>
			</div>
		</>
	);
}

export default Profile;
