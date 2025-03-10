import './App.css';
import Navbar from '@/components/Navbar/Navbar.tsx';
import Calendar from '@/components/Calendar/Calendar.tsx';

function App() {
  return (
    <div className="bg-base-200 text-base-content flex min-h-screen w-full flex-col">
      <header className="w-full">
        <Navbar />
      </header>
      <main className="flex flex-grow flex-col items-center gap-8 p-8 sm:items-start sm:p-20">
        <Calendar />
      </main>
      <footer className="flex w-full flex-wrap items-center justify-center gap-6 p-8 sm:p-20">
        Nederst
      </footer>
    </div>
  );
}

export default App;
