import './FriendListItem.css';
import { useDispatch, useSelector } from 'react-redux';
import * as friendshipActions from '../../store/friendships';

const FriendListItem = ({ user, friendship = false, status = '' }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);

	const removeFriend = e => {
		e.preventDefault();
		dispatch(friendshipActions.deleteAcceptedFriendship(user._id, currentUser.id));
	}

	const acceptFriendRequest = e => {
		e.preventDefault();
		dispatch(friendshipActions.acceptFriendship(currentUser.id, user.sender._id));
	}

	const declineFriendRequest = e => {
		e.preventDefault();
		dispatch(friendshipActions.deletePendingFriendship(currentUser.id, user.sender._id));
	}

	const cancelFriendRequest = e => {
		e.preventDefault();
		dispatch(friendshipActions.deletePendingFriendship(currentUser.id, user.receiver._id));
	}

	const sendFriendRequest = e => {
		e.preventDefault();
		dispatch(friendshipActions.requestFriendship(user._id));
	}

	return (
		<div className='friend-item-container'>
			{friendship && (
				<>
					<p>{user.username}</p>
					<button className='negative-friend-button' onClick={removeFriend}>Remove</button>
				</>
			)}
			{!friendship && status === 'request' && (
				<>
					<p>{user.sender.username}</p>
					<div className='friendButtons'>
						<button className='accept-friend-button' onClick={acceptFriendRequest}>Accept</button>
						<button className='negative-friend-button' onClick={declineFriendRequest}>Decline</button>
					</div>
				</>
			)}
			{!friendship && status === 'pending' && (
				<>
					<p>{user.receiver.username}</p>
					<div className='friendButtons'>
						<button className='negative-friend-button' onClick={cancelFriendRequest}>Cancel</button>
					</div>
				</>
			)}
			{!friendship && status === 'none' && (
				<>
					<p>{user.username}</p>
					<div className='friendButtons'>
						<button className='accept-friend-button' onClick={sendFriendRequest}>Request</button>
					</div>
				</>
			)}
		</div>
	)
}

export default FriendListItem;
