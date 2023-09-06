import { FaPlus, FaCalendar } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Spin as Hamburger, Spin } from 'hamburger-react'
import BookingModal from './BookingModal';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`transition-colors duration-500 z-50 fixed w-full`}>
      <nav className={`flex justify-between items-center p-4 bg-gray-900 bg-opacity-60`}>
        <Link href="/">
          <span className={`text-2xl font-bold text-white`}>Alfeco Boardroom Management</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/add_admin">
          <button className={`max-sm:hidden hover:bg-white hover:text-black px-4 py-2 bg-tansparent border-2 border-white text-white`}>
            Sign Up
          </button>
          </Link>
          <Link href="/login">
          <button className={`max-sm:hidden hover:bg-white hover:text-black px-4 py-2 bg-tansparent border-2 border-white text-white`}>
            Login
          </button>
          </Link>
          <button className={`max-sm:block hidden hover:text-white text-white text-2xl z-50`} onClick={toggleMenu}>
            {isOpen ? <Spin /> : <Spin />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: '30%' }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed top-0 right-0 bottom-0 flex items-center justify-center w-screen bg-blue-900 z-10"
    >
      <div className="flex flex-col items-center space-y-4 p-10 text-white">
        <Link>
        <button className={`hover:bg-white mr-20 hover:text-black px-4 py-2 bg-transparent border-2 border-white text-white`}>
          Sign Up
        </button>
        </Link>
        <Link href="/login">
        <button className={`hover:bg-white mr-20 hover:text-black px-4 py-2 bg-transparent border-2 border-white text-white`}>
          Login
        </button>
        </Link>
      </div>
    </motion.div>
  )}
    </AnimatePresence>
    </div>
  );
};
