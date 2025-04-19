import React, { useState } from 'react';
import { MdOutlineBloodtype } from 'react-icons/md';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

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
                <p className="text-blue-500 text-1xl">Vendors </p>
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
                    className="block px-4 py-2 rounded bg-white text-red-700 font-semibold no-underline hover:no-underline"
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
                    className="block px-4 py-2 rounded text-white font-medium no-underline hover:no-underline"
                    style={{ textDecoration: 'none' }}>
                    History
                </Link>
            </div>
        </aside>
    );
};

const Vendor = () => {
    const [vendors, setVendors] = useState([
        {
            name: 'Ramesh Kumar',
            town: 'Chennai',
            email: 'ramesh@gmail.com',
            phone: '9876543210',
            vegetables: ['Tomato', 'Potato', 'Carrot']
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        town: '',
        email: '',
        phone: '',
        vegetables: ''
    });

    const [editIndex, setEditIndex] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddVendor = () => {
        const vendor = {
            name: formData.name,
            town: formData.town,
            email: formData.email,
            phone: formData.phone,
            vegetables: formData.vegetables.split(',').map(v => v.trim())
        };

        if (editIndex !== null) {
            const updated = [...vendors];
            updated[editIndex] = vendor;
            setVendors(updated);
            setEditIndex(null);
        } else {
            setVendors([...vendors, vendor]);
        }

        setFormData({ name: '', town: '', email: '', phone: '', vegetables: '' });
        setShowModal(false);
    };

    const handleEdit = (index) => {
        const v = vendors[index];
        setFormData({
            name: v.name,
            town: v.town,
            email: v.email,
            phone: v.phone,
            vegetables: v.vegetables.join(', ')
        });
        setEditIndex(index);
        setShowModal(true);
    };

    const handleDelete = (index) => {
        const updated = vendors.filter((_, i) => i !== index);
        setVendors(updated);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className={`flex-1 p-6 relative bg-gray-100 transition duration-300 ${showModal ? 'blur-sm pointer-events-none' : ''}`}>
                    <h2 className="text-2xl font-bold mb-4">Vendor Details</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white rounded shadow">
                            <thead className="bg-red-700 text-white">
                                <tr>
                                    <th className="py-2 px-4 text-left">Name</th>
                                    <th className="py-2 px-4 text-left">Town</th>
                                    <th className="py-2 px-4 text-left">Email</th>
                                    <th className="py-2 px-4 text-left">Phone</th>
                                    <th className="py-2 px-4 text-left">Vegetables</th>
                                    <th className="py-2 px-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors.map((vendor, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="py-2 px-4">{vendor.name}</td>
                                        <td className="py-2 px-4">{vendor.town}</td>
                                        <td className="py-2 px-4">{vendor.email}</td>
                                        <td className="py-2 px-4">{vendor.phone}</td>
                                        <td className="py-2 px-4">
                                            <ul className="list-disc ml-4">
                                                {vendor.vegetables.map((v, i) => <li key={i}>{v}</li>)}
                                            </ul>
                                        </td>
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

                    <button
                        onClick={() => {
                            setEditIndex(null);
                            setFormData({ name: '', town: '', email: '', phone: '', vegetables: '' });
                            setShowModal(true);
                        }}
                        className="fixed bottom-6 right-6 bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-full text-lg shadow-md"
                    >
                        + Add
                    </button>
                </main>

                {/* Modal Form */}
                {showModal && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-10">
                        <div className="bg-white p-6 rounded-lg w-96 shadow-xl z-20">
                            <h3 className="text-xl font-bold mb-4">{editIndex !== null ? 'Edit Vendor' : 'Add New Vendor'}</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full border p-2 mb-2 rounded"
                            />
                            <input
                                type="text"
                                name="town"
                                placeholder="Town"
                                value={formData.town}
                                onChange={handleInputChange}
                                className="w-full border p-2 mb-2 rounded"
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border p-2 mb-2 rounded"
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full border p-2 mb-2 rounded"
                            />
                            <input
                                type="text"
                                name="vegetables"
                                placeholder="Vegetables (comma-separated)"
                                value={formData.vegetables}
                                onChange={handleInputChange}
                                className="w-full border p-2 mb-4 rounded"
                            />
                            <div className="flex justify-between">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setEditIndex(null);
                                    }}
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddVendor}
                                    className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                                >
                                    {editIndex !== null ? 'Update' : 'Add'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Vendor;