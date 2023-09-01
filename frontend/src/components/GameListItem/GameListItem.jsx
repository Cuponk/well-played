import { NavLink } from "react-router-dom";
import './GameListItem.css'

const GameListItem = ({ game }) => {

	return (
		<div className='game-list-item-container'>
			{game && (
				<NavLink to={`/games/${game?.gameId}`} className='game-portrait-link'>
					<img src={game?.coverUrl} alt='' className='game-list-item-portrait' />
				</NavLink>
			)}
			<p className='game-tile-name'>{game?.name}</p>
			<p className='game-tile-year'>{game?.releaseYear}</p>
		</div>
	)
}

export default GameListItem;