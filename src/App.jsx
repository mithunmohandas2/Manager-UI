import React from 'react'
import User from './User.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { baseUrlAPI, baseUrlContext } from './store/context.jsx'

import App_Admin from './Admin.jsx'
import Admin_Dashboard from './Admin/Admin_Pages/Admin_Dashboard'

import User_Profiles from './User/User_Pages/User_Profiles.jsx';
import User_Home from './User/User_Pages/User_Home.jsx'
import User_Signup from './User/User_Pages/User_Signup.jsx';

import NotFound from './User/User_Components/PageNotFound.jsx'

function App() {
  return (
    <baseUrlContext.Provider value={{ baseUrlAPI }}>
      <Router fallback={<NotFound />}>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<User />} />
          <Route path="/login" element={<User />} />
          <Route path="/signup" element={<User_Signup />} />
          <Route path="/home" element={<User_Home />} />
          <Route path="/profile" element={<User_Profiles />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<App_Admin />} />
          <Route path="/admin/dashboard" element={<Admin_Dashboard />} />
        </Routes>
      </Router>
    </baseUrlContext.Provider>
  )
}

export default App