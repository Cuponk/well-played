import { useEffect, useState } from 'react';
import './FriendListItem.css';
import { useDispatch, useSelector } from 'react-redux';
import * as friendshipActions from '../../store/friendships';

const FriendListItem = ({ user, friendship = false }) => {
	const [acceptedFriendship, setStatus] = useState(friendship);
	const dispatch = useDispatch();

	// const handleSubmit = e => {
	// 	e.preventDefault();
	// 	// console.log('current user: ', currentUser._id)
	// 	// console.log('user id: ', user._id)
	// 	if (status) {
	// 		// dispatch(deletePendingFriendship(currentUser._id, user._id));
	// 		// setStatus(false);
	// 	} else {
	// 		dispatch(requestFriendship(currentUser._id, user._id));
	// 		setStatus(true);
	// 	}
	// }
	const removeFriend = e => {
		e.preventDefault();
		dispatch(friendshipActions.deleteAcceptedFriendship(user._id));
	}

	return (
		<div className='friend-item-container'>
			<h4>{user.username}</h4>
			{friendship && (
				<button className='remove-friend-button' onClick={removeFriend}>Remove</button>
			)}
		</div>
	)
}

export default FriendListItem;


/*
Friends are accepted
- accepted true
- remove friend

New friend requests
- decline

Pending requests
- cancel request

Search for friends
- add friend

*/
