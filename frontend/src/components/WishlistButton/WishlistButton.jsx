import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import wishlistButton from "../../assets/images/wishlist.svg";
import FilledWishlistButton from "../../assets/images/filled-heart.svg";
import { addWishlistItem, deleteWishlistItem, fetchWishlist } from "../../store/wishlist";
import './WishlistButton.css';
import { deleteOwnedGamesItem, fetchOwnedGames } from "../../store/ownedGames";
import { useEffect } from "react";

const WishlistButton = ({ gameData, icon, setIcon  }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const wishlist = useSelector(state => state.wishlist);
	// const ownedGames = useSelector(state => state.ownedGames);

	const gameIdString = gameData?.gameId.toString();
	const isWishlisted = gameIdString in wishlist;
	// const [icon, setIcon] = useState(isWishlisted ? FilledWishlistButton : wishlistButton);

	// useEffect(() => {
	// 	setIcon(isWishlisted ? FilledWishlistButton : wishlistButton);
	// }, [wishlist, gameIdString])

	// useEffect(() => {
	// 	if (currentUser?.id) {
	// 		dispatch(fetchWishlist(currentUser.id));
	// 	}
	// }, [dispatch, currentUser?.id])

	const handleWishlist = (e) => {
		e.stopPropagation()

		if (isWishlisted) {
			setIcon(wishlistButton);
			dispatch(deleteWishlistItem(currentUser?.id, gameData.gameId));
		} else {
			// if(gameIdString in ownedGames) {
			// 	dispatch(deleteOwnedGamesItem(currentUser?.id, gameData.gameId));
			// }
			setIcon(FilledWishlistButton);
			dispatch(addWishlistItem(currentUser?.id, gameData));
		}
	}

	return (
		<img src={icon} alt='' className="wishlist-button" onClick={handleWishlist}/>
	)
}

export default WishlistButton;