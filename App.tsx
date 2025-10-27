import React from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col antialiased">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex justify-center items-start">
        <ChatInterface />
      </main>
      <footer className="text-center text-xs text-gray-500 p-4">
        <p>Powered by Gemini. For Bob Tomes Ford.</p>
      </footer>
    </div>
  );
};

export default App;