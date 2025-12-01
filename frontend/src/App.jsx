import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import UsersPage from './pages/UsersPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/user/:userId" element={<UserPage />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
