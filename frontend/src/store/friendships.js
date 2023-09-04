import jwtFetch from './jwt';

const RECEIVE_OTHER_USERS = 'RECEIVE_OTHER_USERS';
const RECEIVE_FRIEND_REQUESTS = 'RECEIVE_FRIEND_REQUESTS';
const RECEIVE_PENDING_REQUESTS = 'RECEIVE_PENDING_REQUESTS';

const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
const REMOVE_FRIENDSHIP = 'REMOVE_FRIENDSHIP';

// ACTIONS
// Receive all users
const receiveOtherUsers = otherUsers => ({
	type: RECEIVE_OTHER_USERS,
	otherUsers
})

// Receive friends request, users is the receiver.
const receiveFriendRequests = friendRequests => ({
	type: RECEIVE_FRIEND_REQUESTS,
	friendRequests
})

// Receive all pending friendships
const receivePendingRequests = pendingRequests => ({
	type: RECEIVE_PENDING_REQUESTS,
	pendingRequests
})

// Send friendship request from sender to receiver
const sendFriendRequest = friendship => ({
	type: SEND_FRIEND_REQUEST,
	friendship
})


// Accept friendship request between sender and receiver(receiver accepts)
const acceptFriendRequest = friendship => ({
	type: ACCEPT_FRIEND_REQUEST,
	friendship
})

// Remove friendship
const removeFriendship = friendship => ({
	type: REMOVE_FRIENDSHIP,
	friendship
})

export const fetchOtherUsers = userId => async dispatch => {
	const res = await jwtFetch(`/api/users/${userId}/otherUsers`);

	if (res.ok) {
		const otherUsers = await res.json();
		dispatch(receiveOtherUsers(otherUsers));
	}
}

export const fetchFriendRequests = userId => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${userId}/friendRequests`)

	if (res.ok) {
		const friendships = await res.json();
		dispatch(receiveFriendRequests(friendships));
	}
}

export const fetchPendingRequests = userId => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${userId}/pendingRequests`);

	if (res.ok) {
		const pendingFriendships = await res.json();
		dispatch(receivePendingRequests(pendingFriendships));
	}
}

export const requestFriendship = (senderId, receiverId) => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${senderId}/requestFriendship`, {
		method: 'POST',
		body: JSON.stringify({ receiverId: receiverId })
	})
	const friendship = await res.json();
	dispatch(sendFriendRequest(friendship));
}

export const acceptFriendship = (senderId, receiverId) => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${receiverId}/acceptFriendship`, {
		method: 'POST',
		body: JSON.stringify({ senderId: senderId })
	})
	const friendship = await res.json();
	dispatch(acceptFriendRequest(friendship));
}

export const deletePendingFriendship = (senderId, receiverId) => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${senderId}/deletePendingFriendship`, {
		method: 'DELETE',
		body: JSON.stringify({ receiverId })
	})
	const friendship = await res.json();
	dispatch(removeFriendship(friendship));
}

export const deleteAcceptedFriendship = (senderId, receiverId) => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${senderId}/deleteAcceptedFriendship`, {
		method: 'DELETE',
		body: JSON.stringify({ receiverId })
	})
	const friendship = await res.json();
	dispatch(removeFriendship(friendship));
}

const FriendshipsReducer = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_OTHER_USERS:
			return { ...state, otherUsers: action.otherUsers };
		case RECEIVE_FRIEND_REQUESTS:
			return { ...state, friendRequests: action.friendRequests };
		case RECEIVE_PENDING_REQUESTS:
			return { ...state, pendingRequests: action.pendingRequests };
		case SEND_FRIEND_REQUEST:
			return { ...state, [action.friendship._id]: action.friendship };
		case ACCEPT_FRIEND_REQUEST:
			return { ...state, [action.friendship._id]: action.friendship };
		case REMOVE_FRIENDSHIP:
			return { ...state, [action.friendship._id]: action.friendship };
		default:
			return state;
	}
}

export default FriendshipsReducer;
