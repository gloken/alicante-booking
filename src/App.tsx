import './App.css';
import { collection } from '@firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { firestore } from '@/firebase/firebase';
import { useAtom } from 'jotai';
import { authModalState } from '@/state/authModalState.ts';
import AuthModal from '@/components/AuthModal.tsx';
import Navbar from '@/components/Navbar/Navbar.tsx';
import Calendar from './components/Calendar/Calendar.tsx';

function App() {
  const [authModal] = useAtom(authModalState);
  const [events, eventsLoading, eventsError] = useCollection(collection(firestore, 'events'));

  return (
      <>
        <header className="w-full">
          <Navbar/>
        </header>
        <main className="flex-grow flex flex-col items-center sm:items-start p-8 sm:p-20 gap-8">
          {authModal.isOpen && <AuthModal />}
          {eventsLoading && <div>Laster inn kalenderen...</div>}
          {eventsError && <div>Noe gikk galt: {eventsError.message}</div>}
          {events && events.docs.map((doc) => {
            const event = doc.data();
            return (
              <div key={doc.id}>
                <h2>{event.title}</h2>
                <p>{event.start}</p>
              </div>
            );
          })}
          <Calendar/>
        </main>
        <footer className="w-full flex gap-6 flex-wrap items-center justify-center p-8 sm:p-20">
          Nederst
        </footer>
      </>
  );
}

export default App;
