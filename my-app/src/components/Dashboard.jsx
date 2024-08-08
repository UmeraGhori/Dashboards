import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem';
import apiClient from '../apiClient';  

const Dashboard = () => {
  const [dashboardNumber, setDashboardNumber] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dashboardResponse = await apiClient.get('/dashboard/dashboardNumber');
        setDashboardNumber(dashboardResponse.data.dashboardNumber);

        const usersResponse = await apiClient.get('/user/userInfo/allUsers');
        setUsers(usersResponse.data);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleShowDetails = () => {
    if (selectedUser) {
      navigate(`/user/${selectedUser.userId}`);
    } else {
      alert('Please select a user to view details');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen">Error: {error.message}</div>;
  }

  return (
    <div className="flex h-screen">
      <MenuItem />
      <main className="flex-1 bg-gradient-to-b from-[#F2F2E7] via-[#CEDDDC] to-[#E6EFF8] p-8">
        <h1 className="text-2xl font-bold mb-6">{` ${dashboardNumber}`}</h1>
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Salutation</th>
              <th className="py-2 px-4 border-b">First Name</th>
              <th className="py-2 px-4 border-b">Middle Name</th>
              <th className="py-2 px-4 border-b">Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.userId}  
                className={`cursor-pointer ${selectedUser && selectedUser.userId === user.userId ? 'bg-gray-200' : ''}`}
                onClick={() => setSelectedUser(user)}
              >
                <td className="py-2 px-4 border-b">{user.userId}</td>
                <td className="py-2 px-4 border-b">{user.salutation}</td>
                <td className="py-2 px-4 border-b">{user.firstName}</td>
                <td className="py-2 px-4 border-b">{user.middleName || ''}</td>
                <td className="py-2 px-4 border-b">{user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleShowDetails}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Show Details
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
