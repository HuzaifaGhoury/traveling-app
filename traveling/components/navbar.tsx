"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../app/firebase';

const Navbar = () => {
  const router = useRouter();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  useEffect(() => {
    setIsLoggedOut(false);
  }, []);
  console.log(auth.currentUser)

  const handleLogout = async () => {
    try {
      await auth.signOut();
      
      setIsLoggedOut(true);
      
      router.push('/');
      // console.log(auth.currentUser)
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex justify-center align-middle">
      <div className="relative w-8/12 h-14 top-7 rounded-3xl bg-white text-stone-950">
        <div className="flex items-center gap-40 mt-3 ml-6">
          <ul className="flex font-bold">
            <li className="mx-2" onClick={() => router.push('/')}>
              Home
            </li>
            <li
              className="mx-2 cursor-pointer hover:text-yellow-300"
              onClick={() => router.push('/experiences')}
            >
              Experiences
            </li>
            <li className="mx-2">About</li>
            <li className="mx-2">Reviews</li>
            <li className="mx-2">Contact</li>
          </ul>
          {!isLoggedOut ? (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Navbar;