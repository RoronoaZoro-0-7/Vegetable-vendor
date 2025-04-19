import React from 'react';
import { FaCarrot } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

// Header Component
const Header = () => {
  const navigate = useNavigate();
  function handleLogout() {
    navigate('/login');
  }
  return (
    <nav className="bg-white shadow-md p-2 flex justify-between items-center">
      <div className="text-xl font-bold text-green-600 flex items-center gap-1">
        <FaCarrot /> VEGGIE <span className="text-yellow-500">TRACK</span>
      </div>
      <div className="flex items-center gap-6">
        <p className="text-blue-500 text-1xl">Admin</p>
        <button
          className="bg-green-600 text-white px-3 py-1 rounded flex items-center gap-1"
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
    <aside className="w-64 bg-green-800 text-white min-h-screen p-4">
      <div className="space-y-4 mt-10">
        <Link
          to="/admin"
          className="block px-4 py-2 rounded bg-white text-green-700 font-semibold no-underline hover:no-underline"
          style={{ textDecoration: 'none' }}
        >
          Dashboard
        </Link>
        <Link
          to="/vendor"
          className="block px-4 py-2 rounded text-white font-medium no-underline hover:no-underline"
          style={{ textDecoration: 'none' }}
        >
          Vendors
        </Link>
        <Link
          to="/vegetables"
          className="block px-4 py-2 rounded text-white font-medium no-underline hover:no-underline"
          style={{ textDecoration: 'none' }}
        >
          Vegetables
        </Link>
        <Link
          to="/history"
          className="block px-4 py-2 rounded text-white font-medium no-underline hover:no-underline"
          style={{ textDecoration: 'none' }}
        >
          Purchase History
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

// AdminHome Component
const AdminHome = () => {
  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold">
          Welcome <span className="text-green-600">Admin</span>
        </h1>
        <h3 className="mt-6 text-xl font-semibold">Manage Vegetable Vendor System</h3>
        <hr className="my-4 border-gray-400" />
        <p className="text-gray-700">
          Welcome to the Vegetable Vendor Management Dashboard. Here, you can manage vendors, track
          vegetable supplies, and monitor the entire distribution flow efficiently. 
          This platform ensures transparency, quick access to vendor information, and 
          a well-organized vegetable supply chain.
        </p>
      </div>
    </Layout>
  );
};

export default AdminHome;
