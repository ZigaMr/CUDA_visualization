// frontend/src/App.js

import React from 'react';
import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Algorithm Comparison Dashboard</h1>
      </header>
      <main>
        <Dashboard />
      </main>
      <footer>
        <p>Powered by React and Node.js</p>
      </footer>
    </div>
  );
}

export default App;
