import { useCollection } from 'react-firebase-hooks/firestore';
import { collection } from '@firebase/firestore';
import { firestore } from '../firebase/firebase';

const useEvents = () => {
  const [storedEvents, eventsLoading, eventsError] = useCollection(collection(firestore, 'events'));

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

  return { events, eventsLoading, eventsError };
};

export default useEvents;