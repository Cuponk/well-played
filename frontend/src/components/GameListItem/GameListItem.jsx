import './GameListItem.css'

const GameListItem = ({ game }) => {
	return (
		<div className='game-list-item-container'>
			<img src={game?.coverUrl} alt='game portrait' className='game-list-item-portrait'/>
			<h4>{game?.name}</h4>
			<p>Release Year: {game?.releaseYear}</p>
		</div>
	)
}

export default GameListItem;