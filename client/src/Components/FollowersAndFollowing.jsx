import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from 'react-query';

const Userlists = ({userInfo ,  userList }) => {
  console.log("useList : " + userList)
  const [following, setFollowing] = useState(userList);
  const queryClient = useQueryClient();
  
  // Function to retrieve token from localStorage
  const getToken = () => {
    return localStorage.getItem('token');
  }

  const followUserMutation = useMutation((id) => fetch(`http://localhost:8000/followuser/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }));

  const unfollowUserMutation = useMutation((id) => fetch(`http://localhost:8000/unfollowuser/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getToken()}`,
    },
  }));

  const isUserFollowed = (userId) => {
    // Check if the displayed user is followed by the current user
    return userInfo && userInfo.follows.includes(userId);
  };

  const onToggleFollow = async (id, isFollowed) => {
    try {
      if (isFollowed) {
        await unfollowUserMutation.mutateAsync(id);
      } else {
        await followUserMutation.mutateAsync(id);
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {following.map((user) => (
        <div key={user._id} className='flex items-center justify-between bg-white mb-1 p-4 w-full'>
          <div className='flex items-center'>
            <img src={user.image} alt='' className='h-[60px] w-[60px]' />
            <Link to={`/UserProfile/${user._id}`} className='ml-4'>
              {user?.username}
            </Link>
          </div>
          <p
            onClick={() => onToggleFollow(user._id, isUserFollowed(user._id))}
            className={`cursor-pointer ${isUserFollowed(user._id) ? 'text-red-500' : 'text-blue-500'}`}
          >
            {isUserFollowed(user._id) ? 'Unfollow' : 'Follow back'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Userlists;
