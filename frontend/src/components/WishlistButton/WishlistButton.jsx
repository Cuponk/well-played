import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import wishlistButton from "../../assets/images/wishlist.svg";
import FilledWishlistButton from "../../assets/images/filled-heart.svg";
import { addWishlistItem, deleteWishlistItem} from "../../store/wishlist";
import './WishlistButton.css';

import { useHistory } from "react-router-dom";

const WishlistButton = ({ gameData, icon, setIcon  }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);
	const wishlist = useSelector(state => state.wishlist);
	const history = useHistory();

	const gameIdString = gameData?.gameId.toString();
	const isWishlisted = gameIdString in wishlist;

	const handleWishlist = (e) => {
		e.stopPropagation()

		if (Object.keys(currentUser).length !== 0) {
			if (isWishlisted) {
				setIcon(wishlistButton);
				dispatch(deleteWishlistItem(currentUser?.id, gameData.gameId));
			} else {
				setIcon(FilledWishlistButton);
				dispatch(addWishlistItem(currentUser?.id, gameData));
			}
		} else {
			history.push('/login');
		}
	}

	return (
		<img src={icon} alt='' className="wishlist-button" onClick={handleWishlist}/>
	)
}

export default WishlistButton;