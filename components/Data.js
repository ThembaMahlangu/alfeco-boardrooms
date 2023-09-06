import { FaCalendar, FaHome } from "react-icons/fa";
import BookingsTab from "@/components/BookingsTab";
import HomeTab from "@/components/HomeTab";
import Schedules from "@/components/SchedulesTab";

export const bookings = [
    {
        id: 1,
        date: '2023-08-01',
        time: '12:00',
        guests: 2,
        name: 'John Doe',
        email: 'john@gmail.com',
        phone: '1234567890',
        requirements: 'No requirements',
    },
    {
        id: 2,
        date: '2023-08-02',
        time: '13:00',
        guests: 3,
        name: 'Jane Doe',
        email: 'Jane@gmail.com',
        phone: '1234567890',
        requirements: 'No requirements',
    },
    {
        id: 3,
        date: '2023-08-03',
        time: '14:00',
        guests: 4,
        name: 'Simphiwe Mkhize',
        email: 'simphiwe@gmail.com',
        phone: '1234567890',
        requirements: 'No requirements',
    },
    {
        id: 4,
        date: '2023-08-04',
        time: '15:00',
        guests: 5,
        name: 'Sipho Mkhize',
        email: 'Sipho@gmail.com',
        phone: '1234567890',
        requirements: 'No requirements',
    },
    {
        id: 5,
        date: '2023-08-05',
        time: '16:00',
        guests: 6,
        name: 'Siphiwe Mkhize',
        email: 'Siphiwe@gmail.com',
        phone: '1234567890',
        requirements: 'No requirements',
    },
    {
        id: 6,
        date: '2023-08-06',
        time: '17:00',
        guests: 7,
        name: 'Sfiso Mkhize',
        email: 'Sfiso@gmail.com',
        phone: '1234567890',
        requirements: 'Some snacks and beverages',
    }
];

export const tabs = [
    { id: 'home', name: 'Home', icon: FaHome, component: HomeTab },
    { id: 'bookings', name: 'Bookings', icon: FaCalendar, component: BookingsTab },
    { id: 'events', name: 'Events', icon: FaCalendar, component: Schedules },
  ];