import './App.css';
import Navbar from '@/components/Navbar/Navbar.tsx';
import Timeline from '@/components/Calendar/Timeline.tsx';

function App() {
  return (
    <div className="bg-base-200 text-base-content flex min-h-screen w-full flex-col">
      <header className="fixed top-0 z-50 w-full">
        <Navbar />
      </header>
      <main className="mt-16 flex flex-grow flex-col items-center gap-8 p-8 sm:items-start sm:p-20">
        <Timeline startDate="2025-04-01" endDate="2025-07-30" />
        {/*<Calendar />*/}
      </main>
      <footer className="flex w-full flex-wrap items-center justify-center gap-6 p-8 sm:p-20">
        Nederst
      </footer>
    </div>
  );
}

export default App;
