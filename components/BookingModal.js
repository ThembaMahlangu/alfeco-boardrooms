import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";

export default function BookingModal({ isOpen, onClose }) {
  const { data: session } = useSession();
  const [errorMsg, setErrorMsg] = useState("");
  const [buttonText, setButtonText] = useState("Book Meeting");
  const [startDate, setStartDate] = useState(new Date());
  const [bookingDetails, setBookingDetails] = useState({
    date: startDate,
    time: "",
    attendees: "",
    boardroom: "",
    guests: "",
    name: session?.user?.name,
    user: session?.user?.email,
    requirements: ""
  });

  const handleChange = (e) => {
    setBookingDetails({ ...bookingDetails, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("Submitting...",
      setTimeout(() => {
        setButtonText("Booking Failed");
      }, 5000)
    );
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
        <div className="min-h-screen flex items-center justify-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <form onSubmit={handleSubmit} className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <div className="flex flex-col">
            <p className="text-lg font-extrabold text-red-500 py-2">{errorMsg}</p>
            <label className="block mb-1">Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date); // Update the startDate when a new date is selected
                setBookingDetails({ ...bookingDetails, date }); // Update bookingDetails.date
              }}
              className="w-full mb-4 p-2 border rounded"
            />
            <label className="block mb-1">Time of Meeting</label>
            <input
              type="time"
              name="time"
              value={bookingDetails.time}
              onChange={handleChange}
              placeholder="Time"
              className="w-full mb-4 p-2 border rounded"
            />
            </div>
            <label className="block mb-1">Email of Attendees</label>
            <input
              type="email"
              name="attendees"
              value={bookingDetails.attendees}
              onChange={handleChange}
              placeholder="Enter Email of Attendees"
              className="w-full mb-4 p-2 border rounded"
            />
            <label className="block mb-1">Select Boardroom</label>
            <select
              name="boardroom"
              value={bookingDetails.boardroom}
              onChange={handleChange}
              className="w-full mb-4 p-2 border rounded"
            >
              <option value="Ferrum (14 seater)">Media Room – Ferrum (14 seater)</option>
              <option value="Ferrum – Copper (4 seater)">Ferrum – Copper (4 seater)</option>
              <option value="Aluminium (10 seater)">Aluminium (10 seater)</option>
              <option value="Energy – Electron (4 seater)">Energy – Electron (4 seater)</option>
              <option value="Green (10 seater)">Green (10 seater)</option>
              <option value="Java (10 seater)">Java (10 seater)</option>
            </select>
            <label className="block mb-1">Number of Guests</label>
            <input
              type="number"
              name="guests"
              value={bookingDetails.guests}
              onChange={handleChange}
              placeholder="Enter Number of Guests"
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
              {buttonText}
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
