import { useEffect, useState } from 'react';
import './FriendListItem.css';
import { useDispatch, useSelector } from 'react-redux';
import * as friendshipActions from '../../store/friendships';

const FriendListItem = ({ user, friendship = false, status = '' }) => {
	const dispatch = useDispatch();
	const [acceptedFriendship, setStatus] = useState(friendship);

	const removeFriend = e => {
		e.preventDefault();
		dispatch(friendshipActions.deleteAcceptedFriendship(user._id));
	}

	return (
		<div className='friend-item-container'>
			{friendship && (
				<>
					<h4>{user.username}</h4>
					<button className='negative-friend-button' onClick={removeFriend}>Remove</button>
				</>
			)}
			{!friendship && status === 'request' && (
				<>
					<h4>{user.sender.username}</h4>
					<div className='friendButtons'>
						<button className='accept-friend-button'>Accept</button>
						<button className='negative-friend-button'>Decline</button>
					</div>
				</>
			)}
			{!friendship && status === 'pending' && (
				<>
					<h4>{user.receiver.username}</h4>
					<div className='friendButtons'>
						<button className='negative-friend-button'>Cancel</button>
					</div>
				</>
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
