import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import noLocale from '@fullcalendar/core/locales/nb';
import { useAtom } from 'jotai/index';
import { userAtom } from '../../state/userAtom';
import { EventContentArg } from '@fullcalendar/core';
import useEvents from '../../hooks/useEvents.ts';
import { PacmanLoader } from 'react-spinners';

type CalendarProps = object;

const Calendar: React.FC<CalendarProps> = () => {
  const [bookingUser] = useAtom(userAtom);
  const { events, eventsLoading, eventsError } = useEvents();

  if (!bookingUser?.user) return null;

  const getColorByOwner = (owner: string) => {
    switch (owner) {
      case 'Geir':
        return { bg: 'bg-red-100', text: 'text-red-900' };
      case 'Gry':
        return { bg: 'bg-amber-100', text: 'text-amber-900' };
      default:
        return { bg: 'bg-emerald-100', text: 'text-emerald-900' };
    }
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const { bg, text } = getColorByOwner(eventInfo.event.extendedProps.owner);
    const eventStyling = `p-2 rounded ${bg} ${text}`;
    const guestInfo =
      eventInfo.event.extendedProps.guests?.length > 0
        ? `, ${eventInfo.event.extendedProps.guests.join(', ')}`
        : '';

    return (
      <div className={eventStyling}>
        <b>{eventInfo.event.title}</b>
        <i>
          {eventInfo.event.extendedProps.owner} {guestInfo}
        </i>
      </div>
    );
  };

  return (
    <div className="h-full w-full">
      {eventsLoading && <PacmanLoader loading={eventsLoading} />}
      {eventsError && <div>Error: {eventsError.message}</div>}
      {!eventsLoading && !eventsError && (
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            listPlugin,
          ]}
          initialView="dayGridMonth"
          events={events}
          locale={noLocale}
          themeSystem="bootstrap5"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
          }}
          eventContent={renderEventContent}
          eventDisplay={'block'}
        />
      )}
    </div>
  );
};

export default Calendar;
