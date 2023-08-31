import './GameListItem.css'

const GameListItem = ({ game }) => {
	return (
		<div className='game-list-item-container'>
			<div className='game-list-item-portrait'>
				<img src='game.photoUrl' alt='game portrait'/>
			</div>
			<h4>Title</h4>
			<h4>Release Date</h4>
		</div>
	)
}

export default GameListItem;