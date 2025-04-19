import React, { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import {FaCarrot} from 'react-icons/fa'
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
            <div className="text-xl font-bold text-green-600 flex items-center gap-1">
                <FaCarrot /> VEGGIE <span className="text-yellow-500">TRACK</span>
            </div>
            <div className="flex items-center gap-6">
                <p className="text-blue-500 text-1xl">Vegetables</p>
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

const Sidebar = () => {
    return (
        <aside className="w-64 bg-green-800 text-white min-h-screen p-4">
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
                    className="block px-4 py-2 rounded bg-white text-green-700 font-semibold no-underline hover:no-underline"
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
}

const Vegetable = () => {
    const [vegetables, setVegetables] = useState([
        {
            name: 'Tomato',
            quantity: '50',
            price: '25',
            image: tomato,
            vendors: [
                { name: 'Vendor A', location: 'Delhi', quantity: '20', contact: '9990001111' },
                { name: 'Vendor B', location: 'Mumbai', quantity: '30', contact: '8881112222' }
            ]
        },
        {
            name: 'Potato',
            quantity: '100',
            price: '20',
            image: potato,
            vendors: [
                { name: 'Vendor C', location: 'Lucknow', quantity: '50', contact: '7773334444' }
            ]
        },
        {
            name: 'Onion',
            quantity: '80',
            price: '30',
            image: onion,
            vendors: [
                { name: 'Vendor D', location: 'Chennai', quantity: '80', contact: '6665559999' }
            ]
        },
        {
            name: 'Carrot',
            quantity: '60',
            price: '35',
            image: carrot,
            vendors: [
                { name: 'Vendor E', location: 'Pune', quantity: '40', contact: '9876543210' }
            ]
        },
        {
            name: 'Broccoli',
            quantity: '40',
            price: '50',
            image: broccoli,
            vendors: [
                { name: 'Vendor F', location: 'Bangalore', quantity: '40', contact: '9123456780' }
            ]
        }
    ]);

    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        image: ''
    });

    const [showContact, setShowContact] = useState(false);
    const [selectedVendors, setSelectedVendors] = useState([]);

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

    const handleAddVegetable = () => {
        setVegetables([...vegetables, { ...formData, vendors: [] }]);
        setFormData({ name: '', quantity: '', price: '', image: '' });
        setShowModal(false);
    };

    const openContactModal = (vendors) => {
        setSelectedVendors(vendors);
        setShowContact(true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1 relative">
                <Sidebar />
                <main className={`flex-1 p-6 bg-gray-100 ${showModal || showContact ? 'blur-sm pointer-events-none' : ''}`}>
                    <h2 className="text-2xl font-bold mb-6">Vegetables</h2>
                    <div className="grid grid-cols-4 gap-6">
                        {vegetables.map((veg, index) => (
                            <div key={index} className="bg-white shadow rounded-lg p-4 hover:scale-105 transition-transform">
                                <img src={veg.image} alt={veg.name} className="h-40 w-full object-cover rounded mb-3" />
                                <h3 className="text-lg font-semibold">{veg.name}</h3>
                                <p>Quantity: {veg.quantity} kg</p>
                                <p>Price: ₹{veg.price} /kg</p>
                                <button
                                    onClick={() => openContactModal(veg.vendors)}
                                    className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                                >
                                    Contact
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white px-5 py-2 rounded-full text-lg shadow-md"
                    >
                        + Add
                    </button>
                </main>

                {/* Add Vegetable Modal */}
                {showModal && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-10">
                        <div className="bg-white p-6 rounded-lg w-96 shadow-xl z-20">
                            <h3 className="text-xl font-bold mb-4">Add New Vegetable</h3>
                            <input
                                type="text"
                                name="name"
                                placeholder="Vegetable Name"
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
                                    onClick={handleAddVegetable}
                                    className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Modal */}
                {showContact && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-10">
                        <div className="bg-white p-6 rounded-lg w-[450px] max-h-[80vh] overflow-y-auto shadow-xl z-20">
                            <h3 className="text-xl font-bold mb-4">Vendor Details</h3>
                            {selectedVendors.map((vendor, index) => (
                                <div key={index} className="border-b pb-3 mb-3">
                                    <p><strong>Name:</strong> {vendor.name}</p>
                                    <p><strong>Location:</strong> {vendor.location}</p>
                                    <p><strong>Quantity:</strong> {vendor.quantity} kg</p>
                                    <p><strong>Contact:</strong> {vendor.contact}</p>
                                </div>
                            ))}
                            <div className="flex justify-end">
                                <button
                                    onClick={() => setShowContact(false)}
                                    className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Vegetable;