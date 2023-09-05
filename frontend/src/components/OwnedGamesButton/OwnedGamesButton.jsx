import { useDispatch, useSelector } from "react-redux";
import AddButton from "../../assets/images/add-to-library.svg";
import { addOwnedGamesItem, deleteOwnedGamesItem } from "../../store/ownedGames";
import './OwnedGamesButton.css';

const OwnedGamesButton = ({ gameData }) => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const ownedGames = useSelector(state => state.ownedGames);

	const handleGamesList = () => {
		if (gameData.gameId.toString() in ownedGames) {
			dispatch(deleteOwnedGamesItem(user.id, gameData.gameId));
		} else {
			dispatch(addOwnedGamesItem(user.id, gameData));
		}
	}

	return (
		<img src={AddButton} alt='' className='owned-game-button' onClick={handleGamesList}/>
	)
}

export default OwnedGamesButton;