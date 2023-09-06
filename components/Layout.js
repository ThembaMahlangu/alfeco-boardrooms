import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaPlus, FaCalendar } from 'react-icons/fa';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Spin as Hamburger, Spin } from 'hamburger-react'
import BookingModal from './BookingModal';

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500`}>
      <nav className={`flex justify-between items-center p-4 bg-gray-900`}>
        <Link href="/">
          <span className={`text-2xl font-bold text-white`}>Alfeco Boardroom Management</span>
        </Link>
        <div className="flex items-center space-x-4">
          <button className={`max-sm:hidden hover:bg-white hover:text-black px-4 py-2 bg-tansparent text-white`} onClick={() => setIsModalOpen(true)}>
            <FaPlus className={`inline-block mr-2`} />
            Add Booking
          </button>
          <Link href="/schedules">
          <button className={`max-sm:hidden hover:bg-white hover:text-black px-4 py-2 bg-tansparent text-white`}>
            <FaCalendar className={`inline-block mr-2`} />
            Check Schedules
          </button>
          </Link>
          <Link href="/login">
          <button className={`max-sm:hidden hover:bg-white hover:text-black px-4 py-2 bg-tansparent border-2 border-white text-white`}>
            Admin Login
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
        <button className={`hover:bg-white mr-20 hover:text-black px-4 py-2 bg-transparent text-white`} onClick={() => setIsModalOpen(true)}>
          <FaPlus className={`inline-block mr-2`} />
          Add Booking
        </button>
        <Link href="/schedules">
        <button className={`hover:bg-white mr-20 hover:text-black px-4 py-2 bg-transparent text-white`}>
          <FaCalendar className={`inline-block mr-2`} />
          Check Schedules
        </button>
        </Link>
        <Link href="/login">
        <button className={`hover:bg-white mr-20 hover:text-black px-4 py-2 bg-transparent border-2 border-white text-white`}>
          Admin Login
        </button>
        </Link>
      </div>
    </motion.div>
  )}
</AnimatePresence>

      <div className="w-screen">
        <main className="container mx-auto px-4">
          {children}
        </main>
      </div>
      <footer className={`text-center py-4 bg-gray-900 text-gray-400`}>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <Link href="#">
              <FaTwitter className={`hover:text-blue-500 text-white`} size={24} />
            </Link>
            <Link href="#">
              <FaFacebook className={`hover:text-blue-500 text-white`} size={24} />
            </Link>
            <Link href="#">
              <FaInstagram className={`hover:text-pink-500 text-white`} size={24} />
            </Link>
            <Link href="#">
              <FaLinkedin className={`hover:text-blue-400 text-white`} size={24} />
            </Link>
          </div>
        </div>
        <div className="pt-3">
          &copy; {new Date().getFullYear()} Alfeco Holdings. All rights reserved.
        </div>
      </footer>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
