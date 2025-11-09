import { useState, useCallback, useEffect, useRef } from 'react';

function App() {

  const [length, setLength] = useState(12);
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numAllowed) str += '0123456789';
    if (charAllowed) str += '~!@#$%^&*(){}[]?><;:';

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed]);

  const copyToClipboard = useCallback(() => {
    if (!password) return;
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    // revert to normal after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black text-gray-100 px-4">
      <div className="w-full max-w-lg bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-gray-700">
        
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-400">
          🔐 Password Generator
        </h1>

        {/* Password Display */}
        <div className="flex items-center bg-gray-900 rounded-lg overflow-hidden mb-6 shadow-inner border border-gray-700">
          <input
            type="text"
            value={password}
            readOnly
            ref={passwordRef}
            className="grow px-4 py-3 bg-transparent text-lg font-mono tracking-wider text-amber-300 outline-none"
          />
         <button
            onClick={copyToClipboard}
            className={`px-5 py-3 font-semibold transition-all duration-300 ${
              copied
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-gray-900'
            }`}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-5">
          {/* Length Slider */}
          <div className="flex items-center justify-between">
            <label className="font-semibold text-gray-300">Length</label>
            <span className="text-amber-400 font-mono">{length}</span>
          </div>
          <input
            type="range"
            min={6}
            max={32}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          {/* Checkboxes */}
          <div className="flex items-center justify-between">
            <label htmlFor="numAllowed" className="flex items-center gap-2 cursor-pointer">
              <input
                id="numAllowed"
                type="checkbox"
                checked={numAllowed}
                onChange={() => setNumAllowed((prev) => !prev)}
                className="accent-amber-500"
              />
              <span>Include Numbers</span>
            </label>

            <label htmlFor="charAllowed" className="flex items-center gap-2 cursor-pointer">
              <input
                id="charAllowed"
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
                className="accent-amber-500"
              />
              <span>Include Symbols</span>
            </label>
          </div>
        </div>

        {/* Generate Button */}
        <div className="mt-8 text-center">
          <button
            onClick={passwordGenerator}
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold px-8 py-3 rounded-lg shadow-md transition-all duration-200"
          >
            Generate New Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
