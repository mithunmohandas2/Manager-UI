import React from 'react'
import Dashboard from '../Admin_Components/Dashboard'
import Navbar from '../../User/User_Components/Navbar'
function Admin_Dashboard() {
  return (
    <div>
      <Navbar admin />
      <Dashboard />
    </div>
  )
}

export default Admin_Dashboard