import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RiNotification2Line, RiShutDownLine } from 'react-icons/ri';
import { useSession, signOut } from "next-auth/react"; // Import useSession hook

export default function DashNav() { 

  const { data: session, status } = useSession();

  return (
    <header className="bg-gray-900 text-white border-b border-gray-500">
      <nav className="container mx-auto py-4 px-8 flex items-center justify-between">
        <Link href="/dashboard" className='text-2xl font-bold'>
          Boardroom Management Dashboard
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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYVXAkCKpmsjto25w792EOy3bC6s8lMV3t407nUSY&s"
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              </label>
            </div>
            <span className="ml-2">Hello, {session?.user?.name}</span>
          </button>
          <RiNotification2Line
            className="text-2xl mr-4 cursor-pointer"
          />
          <RiShutDownLine
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-2xl cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
}
