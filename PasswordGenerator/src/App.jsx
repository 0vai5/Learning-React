import React, { useCallback, useEffect, useRef, useState } from 'react'

const App = () => {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [isCharacters, setIsCharacters] = useState(false);
  const [isNumbers, setIsNumbers] = useState(false);
  const inputRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isCharacters) str += "!@#$%^&*()~|\?><,.*-"
    if (isNumbers) str += "1234567890"

    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)]
    }

    setPassword(pass)


  }, [length, setPassword, isCharacters, isNumbers])

  useEffect(() => {
    passwordGenerator();
  }, [length, isCharacters, isNumbers])

  const copyPassToClipboard = () => {
    inputRef.current.select();
    window.navigator.clipboard.writeText(password);
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Password Generator
        </h2>
        <div className="mb-4">
          <label
            htmlFor="password-length"
            className="block text-gray-600 font-medium mb-2"
          >
            Password Length
          </label>
          <input
            id="password-length"
            type="range"
            min="1"
            max="100"
            value={length}
            className="w-full appearance-none bg-gray-200 rounded-full h-2 transition-all focus:ring focus:ring-blue-400"
            onChange={(e) => setLength(e.target.value)}
          />
          <div className="text-center text-gray-700 mt-1">
            Length: <span className="font-bold">{length}</span>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-medium mb-2">Include</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                className="rounded text-blue-500 transition"
                onChange={() => setIsCharacters(prev => !prev)}
              />
              <span>Characters</span>
            </label>
            <label className="flex items-center space-x-2 text-gray-700">
              <input
                type="checkbox"
                className="rounded text-blue-500 transition"
                onChange={() => setIsNumbers(prev => !prev)}
              />
              <span>Numbers</span>
            </label>
          </div>
        </div>
        <div className="mb-4 relative">
          <input
            type="text"
            readOnly
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300 transition"
            value={password}
            ref={inputRef}

          />
          <button
          onClick={copyPassToClipboard}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 px-2 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 transition focus:outline-none focus:ring focus:ring-blue-300"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  )
}

export default App