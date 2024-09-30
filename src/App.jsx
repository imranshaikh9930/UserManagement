import React, { Suspense, useEffect, useState ,lazy} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManagement from './components/UserManagement'
import UserDetail from './components/UserDetail'
import "./App.css";

function App() {
  // const [users,setUsers] = useState([]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              
                <UserManagement />
             
            }
          />
          <Route
            path="/user/:id"
            element={
             
                <UserDetail />
          
            }
          />
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
