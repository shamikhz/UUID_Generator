import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(null);
  const [uuids, setUuids] = useState([]);

  useEffect(() => {
    if (activeSection) generateUUIDs();
  }, [activeSection]);

  const generateUUIDs = () => {
    let newUUIDs = [];

    switch (activeSection) {
      case 'v1':
        newUUIDs = Array.from({ length: 5 }, () => `v1-${uuidv4()}`); // simulate v1
        break;
      case 'v2':
        newUUIDs = Array.from({ length: 5 }, () => `v2-${uuidv4().slice(0, 8)}`); // simulate v2
        break;
      case 'v3':
        newUUIDs = Array.from({ length: 5 }, () => `v3-${uuidv4().slice(0, 12)}`); // simulate v3
        break;
      default:
        newUUIDs = Array.from({ length: 5 }, () => uuidv4()); // real v4
    }

    setUuids(newUUIDs);
  };

  const getDescription = () => {
    switch (activeSection) {
      case 'v1':
        return (
          <div className="description">
            <p><strong>UUID v1</strong> is based on the current timestamp and MAC address. We simulate it by prefixing v1- to UUID v4.</p>
          </div>
        );
      case 'v2':
        return (
          <div className="description">
            <p><strong>UUID v2</strong> is used for DCE Security (domain-based). It's not widely used and here we simulate it using shortened UUID v4.</p>
          </div>
        );
      case 'v3':
        return (
          <div className="description">
            <p><strong>UUID v3</strong> is name-based and uses MD5 hashing. We simulate it using a truncated v4 UUID with a v3- prefix.</p>
          </div>
        );
      case 'v4':
        return (
          <div className="description">
            <p><strong>UUID v4</strong> is random-based and the most commonly used version. It ensures uniqueness without coordination.</p>
          </div>
        );
      default:
        return (
          <div className="description">
            <p>Click on a UUID version above to generate random UUIDs and see the description.</p>
          </div>
        );
    }
  };

  return (
    <div className="container">
      <h1 className="title">UUID Generator</h1>

      {/* Navbar */}
      <div className="navbar">
        {['v1', 'v2', 'v3', 'v4'].map((version) => (
          <button
            key={version}
            className={`nav-btn ${activeSection === version ? 'active' : ''}`}
            onClick={() => {
              setActiveSection(version);
              setUuids([]);
            }}
          >
            UUID {version.toUpperCase()}
          </button>
        ))}
      </div>

      {/* UUID Generator */}
      {activeSection && (
        <div className="generator">
          <button className="generate-btn" onClick={generateUUIDs}>
            Generate UUID {activeSection.toUpperCase()}
          </button>

          <div className="uuid-list">
            {uuids.map((uuid, index) => (
              <div className="uuid" key={index}>
                {uuid}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      {getDescription()}
    </div>
  );
}

export default App;
