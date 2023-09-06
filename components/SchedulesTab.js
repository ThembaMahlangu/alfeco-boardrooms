import MyCalendar from "@/components/Calendar";
import ChatIcon from "@/components/ChatSupport";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Transition from "@/components/Transition";

export default function Schedules() {
  return (
    <>
        <div className={`bg-gray-700 bg-opacity-90 text-white p-4`}>
        <h1 className={`text-4xl font-bold text-center text-gray-200`}>Alfeco Boardrooms Schedules</h1>
        <p className={`text-gray-200 text-center`}>Check the schedules of the boardrooms for each day</p>
        </div>
        <hr className={`my-4`} />
        <MyCalendar />
    </>
  )
}
