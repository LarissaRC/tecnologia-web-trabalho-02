import './App.css';
import React, { useState } from 'react';
import Artists from './components/Artists/Artists'
import Users from './components/Users/Users';

function App() {
  const [view, setView] = useState("users");

  return (
    <div className="card">
      <h1>Dashboard</h1>
      <button onClick={() => setView("users")}>Usuários</button>
      <button onClick={() => setView("artists")}>Artistas</button>

      {view === "users" ? <Users /> : <Artists />}
    </div>
  );
}

export default App;
