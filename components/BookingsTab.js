import React, { useState, useEffect } from "react";
import BookingModal from "./BookingModal";
import { FaPlus } from "react-icons/fa";
import { getMeetings } from "@/pages/api/auth/[...nextauth]";

export default function BookingsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userMeetings, setUserMeetings] = useState([]); // Initialize user meetings as an empty array

  // Function to fetch user meetings using Microsoft Graph API
  const fetchUserMeetings = async () => {
    try {
      const meetings = await getMeetings();
      setUserMeetings(meetings.value);
    } catch (error) {
      console.error("Error fetching user meetings:", error);
    }
  };

  useEffect(() => {
    // Fetch user meetings when the component mounts
    fetchUserMeetings();
  }, []);

  const handleAddBookingClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="px-2 py-4 rounded-md h-[80vh]" style={{ backgroundImage: "url('https://alfecofoundation.com/wp-content/uploads/2023/05/12151163_4877010-scaled.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-black">My Bookings</h2>
        <button
          className="max-sm:hidden hover:bg-white hover:text-black px-4 py-2 bg-transparent text-black"
          onClick={handleAddBookingClick}
        >
          <FaPlus className="inline-block mr-2" />
          Add Booking
        </button>
      </div>
      {userMeetings.length === 0 ? (
        <p className="text-gray-600">No meetings were currently made.</p>
      ) : (
        <ul className="space-y-4">
          {userMeetings.map((meeting) => (
            <li
              key={meeting.id}
              className="bg-black shadow-md rounded-lg p-4 flex justify-between items-center"
            >
              {/* Display meeting details here */}
              <div>
                <h3 className="text-white text-lg">{meeting.subject}</h3>
                <p className="text-gray-300">{new Date(meeting.startDateTime).toLocaleString()}</p>
              </div>
              {/* Add more meeting details as needed */}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4">
        <p className="text-gray-600">
          To make a booking, please follow these instructions:
        </p>
        <ol className="list-decimal pl-6 mt-2">
          <li>Log in to your account.</li>
          <li>Click on the "Add Booking" button above.</li>
          <li>Fill in the booking details in the popup modal.</li>
          <li>Click "Save" to create the booking.</li>
          <li>Go to Events Tab to view all your bookings and bookings of others for that specific boardroom</li>
        </ol>
      </div>

      <div className="mt-4">
        <p className="text-gray-600">
          To view your bookings in Outlook, please visit{" "}
          <a
            href="https://outlook.com/bookings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Outlook Bookings
          </a>
          .
        </p>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
