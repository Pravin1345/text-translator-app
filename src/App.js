import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TextTranslator from './components/TextTranslator';
import RandomStringGenerator from './components/RandomStringGenerator';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<TextTranslator />} />
            <Route path="/translator" element={<TextTranslator />} />
            <Route path="/generator" element={<RandomStringGenerator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <footer className="py-6 border-t border-slate-800 text-center text-xs text-slate-500">
          Text Translator App &bull; Random String Generator &bull; React Router &amp; Tailwind
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
