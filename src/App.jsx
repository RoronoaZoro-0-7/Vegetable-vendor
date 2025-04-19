import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Register from './pages/Register.jsx';
import Admin from './pages/Admin.jsx';
import Login from './pages/Login.jsx';
import Vendor from './pages/Vendor.jsx';
import Vegetable from './pages/Vegetable.jsx';
import History from './pages/History.jsx';
import Customer from './pages/Customer.jsx';
import Item from './pages/Items.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/vegetables" element={<Vegetable />} />
        <Route path="/vegetable" element={<Item />} />
        <Route path="/history" element={<History />} />
        <Route path="/customer" element={<Customer />} />
      </Routes>
    </>
  );
}

export default App;