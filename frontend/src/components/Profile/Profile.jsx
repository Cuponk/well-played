import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from "react-router-dom";
import GameListItem from '../GameListItem/GameListItem';
import FriendListItem from '../FriendListItem/FriendListItem';
import './Profile.css';
import FriendsList from '../FriendsList/FriendsList';
import noGamesImage from '../../assets/images/empty-list.png';

function Profile() {
	const currentUser = useSelector(state => state.user);
	const wishlist = Object.values(useSelector(state => state.wishlist));
	const ownedGames = Object.values(useSelector(state => state.ownedGames));
	const dispatch = useDispatch();

	const handleGamesList = list => {
		const games = Object.values(list).map(game => {
			return <GameListItem game={game} />
		})
		return games;
	}

	return (
		<>
			<div className='profile-page-container'>
				<div className='profile-page-lists'>
					<h3>Wishlist</h3>
					<div className='profile-page-wishlist'>
						{wishlist.length === 0 && (
							<NavLink to={'/search'} className='empty-game-link'>
								<img src={noGamesImage} alt='' className='no-games-image'/>
							</NavLink>
						)}
						{handleGamesList(wishlist)}
					</div>

					<h3>Library</h3>
					<div className='profile-page-library'>
						{ownedGames.length === 0 && (
							<NavLink to={'/search'} className='empty-game-link'>
								<img src={noGamesImage} alt='' className='no-games-image'/>
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
