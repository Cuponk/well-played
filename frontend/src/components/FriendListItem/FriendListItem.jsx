import { useEffect, useState } from 'react';
import './FriendListItem.css';
import { useSelector } from 'react-redux';

const FriendListItem = ({ user }) => {
	const currentUser = useSelector(state => state.session.user);
	const [status, setStatus] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();

	}

	return (
		<div className='friend-item-container'>
			<h4>{user.username}</h4>
			<button className='add-friend-button' onClick={handleSubmit}>{status ? 'pending' : 'add friend'}</button>
		</div>
	)
}

export default FriendListItem;