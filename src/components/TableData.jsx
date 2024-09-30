import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const TableData = ({ setUsers, users }) => {
    const headers = ["id", "name", "username", "email", "phone", "Action"];

    // Fetch data only once when the component mounts
    const fetchData = async () => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users");
        const data = await resp.json();
        setUsers(data); // Set the fetched data to users state in the parent component
    };

    // Delete user from local state without re-fetching
    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers); // Update the users state
    };

    // UseEffect to fetch data only on initial mount
    useEffect(() => {
        fetchData(); // Fetch the users once on mount
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center p-2">
                <h1 className="text-3xl font-bold">Users-Info Table</h1>
                <NavLink to="/create-user" className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-500 cursor-pointer hover:duration-300">
                    Create User
                </NavLink>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {headers.map((heading, index) => (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user.id}
                                </td>
                                <td className="px-6 py-4">{user.name}</td>
                                <td className="px-6 py-4">{user.username}</td>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4">{user.phone}</td>
                                <td className="px-6 py-4 space-x-4">
                                    <NavLink to={`/edit-user/${user.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit
                                    </NavLink>
                                    <button onClick={() => handleDelete(user.id)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableData;
