import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BgLogin from "../assets/bglogin.jpg";
import { IoMdArrowBack } from "react-icons/io";
import { urlendpoint } from '../constants';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${urlendpoint.value}/api/get_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { user, token } = data;

      localStorage.setItem('username', user.username);
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login error
    }
  };

  return (
    <section className="bg-primary w-screen h-screen overflow-hidden">
      <div className="h-screen w-screen ">
        <IoMdArrowBack 
          className="text-2xl h-[36px] w-[36px] absolute top-3 left-4 cursor-pointer"
          onClick={() => navigate('/')}
        />

        <div className="flex flex-row h-full w-full p-12 py-28 ">
          <div className="flex-1 primary-bg p-8 rounded-2xl md:rounded-l-2xl md:rounded-r-none bg-[#092689] text-white">
            <div className="flex flex-col justify-center items-center pb-8">
              <p className="text-lg">PogAI</p>
            </div>
            <p className="text-lg mb-4 font-bold">Welcome Back!</p>
            <form onSubmit={handleLogin}>
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
              <button type="submit" className="text-white py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-400">
                Login
              </button>
            </form>
            <p className="mt-4 text-sm pt-2">
              Don't have an account? <a href="/signup" className="text-white underline">Sign up</a>
            </p>
          </div>

          <div className="flex-1 hidden md:block rounded-r-2xl">
            <img
              src={BgLogin}
              alt="Mobile Login"
              className="w-full h-full object-cover rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
