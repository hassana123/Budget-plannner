import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';
import Navbar from '../Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate('/overview');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen px-3 my-20  md:flex  justify-center  bg-gray-50 dark:bg-gray-900">
        <div className="">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Sign in to Trackly
            </h2>
          </div>
          <form className="mt-8 space-y-6 " onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-5">
              <div>
                <input
                  type="email"
                  required
                  className="input-field rounded-md py-4 border border-gray-900"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="password"
                  required
                  className="input-field rounded-md py-4 border border-gray-900"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="btn-primary w-full">
                Sign in
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <NavLink to="/register" className="text-[#FF4F9A]  font-medium hover:underline">
                Sign up
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
