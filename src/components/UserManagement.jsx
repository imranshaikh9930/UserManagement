import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import AddUserModal from './AddUserModal';
import UpdateUserModal from './UpdateUserModal';
import { useUserContext } from '../context/UserContext';
import Loader from './Loader';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setEditingUser, setIsAddUserModalOpen, isAddUserModalOpen, isUpdateUserModalOpen, setIsUpdateUserModalOpen,editingUser,closeModal } = useUserContext();
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      if (!resp.ok) {
        throw new Error(`Error fetching users: ${resp.statusText}`);
      }
      const data = await resp.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      setIsAddUserModalOpen(false);
    } catch (error) {
      console.error(error);
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
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u))
      );
      setIsUpdateUserModalOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error(error);
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
    }
  };

  // Handlers for adding and updating user submissions
  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    addUser(user);
  };
  const handleUpdateUserSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log('Submitting update for user:', { ...editingUser, ...user });
    updateUser({ ...editingUser, ...user }); // Call the update function
    closeModal(); // Close modal after submission
};

  const handleUserChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-xl font-semibold sm:text-3xl text-center">User Management</h1>
        <div className="w-full text-center sm:text-left">
      <button  className="bg-blue-500 text-white text-left px-2 py-1 rounded-md mt-4"onClick={() => setIsAddUserModalOpen(true)}>Add User</button>

        </div>

      <AddUserModal
        isOpen={isAddUserModalOpen}
        closeModal={() => setIsAddUserModalOpen(false)}
        handleSubmit={handleAddUserSubmit}
        user={user}
        handleChange={handleUserChange}
      />

      <UpdateUserModal
        isOpen={isUpdateUserModalOpen}
        closeModal={() => setIsUpdateUserModalOpen(false)}
        handleSubmit={handleUpdateUserSubmit}
        updateUser = {updateUser}
      />

      {loading ? (
        <Loader />
      ) : (
        <UserList
          users={users}
          deleteUser={deleteUser}
          setEditingUser={setEditingUser}
          setUser={setUser} // Pass down the function to set user for update
          setIsUpdateUserModalOpen={setIsUpdateUserModalOpen}
        />
      )}
    </div>
  );
};

export default UserManagement;
