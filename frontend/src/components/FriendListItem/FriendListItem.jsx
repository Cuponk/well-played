import { useEffect, useState } from 'react';
import './FriendListItem.css';
import { useDispatch, useSelector } from 'react-redux';
import { requestFriendship, deletePendingFriendship } from '../../store/friendships';

const FriendListItem = ({ user }) => {
	const currentUser = useSelector(state => state.session.user);
	const friendship = useSelector(state => Object.values(state.friendships).find(friendship => 
		friendship.sender === currentUser._id && friendship.receiver === user._id
	));
	const [status, setStatus] = useState(friendship?.accepted);
	const dispatch = useDispatch();

	useEffect(() => {

	}, [friendship])

	const handleSubmit = e => {
		e.preventDefault();
		// console.log('current user: ', currentUser._id)
		// console.log('user id: ', user._id)
		if (status) {
			// dispatch(deletePendingFriendship(currentUser._id, user._id));
			// setStatus(false);
		} else {
			dispatch(requestFriendship(currentUser._id, user._id));
			setStatus(true);
		}
	}

	return (
		<div className='friend-item-container'>
			<h4>{user.username}</h4>
			<button className='add-friend-button' onClick={handleSubmit}>{status ? 'pending' : 'add friend'}</button>
		</div>
	)
}

export default FriendListItem;