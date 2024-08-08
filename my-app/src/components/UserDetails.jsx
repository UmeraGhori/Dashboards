import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient'; 
import MenuItem from './MenuItem';

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await apiClient.get(`/user/userInfo/${userId}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!user) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen">
      <MenuItem />
      <main className="flex-1 bg-gradient-to-b from-[#F2F2E7] via-[#CEDDDC] to-[#E6EFF8] p-8">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => navigate('/')}
        >
          All Users
        </button>
        <h1 className="text-2xl font-bold mb-6">User Details</h1>
        <table className="min-w-full bg-white border border-gray-300">
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">ID</td>
              <td className="py-2 px-4 border-b">{user.userId}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Salutation</td>
              <td className="py-2 px-4 border-b">{user.salutation}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">First Name</td>
              <td className="py-2 px-4 border-b">{user.firstName}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Middle Name</td>
              <td className="py-2 px-4 border-b">{user.middleName || ''}</td>
            </tr>
            <tr>
              <td className="py-2 px-4 border-b">Last Name</td>
              <td className="py-2 px-4 border-b">{user.lastName}</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default UserDetails;
