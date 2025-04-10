import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/nb';
import TimelineEvent from './TimelineEvent';
import { Event } from '@/types/Event';

dayjs.extend(duration);
dayjs.extend(advancedFormat);
dayjs.extend(isoWeek);
dayjs.extend(localeData);
dayjs.locale('nb');

type TimelineProps = {
  startDate: string;
  endDate: string;
};

const Timeline: React.FC<TimelineProps> = ({ startDate, endDate }) => {
  const [maxDaysToShow, setMaxDaysToShow] = useState(60);

  useEffect(() => {
    const updateThreshold = () => {
      const width = window.innerWidth;
      const newThreshold = Math.floor(width / 24); // Adjust the divisor as needed
      setMaxDaysToShow(newThreshold);
    };

    updateThreshold();
    window.addEventListener('resize', updateThreshold);
    return () => window.removeEventListener('resize', updateThreshold);
  }, []);

  const events: Event[] = [
    {
      id: 1,
      title: 'Påskeferie Geir',
      start: '2025-04-12T11:00:00',
      end: '2025-04-22T09:00:00',
      owner: 'Geir',
      guests: ['Linn', 'Jenny'],
    },
    {
      id: 2,
      title: 'Påske Mimmi og Bessa',
      start: '2025-04-01T00:00:00',
      end: '2025-04-30T23:59:59',
      owner: 'Bessa',
      guests: ['Mimmi'],
    },
    {
      id: 3,
      title: 'Sommerferie Jenny',
      start: '2025-06-23T10:00:00',
      end: '2025-07-02T10:00:00',
      owner: 'Jenny',
      guests: [
        'Nathalie',
        'Emma',
        'Ingvild',
        'Randi',
        'Berit',
        'Gunn',
        'Johanne',
      ],
    },
    {
      id: 4,
      title: 'Sommerferie Geir',
      start: '2025-07-02T09:00:00',
      end: '2025-07-25T10:00:00',
      owner: 'Geir',
      guests: ['Linn', 'Jenny', 'Julie'],
    },
    {
      id: 5,
      title: 'Merie ferie Geir',
      start: '2025-05-10T09:00:00',
      end: '2025-05-17T10:00:00',
      owner: 'Geir',
      guests: ['Linn', 'Jenny', 'Julie'],
    },
  ];

  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const days = [];
  const weeks = [];
  const months = new Map<string, number>();

  let current = start;
  let currentWeek = [];

  while (current.isBefore(end) || current.isSame(end)) {
    days.push(current);
    currentWeek.push(current);

    const monthKey = current.format('MMM YYYY');
    if (!months.has(monthKey)) {
      months.set(monthKey, 0);
    }
    months.set(monthKey, months.get(monthKey)! + 1);

    if (current.day() === 0 || current.isSame(end)) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    current = current.add(1, 'day');
  }

  const showDays = days.length <= maxDaysToShow;

  const isOverlapping = (event1: Event, event2: Event) => {
    const start1 = dayjs(event1.start);
    const end1 = dayjs(event1.end);
    const start2 = dayjs(event2.start);
    const end2 = dayjs(event2.end);
    return !!(
      (start1.isAfter(start2) && start1.isBefore(end2)) ||
      (start2.isAfter(start1) && start2.isBefore(end1))
    );
  };

  const calculateTopPosition = (event: Event, events: Event[]): string => {
    let overlappingEvents = 0;

    for (let i = 0; i < events.length; i++) {
      if (events[i].id === event.id) break; // Skip the same event
      if (isOverlapping(event, events[i])) {
        overlappingEvents++;
      }
    }

    return `${overlappingEvents * 4.5}rem`;
  };

  return (
    <div className="w-full">
      <div className="relative h-48">
        {events.map((event, index) => {
          const eventStart = dayjs(event.start);
          const eventEnd = dayjs(event.end);
          const eventDuration = eventEnd.diff(eventStart, 'day') + 1;
          const eventStartIndex = eventStart.diff(start, 'day');
          const left = `${(eventStartIndex / days.length) * 100}%`;
          const width = `${(eventDuration / days.length) * 100}%`;
          const top = calculateTopPosition(event, events);

          return (
            <TimelineEvent
              key={index}
              event={event}
              left={left}
              width={width}
              top={top}
            />
          );
        })}
      </div>
      {showDays && (
        <div className="flex">
          {days.map((day, index) => (
            <div
              key={index}
              className="text-base-content bg-base-100 border-base-content flex flex-col items-center border-r text-center last:border-r-0"
              style={{ width: `${100 / days.length}%` }}
            >
              <div>{day.format('D')}</div>
              <div>{day.format('dd')[0]}</div>
            </div>
          ))}
        </div>
      )}
      <div className="flex">
        {weeks.map((week, index) => (
          <div
            key={index}
            className="text-base-content bg-base-200 border-base-content border-r text-center last:border-r-0"
            style={{ width: `${(week.length / days.length) * 100}%` }}
          >
            {`Uke ${week[0].isoWeek()}`}
          </div>
        ))}
      </div>
      <div className="flex">
        {Array.from(months.entries()).map(([month, daysInMonth], index) => (
          <div
            key={index}
            className="text-base-content bg-base-300 border-base-content border-r text-center last:border-r-0"
            style={{ width: `${(daysInMonth / days.length) * 100}%` }}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
