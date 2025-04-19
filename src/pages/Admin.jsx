import React from 'react';
import { MdOutlineBloodtype } from 'react-icons/md';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom

// Header Component
const Header = () => {
  const navigate = useNavigate();
  function handleLogout() {
    navigate('/login');
  }
  return (
    <nav className="bg-white shadow-md p-2 flex justify-between items-center">
      <div className="text-xl font-bold text-red-600 flex items-center gap-1">
        <MdOutlineBloodtype /> RED <span className="text-yellow-500">GOLD</span>
      </div>
      <div className="flex items-center gap-6">
        <p className="text-blue-500 text-1xl">Admin </p>
        <button
          className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
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
    <aside className="w-64 bg-red-800 text-white min-h-screen p-4">
      <div className="space-y-4 mt-10">
        <Link
          to="/admin"
          className="block px-4 py-2 rounded bg-white text-red-700 font-semibold no-underline hover:no-underline"
          style={{ textDecoration: 'none' }}
        >
          HomePage
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
          History
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
        <h3 className="mt-6 text-xl font-semibold">Manage Blood Bank App</h3>
        <hr className="my-4 border-gray-400" />
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad explicabo animi blanditiis
          incidunt dicta quia, quibusdam facere corporis! Dolores, reprehenderit cum sed
          repellat laudantium architecto natus est nostrum accusamus, odio aspernatur minima
          fugiat quam molestiae nisi. Temporibus impedit dolorem quia. Distinctio modi non
          excepturi illo odio voluptatum quae nostrum a temporibus sequi! Explicabo, quasi
          consequatur ad qui quos labore distinctio voluptates alias nostrum ab dicta
          aspernatur molestias adipisci quibusdam error ipsa. Totam, tenetur dolores eaque
          tempora officiis deserunt assumenda? Rerum nemo est nihil laudantium necessitatibus.
          Possimus, voluptatem voluptates blanditiis quas aspernatur, quam, quaerat minus
          maiores ipsam sint perferendis dolor.
        </p>
      </div>
    </Layout>
  );
};

export default AdminHome;