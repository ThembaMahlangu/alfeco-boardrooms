import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingModal({ isOpen, onClose }) {
  const [startDate, setStartDate] = useState(new Date());
  const [bookingDetails, setBookingDetails] = useState({
    date: startDate,
    time: "",
    guests: "",
    name: "",
    email: "",
    phone: "",
    requirements: ""
  });

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(bookingDetails);
    // You can handle form submission here
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-hidden"
        onClose={() => onClose()}
      >
        <div className="min-h-screen pt-2 flex items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <form onSubmit={handleSubmit} className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col">
            <label className="block mb-1">Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="w-full mb-4 p-2 border rounded"
            />
            <label className="block mb-1">Time in 24-hour format</label>
            <input
              type="time"
              name="time"
              value={bookingDetails.time}
              onChange={handleChange}
              placeholder="Time"
              className="w-full mb-4 p-2 border rounded"
            />
            </div>
            <input
              type="number"
              name="guests"
              value={bookingDetails.guests}
              onChange={handleChange}
              placeholder="Enter Number of Guests"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="text"
              name="name"
              value={bookingDetails.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full mb-4 p-2 border rounded"
            />
            <input
              type="tel"
              name="phone"
              value={bookingDetails.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full mb-4 p-2 border rounded"
            />
            <textarea
              name="requirements"
              rows={2}
              value={bookingDetails.requirements}
              onChange={handleChange}
              placeholder="Any snacks or beverage requirement?"
              className="w-full mb-4 p-2 border rounded"
            />
            <div className="flex items-center justify-end space-x-4">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Book Meeting
            </button>

            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 text-black bg-transparent border border-black rounded-md hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={() => onClose()}
            >
              Close
            </button>
            </div>
          </form>
        </div>
      </Dialog>
    </Transition>
  );
}
