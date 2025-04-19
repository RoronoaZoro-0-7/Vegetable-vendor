import React, { useState } from 'react';
import { MdOutlineBloodtype } from 'react-icons/md';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md p-2 flex justify-between items-center">
            <div className="text-xl font-bold text-red-600 flex items-center gap-1">
                <MdOutlineBloodtype /> RED <span className="text-yellow-500">GOLD</span>
            </div>
            <div className="flex items-center gap-6">
                <p className="text-blue-500 text-1xl">History </p>
                <button
                    className="bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1"
                    onClick={() => navigate('/login')}
                >
                    <HiOutlineLogout /> Logout
                </button>
            </div>
        </nav>
    );
};

const Sidebar = () => {
    return (
        <aside className="w-64 bg-red-800 text-white min-h-screen p-4">
            <div className="space-y-4 mt-10">
                <Link
                    to="/admin"
                    className="block px-4 py-2 rounded text-white font-medium no-underline hover:no-underline"
                    style={{ textDecoration: 'none' }}>
                    HomePage
                </Link>
                <Link
                    to="/vendor"
                    className="block px-4 py-2 rounded text-white font-medium no-underline hover:no-underline"
                    style={{ textDecoration: 'none' }}>
                    Vendors
                </Link>
                <Link
                    to="/vegetables"
                    className="block px-4 py-2 rounded text-white font-medium no-underline hover:no-underline"
                    style={{ textDecoration: 'none' }}>
                    Vegetables
                </Link>
                <Link
                    to="/history"
                    className="block px-4 py-2 rounded bg-white text-red-700 font-semibold no-underline hover:no-underline"
                    style={{ textDecoration: 'none' }}>
                    History
                </Link>
            </div>
        </aside>
    );
};

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
};

const History = () => {
    const [history, setHistory] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [newEntry, setNewEntry] = useState({
        name: '',
        type: 'bought',
        vegetable: '',
        quantity: '',
        price: '',
        total: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        if (editIndex !== null) {
            const updated = [...history];
            updated[editIndex] = newEntry;
            setHistory(updated);
            setEditIndex(null);
        } else {
            setHistory([newEntry, ...history]);
        }
        setNewEntry({
            name: '',
            type: 'bought',
            vegetable: '',
            quantity: '',
            price: '',
            total: '',
            date: '',
            time: ''
        });
        setShowForm(false);
    };

    const handleEdit = (index) => {
        setNewEntry(history[index]);
        setEditIndex(index);
        setShowForm(true);
    };

    const handleDelete = (index) => {
        const filtered = history.filter((_, i) => i !== index);
        setHistory(filtered);
    };

    return (
        <Layout>
            <div className={`${showForm ? 'blur-sm' : ''}`}>
                <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow rounded">
                        <thead>
                            <tr className="bg-gray-200 text-left text-sm uppercase">
                                <th className="px-4 py-2">S.No</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Type</th>
                                <th className="px-4 py-2">Vegetable</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Price (kg)</th>
                                <th className="px-4 py-2">Total</th>
                                <th className="px-4 py-2">Date</th>
                                <th className="px-4 py-2">Time</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry, index) => (
                                <tr key={index} className="border-t">
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{entry.name}</td>
                                    <td className={`px-4 py-2 font-semibold ${entry.type === 'bought' ? 'text-green-600' : 'text-red-600'}`}>
                                        {entry.type}
                                    </td>
                                    <td className="px-4 py-2">{entry.vegetable}</td>
                                    <td className="px-4 py-2">{entry.quantity}</td>
                                    <td className="px-4 py-2">{entry.price}</td>
                                    <td className="px-4 py-2">{entry.total}</td>
                                    <td className="px-4 py-2">{entry.date}</td>
                                    <td className="px-4 py-2">{entry.time}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-col gap-2">
                                            <button onClick={() => handleEdit(index)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                                                Edit
                                            </button>
                                            <button onClick={() => handleDelete(index)} className="bg-red-600 text-white px-2 py-1 rounded">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <button
                onClick={() => {
                    setEditIndex(null);
                    setShowForm(true);
                }}
                className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full px-6 py-3 text-lg shadow-lg hover:bg-blue-700"
            >
                + Add
            </button>

            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-[400px] space-y-4">
                        <h2 className="text-xl font-semibold text-center">
                            {editIndex !== null ? 'Edit Transaction' : 'Add Transaction'}
                        </h2>
                        <input name="name" type="text" placeholder="Name" value={newEntry.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        <select name="type" value={newEntry.type} onChange={handleChange} className="w-full border px-3 py-2 rounded">
                            <option value="bought">Bought</option>
                            <option value="sold">Sold</option>
                        </select>
                        <input name="vegetable" type="text" placeholder="Vegetable" value={newEntry.vegetable} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        <input name="quantity" type="number" placeholder="Quantity (kg)" value={newEntry.quantity} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        <input name="price" type="number" placeholder="Price per kg" value={newEntry.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        <input name="total" type="number" placeholder="Total price" value={newEntry.total} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        <input name="date" type="date" value={newEntry.date} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        <input name="time" type="time" value={newEntry.time} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        <div className="flex justify-end gap-3">
                            <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
                            <button onClick={handleAdd} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                                {editIndex !== null ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default History;