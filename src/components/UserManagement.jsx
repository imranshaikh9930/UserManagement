import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import UserForm from './UserForm';
import { useUserContext } from '../context/UserContext';
import Loader from './Loader';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const { setEditingUser, setIsAddUser, isAddUser, editingUser, closeModal } = useUserContext();

    // Fetch users from API
    const fetchUsers = async () => {
        setLoading(true); // Start loading
        try {
            const resp = await fetch("https://jsonplaceholder.typicode.com/users");
            if (!resp.ok) {
                throw new Error(`Error fetching users: ${resp.statusText}`);
            }
            const data = await resp.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message to the user)
        } finally {
            setLoading(false); // End loading
        }
    };

    // Add a new user
    const addUser = async (user) => {
        try {
            const resp = await fetch("https://jsonplaceholder.typicode.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (!resp.ok) {
                throw new Error(`Error adding user: ${resp.statusText}`);
            }
            const newUser = await resp.json();
            setUsers((prevUsers) => [...prevUsers, newUser]);
            closeModal(); // Close modal after adding a user
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    // Update an existing user
    const updateUser = async (user) => {
        try {
            const resp = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });
            if (!resp.ok) {
                throw new Error(`Error updating user: ${resp.statusText}`);
            }
            const updatedUser = await resp.json();

            // Update the user list with the updated user
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
            );

            closeModal(); // Close modal after updating the user
            setEditingUser(null); // Reset editing user state
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    // Delete a user
    const deleteUser = async (id) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
                method: "DELETE",
            });
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div>
            <h1 className="text-xl font-semibold sm:text-3xl text-center">User Management</h1>
            <UserForm 
                addUser={addUser} 
                updateUser={updateUser} 
                isAddUser={isAddUser} 
                editingUser={editingUser} 
            />
            {loading ? (  // Display loader while loading
                <Loader />
            ) : (
                <UserList 
                    users={users} 
                    deleteUser={deleteUser} 
                    setEditingUser={setEditingUser}  
                    setIsAddUser={setIsAddUser}
                />
            )}
        </div>
    );
};

export default UserManagement;
