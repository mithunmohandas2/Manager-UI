import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/user/userSlice';
import Swal from 'sweetalert2';
function Navbar(props) {
  const Logo = 'https://cdn-icons-png.flaticon.com/512/2720/2720641.png'
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const logoutUser = () => {
    dispatch(logout())
    Swal.fire({ position: 'center', icon: 'success', text: 'Logout successful', width: 250, showConfirmButton: false, timer: 1000 })
    props.admin ? Navigate('/admin') : Navigate('/login')
  }

  return (
    <nav className="navbar top-0 py-3">
      <div className="container">
        <a className="navbar-brand d-flex" onClick={() => { !props.admin ? Navigate('/home') : "" }} style={{ cursor: 'pointer' }} >
          <img className='Logo' style={{ width: 50 }} src={Logo} alt="logo" />
          <h1 className='ps-3'>MANAGER</h1>
        </a>
        {!props.admin ? <h4 className='menu_item' onClick={() => { Navigate('/profile') }} style={{ cursor: 'pointer' }}>Profile Management</h4> : null}
        <button onClick={logoutUser}>Logout</button>
      </div>
    </nav>
  )
}

export default Navbar;
