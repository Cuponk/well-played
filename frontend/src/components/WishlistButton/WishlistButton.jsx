import { useDispatch, useSelector } from "react-redux";
import Wishlist from "../../assets/images/wishlist.svg";
import { addWishlistItem, deleteWishlistItem } from "../../store/wishlist";
import './WishlistButton.css';
import { deleteOwnedGamesItem } from "../../store/ownedGames";
import { useEffect } from "react";

const WishlistButton = ({ gameData }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const wishlist = useSelector(state => state.wishlist);
	const ownedGames = useSelector(state => state.ownedGames)
	
	useEffect(() => {

	}, [gameData, wishlist, ownedGames, currentUser])

	const handleWishlist = (e) => {
		e.preventDefault();
		// Remove game from wishlist
		if (gameData.gameId.toString() in wishlist) {
			dispatch(deleteWishlistItem(currentUser.id, gameData.gameId));
		} else {
			// If game is in ownedGames, remove, then add to wishlist
			if(gameData.gameId.toString() in ownedGames) {
				dispatch(deleteOwnedGamesItem(currentUser.id, gameData.gameId));
			}
			dispatch(addWishlistItem(currentUser.id, gameData));
		}
	}
	
	return (
		<img src={Wishlist} alt='' className="wishlist-button" onClick={handleWishlist}/>
	)
}

export default WishlistButton;