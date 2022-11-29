import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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
import Contact from './pages/Contact';
import Properties from './pages/admin/Properties';
import NewHouse from './pages/NewHouse';
import Cookies from 'js-cookie'
import { useEffect } from 'react';
import Paiment from './pages/Paiment';
import ConditionGeneral from './pages/ConditionGeneral';
import Faq from './pages/Faq';

function App() {

  function requireAuth(redirectTo) {
    return Cookies.get('user') ? redirectTo : <Navigate to={'/'} />
  }

  function requireAdmin(redirectTo) {
    return JSON.parse(Cookies.get('user') ? Cookies.get('user') : null)?.roles.indexOf('ROLE_ADMIN') > -1 ? redirectTo : <Navigate to={'/'} />
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} ></Route>
        <Route path="/houses" element={< Houses />}></Route>
        <Route path="/houses/add" element={requireAuth(< NewHouse />)}></Route>
        <Route path="/houses/:id" element={<House />}></Route>
        <Route path="/houses/paiment" element={<Paiment />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/cgu" element={<ConditionGeneral />}></Route>
        <Route path="/faq" element={<Faq />}></Route>
        <Route path="/account/settings" element={requireAuth(<Account />)}></Route>
        <Route path="/account/annonces" element={requireAuth(<Annonces />)}></Route>
        <Route path="/users/:id" element={<Profile />}></Route>
        <Route path="/admin/dashboard" element={requireAdmin(<Dashboard />)} ></Route>
        <Route path="/admin/annonces" element={requireAdmin(<AnnoncesAdmin />)}></Route>
        <Route path="/admin/categories" element={requireAdmin(<Categories />)}></Route>
        <Route path="/admin/equipment" element={requireAdmin(<Equipment />)}></Route>
        <Route path="/admin/properties" element={requireAdmin(<Properties />)}></Route>
      </Routes>
    </BrowserRouter>
  );

}


export default App;
