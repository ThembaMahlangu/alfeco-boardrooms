import React from 'react';
import { motion } from 'framer-motion';
import { useSession } from "next-auth/react";

const HomeTab = () => {
  const currentDate = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const { data: session, status } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-lg shadow-lg p-6 h-[80vh]"
      style={{ backgroundImage: "url('https://alfecofoundation.com/wp-content/uploads/2023/05/12151163_4877010-scaled.webp')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="mt-6 space-y-2"
      >
        <p className="text-lg">
          Welcome! <span className="font-bold">{session?.user?.name}</span>
        </p>
        <p className="text-lg">
        Today is <span className="font-semibold">{formattedDate}</span>.
        </p>
      </motion.div>
      <h2 className="text-2xl font-semibold mb-4 pt-5">Dashboard Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-900 shadow-xl  text-white rounded-lg p-4"
        >
          <h3 className="text-xl font-semibold mb-2">Number of Boardrooms</h3>
          <p className="text-lg">6 available</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-gray-900 shadow-xl text-white rounded-lg p-4"
        >
          <h3 className="text-xl font-semibold mb-2">Number of Users</h3>
          <p className="text-lg">310 users</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900 shadow-xl text-white rounded-lg p-4"
        >
          <h3 className="text-xl font-semibold mb-2">Total Number of Meetings</h3>
          <p className="text-lg">33 Meetings Found</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gray-900 shadow-xl text-white rounded-lg p-4"
        >
          <h3 className="text-xl font-semibold mb-2">Events</h3>
          <p className="text-lg">8 events available</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="bg-gray-900 shadow-lg text-white rounded-lg p-4"
        >
          <h3 className="text-xl font-semibold mb-2">Bookings</h3>
          <p className="text-lg">2 new bookings</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-gray-900 shadow-lg text-white rounded-lg p-4"
        >
          <h3 className="text-xl font-semibold mb-2">Dashboard Visits</h3>
          <p className="text-lg">15 visits today</p>
        </motion.div>
      </div>
      {/* <p className='text-red-500 bottom-32 fixed font-extrabold text-lg'>User Status = {status}</p> */}
    </motion.div>
  );
};

export default HomeTab;