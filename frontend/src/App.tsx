import { useState, FormEvent, useEffect } from 'react';
import FortuneDisplay from './components/FortuneDisplay';
import DarkModeToggle from './components/DarkModeToggle';
import { FortuneData } from './types';
import Modal from './components/Modal';
import About from './components/pages/About';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Contact from './components/pages/Contact';

const API_URL = import.meta.env.VITE_API_URL;

const Loader = () => (
  <div className="flex justify-center items-center p-8">
    <img src="/loader.svg" alt="Loading..." className="w-24 h-24" />
  </div>
);

function App() {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [hasAgreed, setHasAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fortune, setFortune] = useState<FortuneData | null>(null);

  // Modal states
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isPrivacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [isContactModalOpen, setContactModalOpen] = useState(false);

  // Reset form when coming back
  const resetForm = () => {
    setFortune(null);
    setName('');
    setDob('');
    setHasAgreed(false);
    setError(null);
  }

  const handleGetFortune = async () => {
    if (!name || !dob) {
      setError('Please enter your name and date of birth.');
      return;
    }
    if (!hasAgreed) {
      setError('You must agree to the terms to continue.');
      return;
    }
    
    // MONETIZATION HOOK
    await fetchFortune();
  };

  const fetchFortune = async () => {
    setIsLoading(true);
    setError(null);
    setFortune(null);

    try {
      const params = new URLSearchParams({ name, dob });
      const response = await fetch(`${API_URL}/api/fortune?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data: FortuneData = await response.json();
      setFortune(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleGetFortune();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-dark-bg bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-purple-900/50 dark:to-gray-900 font-sans">
        <div className="container mx-auto p-4 max-w-2xl">
          <header className="flex justify-between items-center py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-pink">
              What’s My Day
            </h1>
            <DarkModeToggle />
          </header>

          <main className="mt-6">
            <div className="bg-white/70 dark:bg-dark-card/80 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-lg">
              {!fortune && !isLoading && (
                <div className="animate-fade-in-up">
                  <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Your Daily Fortune Guide</h2>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your details to reveal your personalized guidance for today.</p>
                  <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-400">Name</label>
                      <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-purple focus:border-brand-purple sm:text-sm p-3" placeholder="e.g., Priya" required />
                    </div>
                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-600 dark:text-gray-400">Date of Birth</label>
                      <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-1 block w-full bg-white/50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-brand-purple focus:border-brand-purple sm:text-sm p-3" required />
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="agree" name="agree" type="checkbox" checked={hasAgreed} onChange={(e) => setHasAgreed(e.target.checked)} className="focus:ring-brand-purple h-4 w-4 text-brand-purple border-gray-300 dark:border-gray-600 rounded"/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="agree" className="font-medium text-gray-700 dark:text-gray-300">
                                I agree to the <button type="button" onClick={() => setPrivacyModalOpen(true)} className="underline text-brand-purple">Terms & Privacy Policy</button>.
                            </label>
                        </div>
                    </div>
                    <button type="submit" disabled={isLoading || !hasAgreed} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-brand-purple to-brand-pink hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-purple disabled:opacity-50 disabled:cursor-not-allowed transition-opacity">
                      {isLoading ? 'Revealing...' : 'Get My Fortune'}
                    </button>
                  </form>
                </div>
              )}
              
              {isLoading && <Loader />}
              {error && <div className="text-center text-red-500 p-4 bg-red-100 dark:bg-red-900/50 rounded-lg">{error}</div>}
              {fortune && <FortuneDisplay fortune={fortune} onReset={resetForm} />}
            </div>
          </main>
          
          <footer className="text-center mt-8 text-gray-500 dark:text-gray-400 text-sm">
              <div className="flex justify-center space-x-4">
                  <button onClick={() => setAboutModalOpen(true)} className="hover:underline">About Us</button>
                  <button onClick={() => setPrivacyModalOpen(true)} className="hover:underline">Privacy Policy</button>
                  <button onClick={() => setContactModalOpen(true)} className="hover:underline">Contact</button>
              </div>
              <p className="mt-4">© {new Date().getFullYear()} AstroWear Guide. All Rights Reserved.</p>
          </footer>
        </div>
      </div>

      {/* Modals */}
      <Modal title="About Us" isOpen={isAboutModalOpen} onClose={() => setAboutModalOpen(false)}>
        <About />
      </Modal>
      <Modal title="Privacy Policy" isOpen={isPrivacyModalOpen} onClose={() => setPrivacyModalOpen(false)}>
        <PrivacyPolicy />
      </Modal>
      <Modal title="Contact Us" isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)}>
        <Contact />
      </Modal>
    </>
  );
}

export default App;