import { useDispatch, useSelector } from "react-redux"
import FriendListItem from "../FriendListItem/FriendListItem";
import { useEffect } from "react";
import * as friendshipActions from '../../store/friendships';


export default function FriendsList() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const friends = Object.values(useSelector(state => state.friends));
  const friendRequests = useSelector(state => state.friendships.friendRequests);
  const pendingRequests = useSelector(state => state.friendships.pendingRequests);
  const otherUsers = Object.values(useSelector(state => state.friendships.otherUsers));

  useEffect(() => {
    dispatch(friendshipActions.fetchFriendRequests(currentUser.id));
    dispatch(friendshipActions.fetchPendingRequests(currentUser.id));
    dispatch(friendshipActions.fetchOtherUsers(currentUser.id));
  }, [dispatch, currentUser.id])

  return (
    <div className="friends-section">
      <h3>Friends</h3>
      {friends?.map(friend => {
        return <FriendListItem key={friend._id} user={friend} friendship={true} />
      })}
      <h3>Friend Requests</h3>
      {friendRequests?.map(request => {
        return <FriendListItem key={request.sender._id} user={request} friendship={false} status='request' />
      })}
      <h3>Pending Requests</h3>
      {pendingRequests?.map(request => {
        return <FriendListItem key={request.receiver._id} user={request} friendship={false} status='pending' />
      })}
      <h3>Search for Friends</h3>
      {otherUsers?.map(user => {
        return <FriendListItem key={user._id} user={user} friendship={false} status='none' />
      })}
    </div>
  )
}
