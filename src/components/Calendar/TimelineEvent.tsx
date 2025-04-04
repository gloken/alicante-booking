import React from 'react';
import { Event } from '@/types/Event.ts';
import dayjs from 'dayjs';

type TimelineEventProps = {
  event: Event;
  left: string;
  width: string;
  top: string;
};

const TimelineEvent: React.FC<TimelineEventProps> = ({
  event,
  left,
  width,
  top,
}) => {
  const formatEventDuration = (start: string, end: string) => {
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    if (startDate.month() === endDate.month()) {
      return `${startDate.format('D')}. - ${endDate.format('D')}. ${startDate.format('MMM')}`;
    } else {
      return `${startDate.format('D. MMM')} - ${endDate.format('D. MMM')}`;
    }
  };

  return (
    <div
      className="card card-xs bg-base-100 shadow-sm"
      style={{ left, width, top, position: 'absolute' }}
    >
      <div className="card-body">
        <h2 className="card-title">{event.title}</h2>
        <p>{formatEventDuration(event.start, event.end)}</p>
      </div>
    </div>
  );
};

export default TimelineEvent;
