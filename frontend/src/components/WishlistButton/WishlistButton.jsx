import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import wishlistButton from "../../assets/images/wishlist.svg";
import FilledWishlistButton from "../../assets/images/filled-heart.svg";
import { addWishlistItem, deleteWishlistItem } from "../../store/wishlist";
import './WishlistButton.css';
import { deleteOwnedGamesItem } from "../../store/ownedGames";
import { useEffect } from "react";

const WishlistButton = ({ gameData }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const wishlist = useSelector(state => state.wishlist);
	const ownedGames = useSelector(state => state.ownedGames)
	const [icon, setIcon] = useState(() => {
		if (gameData.gameId.toString() in wishlist) {
			return FilledWishlistButton;
		} else {
			return wishlistButton;
		}
	});

	useEffect(() => {
		if (gameData.gameId.toString() in wishlist) {
			setIcon(FilledWishlistButton);
		} else {
			setIcon(wishlistButton);
		}
	}, [dispatch])

	const handleWishlist = (e) => {
		e.preventDefault();
		// Remove game from wishlist
		if (gameData.gameId.toString() in wishlist) {
			dispatch(deleteWishlistItem(currentUser.id, gameData.gameId));
			setIcon(wishlistButton)
		} else {
			// If game is in ownedGames, remove, then add to wishlist
			if(gameData.gameId.toString() in ownedGames) {
				dispatch(deleteOwnedGamesItem(currentUser.id, gameData.gameId));
			}
			dispatch(addWishlistItem(currentUser.id, gameData));
			setIcon(FilledWishlistButton)
		}
	}

	return (
		<img src={icon} alt='' className="wishlist-button" onClick={handleWishlist}/>
	)
}

export default WishlistButton;