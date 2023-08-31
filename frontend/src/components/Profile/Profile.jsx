import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GameListItem from '../GameListItem/GameListItem';
import './Profile.css';
import { useState } from 'react';
import FriendListItem from '../FriendListItem/FriendListItem';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [users, setUsers] = useState({})

  useEffect(() => {
	fetch('/api/users')
	.then(res => res.json())
	.then(data => {
		// console.log(data)
		setUsers(data)
	})
  }, [])

  const handleUsers = () => {
	const allUsers = Object.values(users).map(user => {
		console.log(user.username);
		return <FriendListItem user={user}/>
	})
	return allUsers;
  }

  return (
    <>
      <h2>Welcome, {currentUser.username}</h2>
	  <div className='profile-page-container'>
		<div className='profile-page-lists'> 
			Wishlist
			<div className='profile-page-wishlist'>
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
			</div>

			Library
			<div className='profile-page-library'> 
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
				<GameListItem />
			</div>
		</div>
		<div className='profile-page-friends'>
			<h3>Friends</h3>
			{handleUsers()}
		</div>
	  </div>
    </>
  );
}

export default Profile;
