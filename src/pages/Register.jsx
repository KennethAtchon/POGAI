import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgLogin from "../assets/bglogin.jpg";
import { IoMdArrowBack } from "react-icons/io";
import { urlendpoint } from '../constants';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${urlendpoint.value}/api/add_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      const { token } = data;

      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error.message);
      // Handle registration error
    }
  };

  return (
    <section className="w-screen h-screen overflow-hidden">
      <div className="h-screen w-screen ">
      <IoMdArrowBack 
          className="text-2xl h-[36px] w-[36px] absolute top-3 left-4 cursor-pointer"
          onClick={() => navigate('/')}
        />

        <div className="flex flex-row h-full w-full p-12 py-28 ">
          <div className="flex-1 p-8 rounded-2xl md:rounded-l-2xl md:rounded-r-none bg-[#FF0031] text-white">
            <div className="flex flex-col justify-center items-center pb-8">
              <p className="text-lg">PogAI</p>
            </div>
            <p className="text-lg mb-4 font-bold">Create an Account</p>
            <form onSubmit={handleRegister}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full text-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="text-white py-2 px-4 rounded-md bg-red-400 hover:bg-red-300">
                Register
              </button>
            </form>
            <p className="mt-4 text-sm pt-2">
              Already have an account? <a href="/login" className="text-white underline">Log in</a>
            </p>
          </div>

          <div className="flex-1 hidden md:block rounded-r-2xl">
            <img
              src={BgLogin}
              alt="Mobile Register"
              className="w-full h-full object-cover rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
