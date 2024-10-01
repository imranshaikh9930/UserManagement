// src/context/UserContext.js

import React, { createContext, useState, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUser, setIsAddUser] = useState(true);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isUpdateUserModalOpen, setIsUpdateUserModalOpen] = useState(false);
  // const [users, setUsers] = useState([]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({
      ...prev,
      [name]: value, // Update the relevant field
    }));
  };



  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <UserContext.Provider value={{
      editingUser,
      setEditingUser,
      isModalOpen,
      openModal,
      closeModal,
      isAddUser,
      setIsAddUser,
      isUpdateUserModalOpen,
      setIsUpdateUserModalOpen,
      isAddUserModalOpen,
      setIsAddUserModalOpen,
      handleChange,
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
