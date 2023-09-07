import jwtFetch from './jwt';

const RECEIVE_OTHER_USERS = 'RECEIVE_OTHER_USERS';
const RECEIVE_FRIEND_REQUESTS = 'RECEIVE_FRIEND_REQUESTS';
const RECEIVE_PENDING_REQUESTS = 'RECEIVE_PENDING_REQUESTS';

export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
export const CANCEL_FRIEND_REQUEST = 'CANCEL_FRIEND_REQUEST';
export const DECLINE_FRIEND_REQUEST = 'DECLINE_FRIEND_REQUEST';
export const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
export const REMOVE_FRIENDSHIP = 'REMOVE_FRIENDSHIP';

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
const removeFriendship = friendshipId => ({
	type: REMOVE_FRIENDSHIP,
	friendshipId
})

const cancelFriendRequest = friendship => ({
	type: CANCEL_FRIEND_REQUEST,
	friendship
})

const declineFriendRequest = friendshipId => ({
	type: DECLINE_FRIEND_REQUEST,
	friendshipId
})

export const fetchOtherUsers = userId => async dispatch => {
	const res = await jwtFetch(`/api/users/${userId}/otherUsers`);

	if (res.ok) {
		const otherUsers = await res.json();
		const otherUsersObj = {};
		otherUsers.forEach(user => {
			otherUsersObj[user._id] = user;
		})
		dispatch(receiveOtherUsers(otherUsersObj));
	}
}

export const fetchFriendRequests = userId => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${userId}/friendRequests`)

	if (res.ok) {
		const friendships = await res.json();
		const friendshipsObj = {};
		friendships.forEach(friendship => {
			friendshipsObj[friendship._id] = friendship;
		})
		dispatch(receiveFriendRequests(friendshipsObj));
	}
}

export const fetchPendingRequests = userId => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${userId}/pendingRequests`);

	if (res.ok) {
		const pendingFriendships = await res.json();
		const pendingFriendshipsObj = {};
		pendingFriendships.forEach(friendship => {
			pendingFriendshipsObj[friendship._id] = friendship;
		})
		dispatch(receivePendingRequests(pendingFriendshipsObj));
	}
}

export const requestFriendship = (currentUserId, receiverId) => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${currentUserId}/requestFriendship`, {
		method: 'POST',
		body: JSON.stringify({ receiverId: receiverId })
	})
	const friendship = await res.json();
	dispatch(sendFriendRequest(friendship));
}

export const acceptFriendship = (currentUserId, senderId) => async dispatch => {
	const res = await jwtFetch(`/api/friendships/${currentUserId}/acceptFriendship`, {
		method: 'POST',
		body: JSON.stringify({ senderId: senderId })
	})
	const friendship = await res.json();
	dispatch(acceptFriendRequest(friendship));
}

// Cancel a friend request that you sent.
export const cancelSentRequest = (currentUserId, otherUserId) => async dispatch => {
	// Doesn't matter what order we request sender/reciever. Backend routes looks
	// for both sender/receiver and receiver/sender.
	const res = await jwtFetch(`/api/friendships/${currentUserId}/deletePendingFriendship`, {
		method: 'DELETE',
		body: JSON.stringify({ otherUserId: otherUserId })
	})
	const friendship = await res.json();
	dispatch(cancelFriendRequest(friendship));
}

// Decline a friend request that you received.
export const declineReceivedRequest = (currentUserId, otherUserId) => async dispatch => {
	// Doesn't matter what order we request sender/reciever. Backend routes looks
	// for both sender/receiver and receiver/sender.
	const res = await jwtFetch(`/api/friendships/${currentUserId}/deletePendingFriendship`, {
		method: 'DELETE',
		body: JSON.stringify({ otherUserId: otherUserId })
	})
	const friendship = await res.json();
	dispatch(declineFriendRequest(friendship));
}

export const deleteAcceptedFriendship = (senderId, otherUserId) => async dispatch => {
	// Doesn't matter what order we request sender/reciever. Backend routes looks
	// for both sender/receiver and receiver/sender.
	const res = await jwtFetch(`/api/friendships/${senderId}/deleteAcceptedFriendship`, {
		method: 'DELETE',
		body: JSON.stringify({ otherUserId })
	})
	if (res.ok) {
		dispatch(removeFriendship(otherUserId));
	}
}

const initialState = {
	otherUsers: {},
	pendingRequests: {},
	friendRequests: {}
}

const FriendshipsReducer = (state = initialState, action) => {
	// const newState = { ...state };
	const newState = {
		otherUsers: { ...state.otherUsers },
		pendingRequests: { ...state.pendingRequests },
		friendRequests: { ...state.friendRequests }
	}
	switch (action.type) {
		// Loading actions.
		case RECEIVE_OTHER_USERS:
			return { ...state, otherUsers: action.otherUsers };
		case RECEIVE_PENDING_REQUESTS:
			return { ...state, pendingRequests: action.pendingRequests };
		case RECEIVE_FRIEND_REQUESTS:
			return { ...state, friendRequests: action.friendRequests };
		// Updating actions
		case SEND_FRIEND_REQUEST:
			// Add friendship to pending requests and remove from other users.
			newState.pendingRequests[action.friendship._id] = action.friendship;
			delete newState.otherUsers[action.friendship.receiver._id];
			return newState;
		case ACCEPT_FRIEND_REQUEST:
			delete newState.friendRequests[action.friendship._id];
			return newState
		// Used for cancelling a sent request
		case CANCEL_FRIEND_REQUEST:
			// You need userInfo to populate the otherUsers slice of state.
			const pendingUserId = newState.pendingRequests[action.friendship._id].receiver._id;
			const pendingUserInfo = newState.pendingRequests[action.friendship._id].receiver;
			newState.otherUsers[pendingUserId] = pendingUserInfo;
			delete newState.pendingRequests[action.friendship._id];
			return newState;
		// You need userInfo to populate the otherUsers slice of state.
		case DECLINE_FRIEND_REQUEST:
			const userId = newState.friendRequests[action.friendship._id].sender._id;
			const userInfo = newState.friendRequests[action.friendship._id].sender;
			newState.otherUsers[userId] = userInfo;
			delete newState.friendRequests[action.friendship._id];
			return newState;
		default:
			return state;
	}
}

export default FriendshipsReducer;
