import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RiNotification2Line, RiShutDownLine } from 'react-icons/ri';

export default function DashNav() {
  const [isOpen, setIsOpen] = useState(false);  
  const [profileImage, setProfileImage] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYVXAkCKpmsjto25w792EOy3bC6s8lMV3t407nUSY&s');
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setToken(localStorage.getItem('token'));
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`/api/admins?action=user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setUser(data.user);
                    console.log(data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        if (token) {
            fetchUser();
        }
    }, [token]);

  const LogOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <header className="bg-gray-900 text-white border-b border-gray-500">
      <nav className="container mx-auto py-4 px-8 flex items-center justify-between">
        <Link href="/adminpanel" legacyBehavior>
          <a className='text-2xl font-bold'>Boardroom Management Dashboard</a>
        </Link>
        <div className="flex items-center">
          <button
            className="mr-4 flex items-center focus:outline-none"
          >
            <div className="relative">
              <input
                type="file"
                id="profile-image-upload"
                className="absolute top-0 left-0 w-0 h-0 opacity-0"
              />
              <label htmlFor="profile-image-upload">
                <img
                  src={profileImage} // Use the profileImage state as the source
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
                {isOpen && ( // Display upload indicator only when the modal is open
                  <div className="absolute bottom-0 right-0 bg-white rounded-full p-1">
                    <div className="bg-blue-500 w-2.5 h-2.5 rounded-full animate-pulse"></div>
                  </div>
                )}
              </label>
            </div>
            <span className="ml-2">Hello,</span> 
            <span className="ml-2">{user?.name}</span>
          </button>
          <RiNotification2Line
            className="text-2xl mr-4 cursor-pointer"
          />
          <RiShutDownLine
            onClick={LogOut}
            className="text-2xl cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
}