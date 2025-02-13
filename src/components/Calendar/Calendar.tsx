import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import noLocale from "@fullcalendar/core/locales/nb";
// import 'bootswatch/dist/sandstone/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { firestore } from '../../firebase/firebase';
import {useAtom} from "jotai/index";
import {userAtom} from "../../state/userAtom";
import {EventContentArg} from "@fullcalendar/core";
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from '@firebase/firestore';

type CalendarProps = object;

const Calendar: React.FC<CalendarProps> = () => {
    const [bookingUser] = useAtom(userAtom);
    const [storedEvents, eventsLoading, eventsError] = useCollection(collection(firestore, 'events'));

    if (!bookingUser?.user) return null;

    console.log(storedEvents?.docs, eventsLoading, eventsError);

    const events = storedEvents?.docs.map((doc) => {
        const event = doc.data();
        return {
            title: event.title,
            start: event.start,
            end: event.end,
            extendedProps: {
                owner: event.owner,
                guests: event.guests,
            },
        };
    });

    // const events = [
    //     {
    //         title: "Geir",
    //         description: "En hel gjeng",
    //         start: "2025-01-05",
    //         end: "2025-01-10",
    //         extendedProps: {
    //             owner: "Geir",
    //             guests: ["Linn", "Calle", "Kari", "Per", "Pål"],
    //         },
    //     },
    //     {
    //         title: "Gry",
    //         date: "2025-01-02",
    //         extendedProps: {
    //             owner: "Gry",
    //         },
    //     },
    //     {
    //         title: "Mimmi & Bessa",
    //         start: "2025-01-22T11:30:00",
    //         end: "2025-01-31T13:30:00",
    //     }
    // ];

    const getColorByOwner = (owner: string) => {
        switch (owner) {
            case "Geir":
                return { bg: "bg-red-100", text: "text-red-900" };
            case "Gry":
                return { bg: "bg-amber-100", text: "text-amber-900" };
            default:
                return { bg: "bg-emerald-100", text: "text-emerald-900" };
        }
    };

    const renderEventContent = (eventInfo: EventContentArg) => {
        const {bg, text} = getColorByOwner(eventInfo.event.extendedProps.owner);
        const eventStyling = `p-2 rounded ${bg} ${text}`;
        const guestInfo = eventInfo.event.extendedProps.guests?.length > 0
            ? `, ${eventInfo.event.extendedProps.guests.join(', ')}`
            : "";

        return (
            <div className={eventStyling}>
                <b>{eventInfo.event.title}</b>
                <i>{eventInfo.event.extendedProps.owner} {guestInfo}</i>
            </div>
        );
    };

    return (
        <div className="w-full h-full">
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, listPlugin, bootstrap5Plugin]}
                initialView="dayGridMonth"
                events={events}
                locale={noLocale}
                themeSystem="bootstrap5"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                }}
                eventContent={renderEventContent}
                eventDisplay={"block"}
            />
        </div>
    );
};

export default Calendar;