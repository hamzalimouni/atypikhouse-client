import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import House from './pages/House';
import Houses from './pages/Houses';
import Account from './pages/Account';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/houses" element={< Houses />}></Route>
        <Route path="/houses/:id" element={<House />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/users/:id" element={<Profile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
