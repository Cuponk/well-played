import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LibraryButton from "../../assets/images/add-to-library.svg";
import FilledLibraryButton from "../../assets/images/filled-library.svg";
import { addOwnedGamesItem, deleteOwnedGamesItem, fetchOwnedGames } from "../../store/ownedGames";
import { deleteWishlistItem, fetchWishlist } from "../../store/wishlist";
import './OwnedGamesButton.css';
import { useEffect } from "react";

const OwnedGamesButton = ({ gameData, icon, setIcon }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const ownedGames = useSelector(state => state.ownedGames);
	// const wishlist = useSelector(state => state.wishlist);

	const gameIdString = gameData?.gameId.toString();
	const isGameOwned = gameIdString in ownedGames;

	const handleGamesList = (e) => {
		e.stopPropagation();

		if (currentUser) {
			if (isGameOwned) {
				setIcon(LibraryButton);
				dispatch(deleteOwnedGamesItem(currentUser?.id, gameData?.gameId))
			} else {
				// if (gameIdString in wishlist) {
				// 	dispatch(deleteWishlistItem(currentUser?.id, gameData.gameId));
				// }
				setIcon(FilledLibraryButton);
				dispatch(addOwnedGamesItem(currentUser?.id, gameData))
			}
		}

	}

	return (
		<img src={icon} alt='' className='owned-game-button' onClick={handleGamesList} />
	)
}

export default OwnedGamesButton;