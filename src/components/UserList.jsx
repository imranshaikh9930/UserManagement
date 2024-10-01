import React from 'react';
import { useUserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

const UserList = ({ users, deleteUser }) => {
  const { setEditingUser, openModal, setIsAddUser } = useUserContext();

  const handleEdit = (user) => {
    setEditingUser(user); // Set the user to be edited
    openModal(true); // Open the modal in edit mode
    setIsAddUser(false);
  };

  const headers = ["Id", "Name", "Email", "Phone", "Actions"];

  return (
    <div>
      <div className="flex justify-between items-center p-2">
        <h1 className="text-lg p-4 w-full text-center font-semibold sm:text-3xl sm:text-left font-bold">Users Info Table</h1>
        {/* Button to create a new user is not needed here */}
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
              <tr
                key={user.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <NavLink to={`/user/${user.id}`} className="text-blue-500 hover:text-blue-700">
                    {user.id}
                  </NavLink>
                </td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4 space-x-4 flex items-center">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-blue-500 hover:text-blue-700"
                    aria-label={`Edit user ${user.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      try {
                        await deleteUser(user.id);
                      } catch (error) {
                        console.error(`Error deleting user ${user.id}:`, error);
                        // Optionally handle the error (e.g., show an error message)
                      }
                    }}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Delete user ${user.name}`}
                  >
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

export default UserList;
