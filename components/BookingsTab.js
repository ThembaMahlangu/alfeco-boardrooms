import { useState } from "react";
import BookingModal from "./BookingModal";
import { FaPlus } from "react-icons/fa";

export default function BookingsTab() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button className={`max-sm:hidden hover:bg-white hover:text-black px-4 py-2 bg-tansparent text-black`} onClick={() => setIsModalOpen(true)}>
        <FaPlus className={`inline-block mr-2`} />
        Add Booking
      </button>
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}