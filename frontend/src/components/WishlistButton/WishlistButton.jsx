import { useDispatch, useSelector } from "react-redux";
import Wishlist from "../../assets/images/wishlist.svg";
import { addWishlistItem, deleteWishlistItem } from "../../store/wishlist";
import './WishlistButton.css';

const WishlistButton = ({ gameData }) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const wishlist = useSelector(state => state.wishlist);

	const handleWishlist = () => {
		if (gameData.gameId.toString() in wishlist) {
			dispatch(deleteWishlistItem(user.id, gameData.gameId));
		} else {
			dispatch(addWishlistItem(user.id, gameData));
		}
	}

	return (
		<img src={Wishlist} alt='' className="wishlist-button" onClick={handleWishlist}/>
	)
}

export default WishlistButton;