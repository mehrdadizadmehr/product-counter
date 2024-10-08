// src/App.js
import React from 'react';
import './App.css';
import ProductCount from './components/ProductCount';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Product Count</h1>
        <ProductCount />
      </header>
    </div>
  );
}

export default App;
