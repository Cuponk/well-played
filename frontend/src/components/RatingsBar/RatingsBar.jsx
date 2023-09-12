import './RatingsBar.css';

const RatingsBar = ({ type, rating }) => {
	return (
		<div className='ratings-full-container'>
			<p className='ratings-type'>{type}</p>
			<div className='ratings-bar-background'>
				<div className='ratings-bar-progress-bar' style={{ width: `${rating * 20}% ` }}>
				</div>
			</div>
			<p className='ratings-ratings'>{rating}</p>
		</div>

	)
}

export default RatingsBar;