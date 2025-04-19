import React from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaCarrot } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

// Header Component
const Header = () => {
  const navigate = useNavigate();
  function handleLogout() {
    navigate('/login');
  }
  return (
    <nav className="bg-white shadow-md p-2 flex justify-between items-center">
      <div className="text-xl font-bold text-green-700 flex items-center gap-1">
        <FaCarrot /> VEGGIE <span className="text-yellow-500">ZONE</span>
      </div>
      <div className="flex items-center gap-6">
        <p className="text-blue-500 text-1xl">Customer and Vendor</p>
        <button
          className="bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1"
          onClick={handleLogout}
        >
          <HiOutlineLogout /> Logout
        </button>
      </div>
    </nav>
  );
};

// Sidebar Component with Links
const Sidebar = () => {
  return (
    <aside className="w-64 bg-green-900 text-white min-h-screen p-4">
      <div className="space-y-4 mt-10">
        <Link
          to="/customer"
          className="block px-4 py-2 rounded bg-white text-green-700 font-semibold no-underline hover:no-underline"
          style={{ textDecoration: 'none' }}
        >
          HomePage
        </Link>
        <Link
          to="/vegetable"
          className="block px-4 py-2 rounded text-white font-medium no-underline hover:no-underline"
          style={{ textDecoration: 'none' }}
        >
          Vegetables
        </Link>
      </div>
    </aside>
  );
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100 p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

// CustomerHome Component
const CustomerHome = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Welcome <span className="text-green-700">Customer and Vendor</span>
        </h1>
        <h3 className="mt-6 text-xl font-semibold">Manage Vegetable Vendor App</h3>
        <hr className="my-4 border-gray-400" />
        <p className="text-gray-700">
          Welcome to the Vegetable Vendor Management System. Here, you can manage vegetable inventories,
          track vendor supplies, and streamline the distribution of fresh produce to customers efficiently.
          Our platform ensures that the right vegetables reach the right place at the right time.
        </p>
      </div>
    </Layout>
  );
};

export default CustomerHome;