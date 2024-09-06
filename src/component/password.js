import React, { useCallback, useEffect, useState, useRef } from "react";


export default function Password() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");
  const passref = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "@!#$%^&*(){}[]~`";

    for (let i = 0; i < length; i++) {
      let randomIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomIndex);
    }
    setPassword(pass);
  }, [length, number, char]);

  const Copypasstoclip = useCallback(() => {
    passref.current?.select();
    window.navigator.clipboard.writeText(password);
    alert('Password Copied!');
  }, [password]);

  useEffect(() => { 
    passwordGenerator();
  }, [length, number, char]);

  return (
    <div className="bg-dark text-white min-vh-100 d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4" style={{ maxWidth: '600px', width: '100%' }}>
        <h1 className="mb-4 text-center">Password Generator</h1>
        <div className="mb-4">
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control me-2"
              value={password}
              placeholder="Generated Password"
              readOnly
              ref={passref}
            />
            <button className="btn btn-success" onClick={Copypasstoclip}>
              Copy
            </button>
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-3">
            <label htmlFor="lengthRange" className="form-label">
              Length: {length}
            </label>
            <input
              type="range"
              id="lengthRange"
              min={8}
              max={50}
              value={length}
              className="form-range"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="form-check mb-2">
            <input
              type="checkbox"
              id="numberInput"
              checked={number}
              className="form-check-input"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput" className="form-check-label">
              Include Numbers
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="charInput"
              checked={char}
              className="form-check-input"
              onChange={() => setChar((prev) => !prev)}
            />
            <label htmlFor="charInput" className="form-check-label">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
