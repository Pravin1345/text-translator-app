import React, { useState, useCallback, useEffect } from 'react';

const RandomStringGenerator = () => {
  // Requirement 2: Using useState hook
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [randomString, setRandomString] = useState('');
  const [copied, setCopied] = useState(false);

  // Requirement 2: Using useCallback hook for memoization
  const generateRandomString = useCallback(() => {
    let characters = '';
    if (includeUppercase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';
    if (includeSymbols) characters += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (characters === '') {
      setRandomString('Please select at least one character type.');
      return;
    }

    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    setRandomString(result);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  // Requirement 2: Using useEffect hook
  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  const copyToClipboard = () => {
    if (!randomString || randomString.startsWith('Please')) return;
    navigator.clipboard.writeText(randomString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="mb-6 pb-6 border-b border-slate-700">
          <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
            Slab 1 Requirement #2
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            <i className="fa-solid fa-key text-emerald-400 mr-2"></i>
            Random String Generator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Built using React hooks: <code className="text-indigo-300">useState</code>,{' '}
            <code className="text-indigo-300">useCallback</code>, &amp; <code className="text-indigo-300">useEffect</code>.
          </p>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            readOnly
            value={randomString}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3.5 pr-28 text-emerald-400 font-mono text-lg font-semibold tracking-wider outline-none"
          />
          <button
            type="button"
            onClick={copyToClipboard}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-md"
          >
            {copied ? (
              <>
                <i className="fa-solid fa-check mr-1"></i> Copied
              </>
            ) : (
              <>
                <i className="fa-solid fa-copy mr-1"></i> Copy
              </>
            )}
          </button>
        </div>

        <div className="space-y-5 mb-8">
          <div>
            <div className="flex justify-between text-sm font-semibold text-slate-300 mb-2">
              <span>String Length:</span>
              <span className="text-emerald-400 font-mono font-bold text-base">{length}</span>
            </div>
            <input
              type="range"
              min="4"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center space-x-3 bg-slate-900/60 border border-slate-700/60 p-3 rounded-xl cursor-pointer hover:border-slate-600 transition">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500"
              />
              <span className="text-sm font-medium text-slate-200">Uppercase (A-Z)</span>
            </label>

            <label className="flex items-center space-x-3 bg-slate-900/60 border border-slate-700/60 p-3 rounded-xl cursor-pointer hover:border-slate-600 transition">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500"
              />
              <span className="text-sm font-medium text-slate-200">Lowercase (a-z)</span>
            </label>

            <label className="flex items-center space-x-3 bg-slate-900/60 border border-slate-700/60 p-3 rounded-xl cursor-pointer hover:border-slate-600 transition">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500"
              />
              <span className="text-sm font-medium text-slate-200">Numbers (0-9)</span>
            </label>

            <label className="flex items-center space-x-3 bg-slate-900/60 border border-slate-700/60 p-3 rounded-xl cursor-pointer hover:border-slate-600 transition">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 accent-emerald-500"
              />
              <span className="text-sm font-medium text-slate-200">Special Symbols (!@#$)</span>
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={generateRandomString}
          className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 text-base"
        >
          <i className="fa-solid fa-arrows-rotate"></i> Re-Generate Random String
        </button>
      </div>
    </div>
  );
};

export default RandomStringGenerator;
