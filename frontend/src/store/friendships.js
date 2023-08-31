import jwtFetch from './jwt';

const RECEIVE_USERS = 'RECEIVE_USERS';
// const RECEIVE_FRIENDS = 'RECEIVE_FRIENDS';
const RECEIVE_PENDING_FRIENDS = 'RECEIVE_PENDING_FRIENDS';

const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
const REMOVE_FRIENDSHIP = 'REMOVE_FRIENDSHIP';

// ACTIONS
// Receive all users
const receiveUsers = users => ({
	type: RECEIVE_USERS,
	users
})

// Receive all friendships for user
// const receiveFriends = friendships => ({
// 	type: RECEIVE_FRIENDS,
// 	friendships
// })

// Receive all pending friendships
const receivePendingFriends = friendships => ({
	type: RECEIVE_PENDING_FRIENDS,
	friendships
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

const fetchUsers = () => async dispatch => {
	const res = await jwtFetch('/api/users');

	if (res.ok) {
		const users = await res.json();
		dispatch(receiveUsers(users));
	}
}

// const fetchFriends = userId => async dispatch => {
// 	const res = await jwtFetch(`/api/${userId}/friends`)

// 	if (res.ok) {
// 		const friendships = await res.json();
// 		dispatch(receiveFriends(friendships));
// 	}
// }

const fetchPendingFriends = userId => async dispatch => {
	const res = await jwtFetch(`/api/${userId}/pendingRequests`);

	if (res.ok) {
		const pendingFriendships = await res.json();
		dispatch(receivePendingFriends(pendingFriendships));
	}
}

const requestFriendship = (senderId, receiverId) => async dispatch => {
	const res = await jwtFetch(`/api/${senderId}/requestFriendship`, {
		method: 'POST',
		body: JSON.stringify({ receiverId: receiverId })
	})
	const friendship = await res.json();
	dispatch(sendFriendRequest(friendship));
}

const acceptFriendship = (senderId, receiverId) => async dispatch => {
	const res = await jwtFetch(`/api/${receiverId}/acceptFriendship`, {
		method: 'POST',
		body: JSON.stringify({ senderId: senderId })
	})
	const friendship = await res.json();
	dispatch(acceptFriendRequest(friendship));
}

const deleteFriendship = (senderId, receiverId) => async dispatch => {
	const res = await jwtFetch(`/api/${senderId}/deleteFriendship`, {
		method: 'DELETE',
		body: JSON.stringify({ receiverId })
	})
	const friendship = await res.json();
	dispatch(removeFriendship(friendship));
}

const FriendshipsReducer = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_USERS:
			return {...state, users: action.users};
		case RECEIVE_PENDING_FRIENDS:
			return {...state, friendships: action.friendships};
		case SEND_FRIEND_REQUEST:
			return {...state, [action.friendship._id]: action.friendship};
		case ACCEPT_FRIEND_REQUEST:
			return {...state, [action.friendship._id]: action.friendship};
		case REMOVE_FRIENDSHIP:
			return {...state, [action.friendship._id]: action.friendship};
		default:
			return state;
	}
}

export default FriendshipsReducer;