import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Settings = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Error logging out');
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white mb-8">Settings</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft p-6">
        <div className="space-y-6">
          <button
            onClick={handleLogout}
            className="w-full md:w-auto px-6 py-2.5 bg-red-500 hover:bg-red-600 
              text-white font-medium rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default Settings;