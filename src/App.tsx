import React, { useEffect, useState } from 'react';
import JsonRenderer from './components/JsonRenderer/JsonRenderer';
import WelcomeComponent from './components/WelcomeComponent/WelcomeComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  //Dark mode 
  const [theme, setTheme] = useState('light');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <Router>
      <div className={theme}>
      <Routes>
        <Route path="/" element={<WelcomeComponent toggleTheme={toggleTheme} theme={theme}/>} />
        <Route path="/example" element={<JsonRenderer toggleTheme={toggleTheme} theme={theme}/>} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;