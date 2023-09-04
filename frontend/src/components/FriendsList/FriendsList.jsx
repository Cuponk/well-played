import { useDispatch, useSelector } from "react-redux"
import FriendListItem from "../FriendListItem/FriendListItem";
import { useEffect } from "react";
import * as friendshipActions from '../../store/friendships';


export default function FriendsList() {
  const dispatch = useDispatch();
  const friends = Object.values(useSelector(state => state.friends));
  const user = useSelector(state => state.user);

  useEffect(() => {
    dispatch(friendshipActions.fetchFriendRequests(user.id))
  }, [dispatch])

  return (
    <div className="friends-section">
      <h2>Friends</h2>
      {friends?.map(friend => {
        return <FriendListItem key={friend._id} user={friend} friendship={true} />
      })}
      <h2>Friend Requests</h2>

      <h2>Pending Requests</h2>

      <h2>Search for Friends</h2>
    </div>
  )
}
