import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LibraryButton from "../../assets/images/add-to-library.svg";
import FilledLibraryButton from "../../assets/images/filled-library.svg";
import { addOwnedGamesItem, deleteOwnedGamesItem } from "../../store/ownedGames";
import './OwnedGamesButton.css';
import { useHistory } from "react-router-dom";

const OwnedGamesButton = ({ gameData, icon, setIcon }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const ownedGames = useSelector(state => state.ownedGames);
	const history = useHistory();

	const gameIdString = gameData?.gameId.toString();
	const isGameOwned = gameIdString in ownedGames;

	const handleGamesList = (e) => {
		e.stopPropagation();

		if (Object.keys(currentUser).length !== 0) {
			if (isGameOwned) {
				setIcon(LibraryButton);
				dispatch(deleteOwnedGamesItem(currentUser?.id, gameData?.gameId))
			} else {
				setIcon(FilledLibraryButton);
				dispatch(addOwnedGamesItem(currentUser?.id, gameData))
			}
		} else {
			history.push('/login');
		}

	}

	return (
		<img src={icon} alt='' className='owned-game-button' onClick={handleGamesList} />
	)
}

export default OwnedGamesButton;