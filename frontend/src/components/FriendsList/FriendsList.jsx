import { shallowEqual, useDispatch, useSelector } from "react-redux"
import FriendListItem from "../FriendListItem/FriendListItem";
import { useEffect } from "react";
import * as friendshipActions from '../../store/friendships';
import './FriendsList.css';


export default function FriendsList() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const friends = Object.values(useSelector(state => state.friends));
  const friendRequests = Object.values(useSelector(state => state.friendships.friendRequests));
  const pendingRequests = Object.values(useSelector(state => state.friendships.pendingRequests));
  const otherUsers = Object.values(useSelector(state => state.friendships.otherUsers));

  useEffect(() => {
    dispatch(friendshipActions.fetchFriendRequests(currentUser.id));
    dispatch(friendshipActions.fetchPendingRequests(currentUser.id));
    dispatch(friendshipActions.fetchOtherUsers(currentUser.id));
  }, [dispatch, currentUser.id])

  return (
    <div className="friends-section">
      <div className="friends-mini-section">
        <h3>Friends</h3>
        <h3>({friends.length})</h3>
      </div>
      <div className="friends-content">
        {friends.length > 0 ? friends?.map(friend => {
          return <FriendListItem key={friend._id} user={friend} friendship={true} />
        }) : <p className="friends-placeholder">No friends to display yet</p>}
      </div>

      <div className="friends-mini-section">
        <h3>Friend Requests</h3>
        <h3>({friendRequests.length})</h3>
      </div>
      <div className="friends-content">
        {friendRequests.length > 0 ? friendRequests?.map(request => {
          return <FriendListItem key={request.sender._id} user={request} friendship={false} status='request' />
        }) : <p className="friends-placeholder">No friend requests from other users</p>}
      </div>

      <div className="friends-mini-section">
        <h3>Pending Requests</h3>
        <h3>({pendingRequests.length})</h3>
      </div>
      <div className="friends-content">
        {pendingRequests.length > 0 ? pendingRequests?.map(request => {
          return <FriendListItem key={request.receiver._id} user={request} friendship={false} status='pending' />
        }) : <p className="friends-placeholder">No pending requests</p>}
      </div>

      <div className="friends-mini-section">
        <h3>Search for Friends</h3>
        <h3>({otherUsers.length})</h3>
      </div>
      <div className="friends-content last-friends-content">
        {otherUsers.length > 0 ? otherUsers?.map(user => {
          return <FriendListItem key={user._id} user={user} friendship={false} status='none' />
        }) : <p className="friends-placeholder">No other users to display</p>}
      </div>

    </div>
  )
}
