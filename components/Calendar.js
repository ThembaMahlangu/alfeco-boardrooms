import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { bookings } from './Data';

const localizer = momentLocalizer(moment);

const MyCalendar = () => {

  const events = bookings


  const handleDayClick = (date) => {
    // Show side menu with booking details for the clicked date
  };

  const eventStyleGetter = (event) => {
    if (event.boardroomBooking) {
      return {
        className: 'boardroom-booking',
      };
    }
    return {};
  };

  return (
    <div className="h-screen">
      <Calendar
        localizer={localizer}
        events={events}
        selectable={true}
        views={['month', 'week', 'day']}
        defaultView="month"
        defaultDate={new Date()}
        eventPropGetter={eventStyleGetter}
        popupOffset={{ x: 30, y: 20 }}
        // step={60}
        // timeslots={1}
        onSelectSlot={(slotInfo) => handleDayClick(slotInfo.start)}
      />
    </div>
  );
};

export default MyCalendar;
