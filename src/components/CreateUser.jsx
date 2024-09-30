import React, { useEffect,useState } from 'react'

const CreateUser = () => {
    const [name,setName] = useState('');
    const [username,setUserName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [response,setResponse] = useState(null);
    const [error,setError] = useState(null);


    const addUser = async(e)=>{
        e.preventDefault();
    
    // Construct the user data to send
    const userData = {
      name,
      username,
      email,
      phone,
    };

    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Send user data as JSON
      });

      if (!resp.ok) {
        throw new Error('Something went wrong');
      }

      const data = await resp.json();
      setResponse(data); // Log the response from JSONPlaceholder
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message); // Handle error
    }
    }
    // useEffect(()=>{
    //     addUser();
    // },[])
  return (
    <div>
        <h1 className="text-xl font-bold">Create User</h1>
    <form className="max-w-sm mx-auto text-left shadow-md shadow-blue-200 px-3 py-4" onSubmit={addUser}>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
        <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={name} onChange={e=>setName(e.target.value)}  required />
      </div>
      <div className="mb-5">
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
        <input type="text" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={username} onChange={e=>setUserName(e.target.value)} required />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={email} onChange={e=>setEmail(e.target.value)} required />
      </div>
      <div className="mb-5">
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone</label>
        <input type="text" id="phone" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" value={phone} onChange={e=>setPhone(e.target.value)} required />
      </div>
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create new User</button>
    </form>
    {error && <p className="mt-4 text-red-500">{error}</p>}
    {response && (
        <div className="mt-4 p-4 bg-gray-100 border rounded">
          <h3 className="font-semibold">Response:</h3>
          <pre className="text-sm">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

export default CreateUser