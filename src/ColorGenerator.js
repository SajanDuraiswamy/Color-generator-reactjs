import React, { useState, useEffect } from 'react';
import './App.css';

function ColorGenerator() {
  const [color, setColor] = useState('#000000');
  const [history, setHistory] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  
  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const generateColor = () => {
    if (isLocked) return;
    const newColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, '0')}`;
    setColor(newColor);
    setHistory(prev => [newColor, ...prev.slice(0, 4)]);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(color);
    alert(`Copied ${color} to clipboard!`);
  };

 
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        generateColor();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isLocked]);

  const toggleLock = () => {
    setIsLocked(prev => !prev);
  };

  return (
    <div
      style={{
        backgroundColor: color,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.4s ease',
      }}
    >
      <h2 style={{ color: '#fff' }}>🎨 Color Generator</h2>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
        <button onClick={generateColor}>Generate Color</button>
        <button onClick={toggleLock}>
          {isLocked ? 'Unlock 🔓' : 'Lock 🔒'}
        </button>
      </div>

      <h3 style={{ color: '#fff', cursor: 'pointer' }} onClick={copyToClipboard}>
        {color} (click to copy)
      </h3>

      <p style={{ color: '#fff', marginTop: '-10px' }}>
        {hexToRgb(color)}
      </p>

      {history.length > 0 && (
        <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
          {history.map((col, index) => (
            <div
              key={index}
              style={{
                backgroundColor: col,
                width: '40px',
                height: '40px',
                borderRadius: '5px',
                border: '2px solid white',
                cursor: 'pointer'
              }}
              title={col}
              onClick={() => setColor(col)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ColorGenerator;
