import { useUserContext } from "../context/UserContext";

const UpdateUserModal = ({ isOpen, closeModal ,updateUser}) => {
  const { editingUser, handleChange } = useUserContext();

  // Fallback to avoid uncontrolled input error if `editingUser` is not defined
  const userName = editingUser?.name || '';
  const userEmail = editingUser?.email || '';
  const userPhone = editingUser?.phone || '';

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const updatedUser = {
      id: editingUser.id, // Make sure to include the user's id
      name: userName,
      email: userEmail,
      phone: userPhone,
    };
    console.log('Submitting update for user:', updatedUser);
    updateUser(updatedUser); // Call the update function
    closeModal(); // Close the modal after submission
  };

  return (
    isOpen && (
      <div
        id="update-user-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Update User</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                aria-label="Close modal"
              >
                {/* Close button */}
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body */}
            <div className="p-4 md:p-5 space-y-4 text-left">
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value={userName} // Bind value from editingUser
                    onChange={handleChange} // Handle changes
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value={userEmail} // Bind value from editingUser
                    onChange={handleChange} // Handle changes
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your Phone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    value={userPhone} // Bind value from editingUser
                    onChange={handleChange} // Handle changes
                    required
                  />
                </div>

                {/* Modal footer */}
                <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                  <button
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Update User
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default UpdateUserModal;
