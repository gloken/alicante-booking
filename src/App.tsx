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
          <Navbar/>
        </header>
        <main className="flex-grow flex flex-col items-center sm:items-start p-8 sm:p-20 gap-8">
          {authModal.isOpen && <AuthModal />}
          <Calendar/>
        </main>
        <footer className="w-full flex gap-6 flex-wrap items-center justify-center p-8 sm:p-20">
          Nederst
        </footer>
      </>
  );
}

export default App;
