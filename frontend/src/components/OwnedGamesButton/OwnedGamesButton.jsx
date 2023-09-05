import { useDispatch, useSelector } from "react-redux";
import LibraryButton from "../../assets/images/add-to-library.svg";
import FilledLibraryButton from "../../assets/images/filled-library.svg";
import { addOwnedGamesItem, deleteOwnedGamesItem } from "../../store/ownedGames";
import { deleteWishlistItem } from "../../store/wishlist";
import './OwnedGamesButton.css';
import { useEffect } from "react";

const OwnedGamesButton = ({ gameData }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const ownedGames = useSelector(state => state.ownedGames);
	const wishlist = useSelector(state => state.wishlist) ;

	useEffect(() => {

	}, [gameData, ownedGames, wishlist, currentUser])

	const handleGamesList = (e) => {
		e.preventDefault();
		// Remove game from ownedGames
		if (gameData.gameId.toString() in ownedGames) {
			dispatch(deleteOwnedGamesItem(currentUser.id, gameData.gameId));
		} else {
			// If game is in wishlist, remove, then add to ownedGames
			if(gameData.gameId.toString() in wishlist) {
				dispatch(deleteWishlistItem(currentUser.id, gameData.gameId));
			}
			dispatch(addOwnedGamesItem(currentUser.id, gameData));
		}
	}

	const iconButton = () => {
		if (gameData.gameId.toString() in ownedGames) {
			return FilledLibraryButton;
		} else {
			return LibraryButton;
		}
	}

	return (
		<img src={iconButton()} alt='' className='owned-game-button' onClick={handleGamesList}/>
	)
}

export default OwnedGamesButton;