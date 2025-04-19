import React, { useState } from 'react';
import { MdOutlineBloodtype } from 'react-icons/md';
import { HiOutlineLogout } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import tomato from './tomato.jpg';
import potato from './potato.jpg';
import onion from './onion.jpg';
import carrot from './carrot.jpg';
import broccoli from './broccoli.jpg';


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
                <p className="text-blue-500 text-1xl">Vegetables</p>
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
                    to="/Items"
                    className="block px-4 py-2 rounded bg-white text-red-700 font-semibold no-underline hover:no-underline"
                    style={{ textDecoration: 'none' }}>
                    Items
                </Link>
            </div>
        </aside>
    );
};

const Item = () => {
    const [Items, setItems] = useState([
        {
            name: 'Tomato',
            quantity: '50',
            price: '25',
            image: tomato
        },
        {
            name: 'Potato',
            quantity: '100',
            price: '20',
            image: potato
        },
        {
            name: 'Onion',
            quantity: '80',
            price: '30',
            image: onion
        },
        {
            name: 'Carrot',
            quantity: '60',
            price: '35',
            image: carrot
        },
        {
            name: 'Broccoli',
            quantity: '40',
            price: '50',
            image: broccoli
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        image: ''
    });

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, image: reader.result });
            };
            if (file) reader.readAsDataURL(file);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleAddItem = () => {
        setItems([...Items, formData]);
        setFormData({ name: '', quantity: '', price: '', image: '' });
        setShowModal(false);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <Sidebar />
                <main className={`flex-1 p-6 bg-gray-100 relative ${showModal ? 'blur-sm pointer-events-none' : ''}`}>
                    <h2 className="text-2xl font-bold mb-6">Items</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {Items.map((veg, index) => (
                            <div key={index} className="bg-white shadow rounded-lg p-4 hover:scale-105 transition-transform">
                                <img
                                    src={veg.image}
                                    alt={veg.name}
                                    className="h-40 w-full object-cover rounded mb-3"
                                />
                                <h3 className="text-lg font-semibold">{veg.name}</h3>
                                <p>Quantity: {veg.quantity} kg</p>
                                <p>Price: ₹{veg.price} /kg</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="fixed bottom-6 right-6 bg-red-700 hover:bg-red-800 text-white px-5 py-2 rounded-full text-lg shadow-md"
                    >
                        + Add
                    </button>
                </main>

                {showModal && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-10">
                        <div className="bg-white p-6 rounded-lg w-96 shadow-xl z-20">
                            <h3 className="text-xl font-bold mb-4">Add New Item</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Item Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border p-2 mb-2 rounded"
                            />
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity in kg"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full border p-2 mb-2 rounded"
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price per kg"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full border p-2 mb-2 rounded"
                            />
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="w-full border p-2 mb-4 rounded"
                            />
                            <div className="flex justify-between">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddItem}
                                    className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Item;