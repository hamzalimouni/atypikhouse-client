import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import House from './pages/House';
import Houses from './pages/Houses';
import Account from './pages/Account';
import Profile from './pages/Profile';
import Annonces from './pages/Annonces';
import AnnoncesAdmin from './pages/admin/Annonces';
import Dashboard from './pages/admin/Dashboard';
import Categories from './pages/admin/Categories';
import Equipment from './pages/admin/Equipment';
<<<<<<< HEAD
import Contact from './pages/Contact';
=======
import Properties from './pages/admin/Properties';
>>>>>>> 1fccdd034d8b1f3133633bbb52b32bad72d86c32

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/houses" element={< Houses />}></Route>
        <Route path="/houses/:id" element={<House />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/account/settings" element={<Account />}></Route>
        <Route path="/account/annonces" element={<Annonces />}></Route>
        <Route path="/users/:id" element={<Profile />}></Route>
        <Route path="/admin/dashboard" element={<Dashboard />}></Route>
        <Route path="/admin/annonces" element={<AnnoncesAdmin />}></Route>
        <Route path="/admin/categories" element={<Categories />}></Route>
        <Route path="/admin/equipment" element={<Equipment />}></Route>
        <Route path="/admin/properties" element={<Properties />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
