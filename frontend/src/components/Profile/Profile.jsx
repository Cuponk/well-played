import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import GameListItem from '../GameListItem/GameListItem';
import FriendListItem from '../FriendListItem/FriendListItem';
import './Profile.css';
import FriendsList from '../FriendsList/FriendsList';

function Profile() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const wishlist = Object.values(useSelector(state => state.wishlist));
	const ownedGames = Object.values(useSelector(state => state.ownedGames));
	const friends = Object.values(useSelector(state => state.friends));

	const handleGamesList = list => {
		const games = list.map(game => {
			return <GameListItem game={game} />
		})
		return games;
	}

	// const handleFriends = friendsList => {
	// 	const allUsers = Object.values(friends).map(friend => {
	// 		if (currentUser._id !== friend._id) {
	// 			return <FriendListItem key={friend._id} user={friend} />
	// 		}
	// 	})
	// 	return allUsers;
	// }

	return (
		<>
			<h2>Welcome, {user.username}</h2>
			<div className='profile-page-container'>
				<div className='profile-page-lists'>
					<h3>Wishlist</h3>
					<div className='profile-page-wishlist'>
						{wishlist.length === 0 && (
							<NavLink to={'/search'} className='empty-game-link'>
								<GameListItem />
							</NavLink>
						)}
						{handleGamesList(wishlist)}
					</div>

					<h3>Library</h3>
					<div className='profile-page-library'>
						{ownedGames.length === 0 && (
							<NavLink to={'/search'} className='empty-game-link'>
								<GameListItem />
							</NavLink>
						)}
						{handleGamesList(ownedGames)}
					</div>
				</div>
				<div className='profile-page-friends'>
					<FriendsList />
				</div>
			</div>
		</>
	);
}

export default Profile;
