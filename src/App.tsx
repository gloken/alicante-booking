import './App.css';
import { useAtom } from 'jotai';
import { authModalState } from './state/authModalState.ts';
import AuthModal from './components/AuthModal.tsx';
import Navbar from './components/Navbar/Navbar.tsx';
import Calendar from './components/Calendar/Calendar.tsx';

function App() {
  const [authModal] = useAtom(authModalState);

  return (
    <>
      <header className="w-full">
        <Navbar />
      </header>
      <main className="flex flex-grow flex-col items-center gap-8 p-8 sm:items-start sm:p-20">
        {authModal.isOpen && <AuthModal />}
        <Calendar />
      </main>
      <footer className="flex w-full flex-wrap items-center justify-center gap-6 p-8 sm:p-20">
        Nederst
      </footer>
    </>
  );
}

export default App;
