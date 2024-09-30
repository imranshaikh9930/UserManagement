// src/UserDetail.js

import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import Loader from './Loader';

const UserDetail = () => {
    const { id } = useParams(); // Get the user ID from the URL
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
            const data = await response.json();
            setUser(data);
        };

        fetchUser();
    }, [id]);

    if (!user) return <div><Loader/></div>;

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">{user.name}</h1>
        <div className="grid grid-cols-1 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Contact Information</h2>
                <p><strong>Email:</strong> <a href={`mailto:${user.email}`} className="text-blue-500 hover:underline">{user.email}</a></p>
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Website:</strong> <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{user.website}</a></p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Address</h2>
                <p>{user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg shadow">
                <h2 className="text-lg font-semibold">Company</h2>
                <p>{user.company.name}</p>
                <p>{user.company.catchPhrase}</p>
            </div>
        </div>
        <div className="mt-6 text-center">
            <NavLink to="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Back to Users List
            </NavLink>
        </div>
    </div>
    );
};

export default UserDetail;
