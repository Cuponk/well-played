import './FriendListItem.css';
import { useDispatch, useSelector } from 'react-redux';
import * as friendshipActions from '../../store/friendships';

const FriendListItem = ({ user, friendship = false, status = '' }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.user);

	const removeFriend = e => {
		e.preventDefault();
		dispatch(friendshipActions.deleteAcceptedFriendship(currentUser.id, user._id));
	}

	const acceptFriendRequest = e => {
		e.preventDefault();
		dispatch(friendshipActions.acceptFriendship(currentUser.id, user.sender._id));
	}

	const cancelFriendRequest = e => {
		e.preventDefault();
		dispatch(friendshipActions.cancelSentRequest(currentUser.id, user.receiver._id));
	}

	const declineFriendRequest = e => {
		e.preventDefault();
		dispatch(friendshipActions.declineReceivedRequest(currentUser.id, user.sender._id));
	}

	const sendFriendRequest = e => {
		e.preventDefault();
		dispatch(friendshipActions.requestFriendship(currentUser.id, user._id));
	}

	return (
		<div className='friend-item-container'>
			{friendship && (
				<>
					<div className='user-icon'>
						<i className='fa-regular fa-user'></i>
						<p className='username-text'>{user.username}</p>
					</div>
					<button className='negative-friend-button' onClick={removeFriend}>Remove</button>
				</>
			)}
			{!friendship && status === 'request' && (
				<>
					<div className='user-icon'>
						<i className='fa-regular fa-user'></i>
						<p className='username-text'>{user.sender.username}</p>
					</div>
					<div className='friend-buttons double-button'>
						<button className='accept-friend-button' onClick={acceptFriendRequest}>Accept</button>
						<button className='negative-friend-button' onClick={declineFriendRequest}>Decline</button>
					</div>
				</>
			)}
			{!friendship && status === 'pending' && (
				<>
					<div className='user-icon'>
						<i className='fa-regular fa-user'></i>
						<p className='username-text'>{user.receiver.username}</p>
					</div>
					<div className='friend-buttons'>
						<button className='negative-friend-button' onClick={cancelFriendRequest}>Cancel</button>
					</div>
				</>
			)}
			{!friendship && status === 'none' && (
				<>
					<div className='user-icon'>
						<i className='fa-regular fa-user'></i>
						<p className='username-text'>{user.username}</p>
					</div>
					<div className='friend-buttons'>
						<button className='accept-friend-button' onClick={sendFriendRequest}>Request</button>
					</div>
				</>
			)}
		</div>
	)
}

export default FriendListItem;
