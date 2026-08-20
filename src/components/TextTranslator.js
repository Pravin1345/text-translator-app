import React, { useState } from 'react';

const languages = [
  { code: 'hi', name: 'Hindi (?????)' },
  { code: 'es', name: 'Spanish (Español)' },
  { code: 'fr', name: 'French (Français)' },
  { code: 'de', name: 'German (Deutsch)' },
  { code: 'ja', name: 'Japanese (???)' },
  { code: 'zh', name: 'Chinese (??)' },
  { code: 'ar', name: 'Arabic (???????)' },
  { code: 'ru', name: 'Russian (???????)' },
  { code: 'pt', name: 'Portuguese (Português)' },
  { code: 'it', name: 'Italian (Italiano)' },
  { code: 'mr', name: 'Marathi (?????)' },
  { code: 'ta', name: 'Tamil (?????)' },
  { code: 'te', name: 'Telugu (??????)' },
  { code: 'gu', name: 'Gujarati (???????)' },
  { code: 'bn', name: 'Bengali (?????)' },
];

const TextTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('hi');
  const [rapidApiKey, setRapidApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setTranslatedText('');
      return;
    }

    setIsLoading(true);

    try {
      if (rapidApiKey.trim()) {
        const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'application/gzip',
            'X-RapidAPI-Key': rapidApiKey.trim(),
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
          },
          body: new URLSearchParams({
            q: inputText,
            target: targetLang,
            source: 'en',
          }),
        });

        const data = await response.json();
        if (data?.data?.translations?.[0]?.translatedText) {
          setTranslatedText(data.data.translations[0].translatedText);
          setIsLoading(false);
          return;
        }
      }

      const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        inputText
      )}&langpair=en|${targetLang}`;
      const res = await fetch(fallbackUrl);
      const result = await res.json();
      setTranslatedText(result?.responseData?.translatedText || 'Translation unavailable.');
    } catch (err) {
      console.error(err);
      setTranslatedText('Error translating text. Please check your network.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = (text, lang) => {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-700">
          <div>
            <span className="inline-block px-3 py-1 bg-indigo-500/10 text-indigo-400 text-xs font-semibold rounded-full uppercase tracking-wider mb-2">
              Text Translator App
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              <i className="fa-solid fa-language text-indigo-400 mr-2"></i>
              English to Multi-Language Translator
            </h1>
            <p className="text-slate-400 text-sm mt-1">Translate English text into your selected language using RapidAPI.</p>
          </div>

          <div className="w-full sm:w-auto flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-300">Translate Language:</label>
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="bg-slate-900 border border-slate-600 rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none cursor-pointer"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6 bg-slate-900/60 border border-slate-700/60 rounded-xl p-3 flex flex-col sm:flex-row items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
            <i className="fa-solid fa-key text-yellow-400 mr-1"></i> RapidAPI Key (Optional):
          </span>
          <input
            type="password"
            placeholder="Paste RapidAPI Key here (or leave empty to use default API)"
            value={rapidApiKey}
            onChange={(e) => setRapidApiKey(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none focus:border-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col bg-slate-900 border border-slate-700 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-xs font-semibold text-slate-400">
              <span>ENGLISH (INPUT)</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSpeak(inputText, 'en')}
                  className="hover:text-indigo-400 transition"
                  title="Listen"
                >
                  <i className="fa-solid fa-volume-high"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(inputText)}
                  className="hover:text-indigo-400 transition"
                  title="Copy"
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
              </div>
            </div>
            <textarea
              rows={6}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter English text to translate..."
              className="w-full bg-transparent text-white placeholder-slate-500 outline-none resize-none text-base"
            />
            <div className="text-right text-xs text-slate-500 mt-2">{inputText.length} chars</div>
          </div>

          <div className="flex flex-col bg-slate-900 border border-slate-700 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-800 text-xs font-semibold text-slate-400">
              <span>TRANSLATION (OUTPUT)</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleSpeak(translatedText, targetLang)}
                  className="hover:text-indigo-400 transition"
                  title="Listen"
                >
                  <i className="fa-solid fa-volume-high"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleCopy(translatedText)}
                  className="hover:text-indigo-400 transition"
                  title="Copy"
                >
                  <i className="fa-solid fa-copy"></i>
                </button>
              </div>
            </div>
            <textarea
              rows={6}
              readOnly
              value={translatedText}
              placeholder="Translation will appear here..."
              className="w-full bg-transparent text-indigo-200 placeholder-slate-500 outline-none resize-none text-base font-medium"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-2">
              <span>{copied ? 'Copied to clipboard!' : ''}</span>
              <span>{translatedText.length} chars</span>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleTranslate}
          disabled={isLoading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-spinner fa-spin"></i> Translating...
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles"></i> Translate Language
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TextTranslator;
